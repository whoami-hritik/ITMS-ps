"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts"
import { Brain, TrendingUp, Download, Settings, Zap, AlertCircle } from "lucide-react"
import { useState } from "react"

export function AIAnalytics() {
  const [timeRange, setTimeRange] = useState("1h")

  const performanceData = [
    { time: "00:00", accuracy: 94, fps: 45, detections: 12 },
    { time: "00:15", accuracy: 96, fps: 47, detections: 18 },
    { time: "00:30", accuracy: 93, fps: 44, detections: 15 },
    { time: "00:45", accuracy: 95, fps: 46, detections: 22 },
    { time: "01:00", accuracy: 97, fps: 48, detections: 19 },
    { time: "01:15", accuracy: 94, fps: 45, detections: 16 },
    { time: "01:30", accuracy: 96, fps: 47, detections: 21 },
  ]

  const detectionTypes = [
    { name: "Persons", value: 35, color: "#EF4444" },
    { name: "Vehicles", value: 25, color: "#F59E0B" },
    { name: "Objects", value: 20, color: "#10B981" },
    { name: "Animals", value: 15, color: "#3B82F6" },
    { name: "Other", value: 5, color: "#8B5CF6" },
  ]

  const realtimeMetrics = [
    { label: "Model Accuracy", value: "96.8%", trend: "up", change: "+2.3%" },
    { label: "Inference Speed", value: "47 FPS", trend: "stable", change: "0%" },
    { label: "False Positives", value: "1.8%", trend: "down", change: "-0.5%" },
    { label: "Processing Load", value: "72%", trend: "up", change: "+5%" },
    { label: "Memory Usage", value: "4.2 GB", trend: "stable", change: "+0.1GB" },
    { label: "GPU Utilization", value: "85%", trend: "up", change: "+8%" },
  ]

  const hourlyDetections = [
    { hour: "00", detections: 45, accuracy: 94.2 },
    { hour: "01", detections: 52, accuracy: 95.1 },
    { hour: "02", detections: 38, accuracy: 96.3 },
    { hour: "03", detections: 41, accuracy: 94.8 },
    { hour: "04", detections: 67, accuracy: 95.7 },
    { hour: "05", detections: 73, accuracy: 96.2 },
    { hour: "06", detections: 89, accuracy: 95.4 },
  ]

  const exportAnalyticsData = (format: string) => {
    const data = {
      timestamp: new Date().toISOString(),
      timeRange: timeRange,
      realtimeMetrics,
      performanceData,
      detectionTypes,
      hourlyDetections,
      systemHealth: {
        uptime: "99.2%",
        totalDetections: 847,
        activeAlerts: 23,
        modelVersion: "v2.1.3",
      },
    }

    if (format === "csv") {
      let csvContent = "AI Analytics Report\n\n"
      csvContent += "Realtime Metrics\n"
      csvContent += "Metric,Value,Trend,Change\n"
      realtimeMetrics.forEach((metric) => {
        csvContent += `"${metric.label}",${metric.value},${metric.trend},${metric.change}\n`
      })
      csvContent += "\nHourly Detections\n"
      csvContent += "Hour,Detections,Accuracy\n"
      hourlyDetections.forEach((hour) => {
        csvContent += `${hour.hour},${hour.detections},${hour.accuracy}%\n`
      })

      const blob = new Blob([csvContent], { type: "text/csv" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `ai-analytics-${Date.now()}.csv`
      a.click()
    } else if (format === "json") {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `ai-analytics-${Date.now()}.json`
      a.click()
    }
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-400" />
            Professional AI Analytics
          </CardTitle>
          <div className="flex items-center gap-2">
            <select
              className="px-3 py-1 rounded border border-border bg-background text-sm"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="1h">Last Hour</option>
              <option value="6h">Last 6 Hours</option>
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
            </select>
            <Button variant="outline" size="sm" onClick={() => exportAnalyticsData("csv")}>
              <Download className="w-4 h-4 mr-2" />
              CSV
            </Button>
            <Button variant="outline" size="sm" onClick={() => exportAnalyticsData("json")}>
              <Download className="w-4 h-4 mr-2" />
              JSON
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Configure
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {realtimeMetrics.map((stat, index) => (
            <div key={index} className="text-center p-4 rounded-lg border border-border bg-card/30 relative">
              <div className="absolute top-2 right-2">
                {stat.trend === "up" && <TrendingUp className="w-4 h-4 text-green-400" />}
                {stat.trend === "down" && <TrendingUp className="w-4 h-4 text-red-400 rotate-180" />}
                {stat.trend === "stable" && <div className="w-4 h-4 rounded-full bg-gray-400"></div>}
              </div>
              <div className="text-xl font-bold text-foreground mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground mb-2">{stat.label}</div>
              <div
                className={`text-xs ${
                  stat.trend === "up" ? "text-green-400" : stat.trend === "down" ? "text-red-400" : "text-gray-400"
                }`}
              >
                {stat.change}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
              <Zap className="w-4 h-4 text-blue-400" />
              Model Performance Over Time
            </h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="time" stroke="#9CA3AF" fontSize={12} />
                  <YAxis stroke="#9CA3AF" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="accuracy"
                    stroke="#8B5CF6"
                    strokeWidth={3}
                    dot={{ fill: "#8B5CF6", strokeWidth: 2, r: 4 }}
                    name="Accuracy %"
                  />
                  <Line
                    type="monotone"
                    dataKey="fps"
                    stroke="#10B981"
                    strokeWidth={3}
                    dot={{ fill: "#10B981", strokeWidth: 2, r: 4 }}
                    name="FPS"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-yellow-400" />
              Detection Distribution
            </h4>
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={detectionTypes}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={100}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {detectionTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                    }}
                    formatter={(value) => [`${value}%`, "Percentage"]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {detectionTypes.map((type, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-sm p-2 rounded border border-border bg-card/20"
                >
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: type.color }}></div>
                  <span className="text-muted-foreground">{type.name}</span>
                  <span className="text-foreground ml-auto font-medium">{type.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">Hourly Detection Trends</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hourlyDetections}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="hour" stroke="#9CA3AF" fontSize={12} />
                <YAxis stroke="#9CA3AF" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="detections" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg border border-green-500/20 bg-green-500/10 relative">
            <div className="absolute top-2 right-2 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">1,247</div>
              <div className="text-sm text-muted-foreground">Total Detections</div>
              <div className="text-xs text-green-400 mt-1">+18% from yesterday</div>
            </div>
          </div>
          <div className="p-4 rounded-lg border border-red-500/20 bg-red-500/10">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">7</div>
              <div className="text-sm text-muted-foreground">Critical Alerts</div>
              <div className="text-xs text-red-400 mt-1">Requires attention</div>
            </div>
          </div>
          <div className="p-4 rounded-lg border border-blue-500/20 bg-blue-500/10">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">16</div>
              <div className="text-sm text-muted-foreground">Warning Alerts</div>
              <div className="text-xs text-blue-400 mt-1">Under monitoring</div>
            </div>
          </div>
          <div className="p-4 rounded-lg border border-purple-500/20 bg-purple-500/10">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">99.7%</div>
              <div className="text-sm text-muted-foreground">System Uptime</div>
              <div className="text-xs text-purple-400 mt-1">Last 30 days</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
