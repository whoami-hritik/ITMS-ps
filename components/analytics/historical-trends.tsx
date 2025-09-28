"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { TrendingDown, TrendingUp, Minus } from "lucide-react"
import { useState } from "react"

// Generate historical trend data
const generateHistoricalData = (months: number) => {
  return Array.from({ length: months }, (_, i) => ({
    month: new Date(2024, i, 1).toLocaleDateString("en-IN", { month: "short", year: "2-digit" }),
    trackGeometry: 95 - i * 0.5 + Math.random() * 3,
    railWear: 92 - i * 0.8 + Math.random() * 4,
    maintenance: 88 + Math.random() * 8,
    compliance: 96 - i * 0.3 + Math.random() * 2,
  }))
}

const trendMetrics = [
  {
    id: "geometry",
    name: "Track Geometry",
    current: 94.2,
    previous: 95.8,
    unit: "%",
    trend: "down",
  },
  {
    id: "wear",
    name: "Rail Wear Rate",
    current: 2.3,
    previous: 2.1,
    unit: "mm/month",
    trend: "up",
  },
  {
    id: "maintenance",
    name: "Maintenance Efficiency",
    current: 91.5,
    previous: 89.2,
    unit: "%",
    trend: "up",
  },
  {
    id: "compliance",
    name: "Compliance Score",
    current: 96.8,
    previous: 96.9,
    unit: "%",
    trend: "stable",
  },
]

export function HistoricalTrends() {
  const [timeRange, setTimeRange] = useState("12")
  const data = generateHistoricalData(Number.parseInt(timeRange))

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-400" />
      case "down":
        return <TrendingDown className="w-4 h-4 text-red-400" />
      default:
        return <Minus className="w-4 h-4 text-gray-400" />
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-green-400"
      case "down":
        return "text-red-400"
      default:
        return "text-gray-400"
    }
  }

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">Historical Trends</CardTitle>
            <CardDescription>Long-term performance analysis and trends</CardDescription>
          </div>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="6">6 Months</SelectItem>
              <SelectItem value="12">12 Months</SelectItem>
              <SelectItem value="24">24 Months</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Trend Summary */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {trendMetrics.map((metric) => (
            <div key={metric.id} className="p-3 rounded-lg border border-border/50 bg-background/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">{metric.name}</span>
                {getTrendIcon(metric.trend)}
              </div>
              <div className="space-y-1">
                <div className="text-lg font-bold text-foreground">
                  {metric.current}
                  {metric.unit}
                </div>
                <div className={`text-xs ${getTrendColor(metric.trend)}`}>
                  {metric.trend === "up" && "+"}
                  {metric.trend === "down" && "-"}
                  {Math.abs(metric.current - metric.previous).toFixed(1)}
                  {metric.unit} vs last period
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Historical Chart */}
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgb(var(--border))" />
              <XAxis dataKey="month" stroke="rgb(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="rgb(var(--muted-foreground))" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgb(var(--card))",
                  border: "1px solid rgb(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="trackGeometry"
                stroke="#3b82f6"
                strokeWidth={2}
                name="Track Geometry (%)"
              />
              <Line type="monotone" dataKey="railWear" stroke="#10b981" strokeWidth={2} name="Rail Wear (%)" />
              <Line
                type="monotone"
                dataKey="maintenance"
                stroke="#f59e0b"
                strokeWidth={2}
                name="Maintenance Efficiency (%)"
              />
              <Line type="monotone" dataKey="compliance" stroke="#8b5cf6" strokeWidth={2} name="Compliance Score (%)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Key Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <h4 className="font-medium text-blue-400 mb-2">Performance Insight</h4>
            <p className="text-sm text-muted-foreground">
              Track geometry shows gradual decline over the past 6 months. Recommend increased monitoring frequency.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
            <h4 className="font-medium text-green-400 mb-2">Maintenance Success</h4>
            <p className="text-sm text-muted-foreground">
              Maintenance efficiency has improved by 2.3% this quarter, indicating better resource allocation.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
