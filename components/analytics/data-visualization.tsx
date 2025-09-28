"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

// Generate realistic railway monitoring data
const generateTrackData = () => {
  return Array.from({ length: 24 }, (_, i) => ({
    hour: `${i.toString().padStart(2, "0")}:00`,
    lateralDeviation: 2.1 + Math.random() * 1.5,
    verticalDeviation: 1.8 + Math.random() * 1.2,
    gauge: 1435 + (Math.random() - 0.5) * 3,
    twist: 0.5 + Math.random() * 0.8,
  }))
}

const generateRailProfileData = () => {
  return Array.from({ length: 20 }, (_, i) => ({
    position: `KM ${240 + i * 2}`,
    leftRailWear: 8 + Math.random() * 4,
    rightRailWear: 7.5 + Math.random() * 4.5,
    headLoss: 2 + Math.random() * 3,
    corrugation: 0.1 + Math.random() * 0.3,
  }))
}

const systemStatusData = [
  { name: "Operational", value: 85, color: "#10b981" },
  { name: "Warning", value: 12, color: "#f59e0b" },
  { name: "Critical", value: 3, color: "#ef4444" },
]

export function DataVisualization() {
  const [trackData, setTrackData] = useState(generateTrackData())
  const [railData, setRailData] = useState(generateRailProfileData())
  const [activeTab, setActiveTab] = useState("geometry")

  useEffect(() => {
    const interval = setInterval(() => {
      if (activeTab === "geometry") {
        setTrackData(generateTrackData())
      } else if (activeTab === "profile") {
        setRailData(generateRailProfileData())
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [activeTab])

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl">Real-time Data Visualization</CardTitle>
        <CardDescription>Live monitoring data with advanced analytics</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="geometry">Track Geometry</TabsTrigger>
            <TabsTrigger value="profile">Rail Profile</TabsTrigger>
            <TabsTrigger value="status">System Status</TabsTrigger>
          </TabsList>

          <TabsContent value="geometry" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <div className="text-lg font-bold text-blue-400">
                  {trackData[trackData.length - 1]?.lateralDeviation.toFixed(2)}mm
                </div>
                <div className="text-sm text-muted-foreground">Lateral Deviation</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                <div className="text-lg font-bold text-green-400">
                  {trackData[trackData.length - 1]?.verticalDeviation.toFixed(2)}mm
                </div>
                <div className="text-sm text-muted-foreground">Vertical Deviation</div>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trackData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgb(var(--border))" />
                  <XAxis dataKey="hour" stroke="rgb(var(--muted-foreground))" fontSize={12} />
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
                    dataKey="lateralDeviation"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    name="Lateral (mm)"
                  />
                  <Line
                    type="monotone"
                    dataKey="verticalDeviation"
                    stroke="#10b981"
                    strokeWidth={2}
                    name="Vertical (mm)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="profile" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                <div className="text-lg font-bold text-orange-400">
                  {railData[railData.length - 1]?.leftRailWear.toFixed(1)}mm
                </div>
                <div className="text-sm text-muted-foreground">Left Rail Wear</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                <div className="text-lg font-bold text-purple-400">
                  {railData[railData.length - 1]?.rightRailWear.toFixed(1)}mm
                </div>
                <div className="text-sm text-muted-foreground">Right Rail Wear</div>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={railData.slice(-10)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgb(var(--border))" />
                  <XAxis dataKey="position" stroke="rgb(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="rgb(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgb(var(--card))",
                      border: "1px solid rgb(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="leftRailWear" fill="#f59e0b" name="Left Rail (mm)" />
                  <Bar dataKey="rightRailWear" fill="#8b5cf6" name="Right Rail (mm)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="status" className="space-y-4">
            <div className="flex items-center justify-center gap-4 mb-4">
              {systemStatusData.map((item) => (
                <Badge
                  key={item.name}
                  variant="outline"
                  className="px-3 py-1"
                  style={{
                    backgroundColor: `${item.color}10`,
                    borderColor: `${item.color}30`,
                    color: item.color,
                  }}
                >
                  {item.name}: {item.value}%
                </Badge>
              ))}
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={systemStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {systemStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgb(var(--card))",
                      border: "1px solid rgb(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
