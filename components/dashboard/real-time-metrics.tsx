"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, LineChart, Line } from "recharts"
import { Play, Pause, Download, Settings, TrendingUp, TrendingDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/hooks/use-toast"

// Simulate real-time data
const generateMetricData = () => {
  const now = Date.now()
  return Array.from({ length: 20 }, (_, i) => ({
    time: new Date(now - (19 - i) * 30000).toLocaleTimeString("en-IN", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
    trackGeometry: 15 + Math.random() * 10,
    railProfile: 12 + Math.random() * 8,
    acceleration: 18 + Math.random() * 12,
    temperature: 35 + Math.random() * 10,
  }))
}

export function RealTimeMetrics() {
  const [data, setData] = useState(generateMetricData())
  const [isLive, setIsLive] = useState(true)
  const [chartType, setChartType] = useState<"area" | "line">("area")
  const { toast } = useToast()

  useEffect(() => {
    if (!isLive) return

    const interval = setInterval(() => {
      setData((prevData) => {
        const newData = [...prevData.slice(1)]
        const lastTime = Date.now()
        newData.push({
          time: new Date(lastTime).toLocaleTimeString("en-IN", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
          trackGeometry: 15 + Math.random() * 10,
          railProfile: 12 + Math.random() * 8,
          acceleration: 18 + Math.random() * 12,
          temperature: 45 + Math.random() * 10,
        })
        return newData
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [isLive])

  const currentMetrics = data[data.length - 1]
  const previousMetrics = data[data.length - 2]

  const getTrend = (current: number, previous: number) => {
    if (!previous) return null
    const diff = current - previous
    return {
      direction: diff > 0 ? "up" : diff < 0 ? "down" : "stable",
      value: Math.abs(diff).toFixed(1),
    }
  }

  const handleExportData = () => {
    const csvData = [
      "Time,Track Geometry,Rail Profile,Acceleration,Temperature",
      ...data.map(
        (row) =>
          `${row.time},${row.trackGeometry.toFixed(2)},${row.railProfile.toFixed(2)},${row.acceleration.toFixed(2)},${row.temperature.toFixed(2)}`,
      ),
    ].join("\n")

    const blob = new Blob([csvData], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `ITMS-Metrics-${new Date().toISOString().split("T")[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Data Exported",
      description: "Real-time metrics data has been downloaded",
    })
  }

  const metrics = [
    {
      label: "Track Geometry",
      value: currentMetrics?.trackGeometry,
      color: "blue",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
      textColor: "text-blue-400",
      trend: getTrend(currentMetrics?.trackGeometry || 0, previousMetrics?.trackGeometry || 0),
    },
    {
      label: "Rail Profile",
      value: currentMetrics?.railProfile,
      color: "green",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20",
      textColor: "text-green-400",
      trend: getTrend(currentMetrics?.railProfile || 0, previousMetrics?.railProfile || 0),
    },
    {
      label: "Acceleration",
      value: currentMetrics?.acceleration,
      color: "orange",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/20",
      textColor: "text-orange-400",
      trend: getTrend(currentMetrics?.acceleration || 0, previousMetrics?.acceleration || 0),
    },
    {
      label: "Temperature",
      value: currentMetrics?.temperature,
      color: "purple",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
      textColor: "text-purple-400",
      trend: getTrend(currentMetrics?.temperature || 0, previousMetrics?.temperature || 0),
      unit: "°C",
    },
  ]

  return (
    <Card className="border-gray-200 dark:border-gray-800 bg-slate-800/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl text-white">Real-time Monitoring</CardTitle>
            <CardDescription className="text-gray-300">Live track condition metrics</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsLive(!isLive)}
              className="bg-gray-600/20 border-gray-500/30 text-gray-300 hover:bg-gray-600/30"
            >
              {isLive ? <Pause className="w-3 h-3 mr-1" /> : <Play className="w-3 h-3 mr-1" />}
              {isLive ? "Pause" : "Resume"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportData}
              className="bg-blue-600/20 border-blue-500/30 text-blue-400 hover:bg-blue-600/30"
            >
              <Download className="w-3 h-3 mr-1" />
              Export
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setChartType(chartType === "area" ? "line" : "area")}
              className="bg-purple-600/20 border-purple-500/30 text-purple-400 hover:bg-purple-600/30"
            >
              <Settings className="w-3 h-3 mr-1" />
              {chartType === "area" ? "Line" : "Area"}
            </Button>
            <Badge
              variant="outline"
              className={
                isLive
                  ? "bg-green-500/10 text-green-400 border-green-500/20"
                  : "bg-gray-500/10 text-gray-400 border-gray-500/20"
              }
            >
              <div
                className={`w-2 h-2 rounded-full mr-2 ${isLive ? "bg-green-400 animate-pulse" : "bg-gray-400"}`}
              ></div>
              {isLive ? "LIVE" : "PAUSED"}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Values */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`text-center p-4 rounded-lg ${metric.bgColor} border ${metric.borderColor} relative overflow-hidden`}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={metric.value}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`text-2xl font-bold ${metric.textColor}`}
                >
                  {metric.value?.toFixed(1)}
                  {metric.unit || "%"}
                </motion.div>
              </AnimatePresence>
              <div className="text-sm text-gray-400 mb-2">{metric.label}</div>
              {metric.trend && (
                <div className="flex items-center justify-center gap-1 text-xs">
                  {metric.trend.direction === "up" ? (
                    <TrendingUp className="w-3 h-3 text-green-400" />
                  ) : metric.trend.direction === "down" ? (
                    <TrendingDown className="w-3 h-3 text-red-400" />
                  ) : null}
                  <span
                    className={
                      metric.trend.direction === "up"
                        ? "text-green-400"
                        : metric.trend.direction === "down"
                          ? "text-red-400"
                          : "text-gray-400"
                    }
                  >
                    {metric.trend.value}
                  </span>
                </div>
              )}
              {isLive && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <motion.div
          className="h-64"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "area" ? (
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#9CA3AF" fontSize={12} />
                <YAxis stroke="#9CA3AF" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "#F9FAFB",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="trackGeometry"
                  stroke="#3B82F6"
                  fill="#3B82F6"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="railProfile"
                  stroke="#10B981"
                  fill="#10B981"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="acceleration"
                  stroke="#F59E0B"
                  fill="#F59E0B"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
              </AreaChart>
            ) : (
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#9CA3AF" fontSize={12} />
                <YAxis stroke="#9CA3AF" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "#F9FAFB",
                  }}
                />
                <Line type="monotone" dataKey="trackGeometry" stroke="#3B82F6" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="railProfile" stroke="#10B981" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="acceleration" stroke="#F59E0B" strokeWidth={2} dot={false} />
              </LineChart>
            )}
          </ResponsiveContainer>
        </motion.div>
      </CardContent>
    </Card>
  )
}
