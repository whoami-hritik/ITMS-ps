"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Ruler, AlertTriangle, CheckCircle } from "lucide-react"

// Simulate real-time geometry data
const generateGeometryData = () => ({
  lateralDeviation: {
    current: 2.1 + Math.random() * 1.5,
    max: 5.0,
    status: "normal",
  },
  verticalDeviation: {
    current: 1.8 + Math.random() * 1.2,
    max: 4.0,
    status: "normal",
  },
  gauge: {
    current: 1435 + (Math.random() - 0.5) * 3,
    nominal: 1435,
    tolerance: 3,
    status: "normal",
  },
  twist: {
    current: 0.5 + Math.random() * 0.8,
    max: 2.0,
    status: "normal",
  },
  crossLevel: {
    current: 1.2 + Math.random() * 0.8,
    max: 3.0,
    status: "normal",
  },
  curvature: {
    current: 0.8 + Math.random() * 0.4,
    max: 2.5,
    status: "normal",
  },
})

export function GeometryMetrics() {
  const [data, setData] = useState(generateGeometryData())
  const [lastUpdate, setLastUpdate] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setData(generateGeometryData())
      setLastUpdate(new Date())
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal":
        return "text-green-400"
      case "warning":
        return "text-yellow-400"
      case "critical":
        return "text-red-400"
      default:
        return "text-gray-400"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "normal":
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-400" />
      case "critical":
        return <AlertTriangle className="w-4 h-4 text-red-400" />
      default:
        return <CheckCircle className="w-4 h-4 text-gray-400" />
    }
  }

  const metrics = [
    {
      id: "lateral",
      name: "Lateral Deviation",
      value: data.lateralDeviation.current,
      unit: "mm",
      max: data.lateralDeviation.max,
      status: data.lateralDeviation.status,
      description: "Horizontal track alignment",
    },
    {
      id: "vertical",
      name: "Vertical Deviation",
      value: data.verticalDeviation.current,
      unit: "mm",
      max: data.verticalDeviation.max,
      status: data.verticalDeviation.status,
      description: "Vertical track profile",
    },
    {
      id: "gauge",
      name: "Track Gauge",
      value: data.gauge.current,
      unit: "mm",
      nominal: data.gauge.nominal,
      tolerance: data.gauge.tolerance,
      status: data.gauge.status,
      description: "Distance between rails",
    },
    {
      id: "twist",
      name: "Track Twist",
      value: data.twist.current,
      unit: "mm",
      max: data.twist.max,
      status: data.twist.status,
      description: "Rail rotation difference",
    },
    {
      id: "crosslevel",
      name: "Cross Level",
      value: data.crossLevel.current,
      unit: "mm",
      max: data.crossLevel.max,
      status: data.crossLevel.status,
      description: "Rail height difference",
    },
    {
      id: "curvature",
      name: "Curvature",
      value: data.curvature.current,
      unit: "mm",
      max: data.curvature.max,
      status: data.curvature.status,
      description: "Track curve radius",
    },
  ]

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-blue-400" />
            <div>
              <CardTitle className="text-xl">Geometry Measurements</CardTitle>
              <CardDescription>Real-time track geometry parameters</CardDescription>
            </div>
          </div>
          <div className="text-right text-sm text-muted-foreground">
            <p>Last Update: {lastUpdate.toLocaleTimeString("en-IN")}</p>
            <p>KM 245.8 - Section A-B</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {metrics.map((metric) => (
            <div key={metric.id} className="p-4 rounded-lg border border-border/50 bg-background/50">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-foreground">{metric.name}</h4>
                {getStatusIcon(metric.status)}
              </div>

              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className={`text-2xl font-bold ${getStatusColor(metric.status)}`}>
                    {metric.value.toFixed(2)}
                  </span>
                  <span className="text-sm text-muted-foreground">{metric.unit}</span>
                </div>

                {metric.max && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>
                        Limit: {metric.max}
                        {metric.unit}
                      </span>
                      <span>{((metric.value / metric.max) * 100).toFixed(0)}%</span>
                    </div>
                    <Progress value={(metric.value / metric.max) * 100} className="h-1" />
                  </div>
                )}

                {metric.nominal && (
                  <div className="text-xs text-muted-foreground">
                    Nominal: {metric.nominal}±{metric.tolerance}
                    {metric.unit}
                  </div>
                )}

                <p className="text-xs text-muted-foreground">{metric.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
