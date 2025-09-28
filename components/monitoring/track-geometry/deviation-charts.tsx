"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts"
import { Badge } from "@/components/ui/badge"

// Generate real-time deviation data
const generateDeviationData = () => {
  const now = Date.now()
  return Array.from({ length: 50 }, (_, i) => ({
    distance: (245.0 + i * 0.1).toFixed(1),
    time: new Date(now - (49 - i) * 1000).toLocaleTimeString("en-IN", {
      hour12: false,
      minute: "2-digit",
      second: "2-digit",
    }),
    lateral: (Math.random() - 0.5) * 4,
    vertical: (Math.random() - 0.5) * 3,
    gauge: 1435 + (Math.random() - 0.5) * 6,
    twist: (Math.random() - 0.5) * 2,
  }))
}

export function DeviationCharts() {
  const [data, setData] = useState(generateDeviationData())
  const [activeTab, setActiveTab] = useState("lateral")

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) => {
        const newData = [...prevData.slice(1)]
        const lastDistance = Number.parseFloat(prevData[prevData.length - 1].distance)
        newData.push({
          distance: (lastDistance + 0.1).toFixed(1),
          time: new Date().toLocaleTimeString("en-IN", {
            hour12: false,
            minute: "2-digit",
            second: "2-digit",
          }),
          lateral: (Math.random() - 0.5) * 4,
          vertical: (Math.random() - 0.5) * 3,
          gauge: 1435 + (Math.random() - 0.5) * 6,
          twist: (Math.random() - 0.5) * 2,
        })
        return newData
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const chartConfigs = {
    lateral: {
      dataKey: "lateral",
      color: "#3b82f6",
      name: "Lateral Deviation (mm)",
      limits: { upper: 5, lower: -5 },
      unit: "mm",
    },
    vertical: {
      dataKey: "vertical",
      color: "#10b981",
      name: "Vertical Deviation (mm)",
      limits: { upper: 4, lower: -4 },
      unit: "mm",
    },
    gauge: {
      dataKey: "gauge",
      color: "#f59e0b",
      name: "Track Gauge (mm)",
      limits: { upper: 1438, lower: 1432 },
      unit: "mm",
      nominal: 1435,
    },
    twist: {
      dataKey: "twist",
      color: "#8b5cf6",
      name: "Track Twist (mm)",
      limits: { upper: 2, lower: -2 },
      unit: "mm",
    },
  }

  const currentConfig = chartConfigs[activeTab as keyof typeof chartConfigs]
  const currentValue = data[data.length - 1]?.[currentConfig.dataKey as keyof (typeof data)[0]]

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">Deviation Analysis</CardTitle>
            <CardDescription>Real-time track geometry deviations along the route</CardDescription>
          </div>
          <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
            Live Tracking
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="lateral">Lateral</TabsTrigger>
            <TabsTrigger value="vertical">Vertical</TabsTrigger>
            <TabsTrigger value="gauge">Gauge</TabsTrigger>
            <TabsTrigger value="twist">Twist</TabsTrigger>
          </TabsList>

          <div className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/50">
            <div>
              <span className="text-sm text-muted-foreground">Current {currentConfig.name.split(" ")[0]}</span>
              <div className="text-2xl font-bold" style={{ color: currentConfig.color }}>
                {typeof currentValue === "number" ? currentValue.toFixed(2) : "0.00"} {currentConfig.unit}
              </div>
            </div>
            <div className="text-right text-sm text-muted-foreground">
              <p>Position: KM {data[data.length - 1]?.distance}</p>
              <p>Speed: 45 km/h</p>
            </div>
          </div>

          {Object.entries(chartConfigs).map(([key, config]) => (
            <TabsContent key={key} value={key} className="space-y-4">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgb(var(--border))" />
                    <XAxis
                      dataKey="distance"
                      stroke="rgb(var(--muted-foreground))"
                      fontSize={12}
                      label={{ value: "Distance (KM)", position: "insideBottom", offset: -5 }}
                    />
                    <YAxis
                      stroke="rgb(var(--muted-foreground))"
                      fontSize={12}
                      label={{ value: config.name, angle: -90, position: "insideLeft" }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgb(var(--card))",
                        border: "1px solid rgb(var(--border))",
                        borderRadius: "8px",
                      }}
                      formatter={(value: any) => [`${value.toFixed(2)} ${config.unit}`, config.name]}
                    />

                    {/* Reference lines for limits */}
                    <ReferenceLine y={config.limits.upper} stroke="#ef4444" strokeDasharray="5 5" label="Upper Limit" />
                    <ReferenceLine y={config.limits.lower} stroke="#ef4444" strokeDasharray="5 5" label="Lower Limit" />

                    {/* Nominal line for gauge */}
                    {config.nominal && (
                      <ReferenceLine y={config.nominal} stroke="#10b981" strokeDasharray="3 3" label="Nominal" />
                    )}

                    <Line
                      type="monotone"
                      dataKey={config.dataKey}
                      stroke={config.color}
                      strokeWidth={2}
                      dot={false}
                      name={config.name}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
