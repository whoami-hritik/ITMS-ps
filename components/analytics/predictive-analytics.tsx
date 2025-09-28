"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import { TrendingUp, AlertTriangle, Wrench, Calendar } from "lucide-react"

// Generate predictive maintenance data
const generateMaintenanceData = () => {
  return Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    predicted: 85 - i * 1.2 + Math.random() * 5,
    actual: 85 - i * 1.1 + Math.random() * 4,
    threshold: 75,
  }))
}

const generateWearPrediction = () => {
  return Array.from({ length: 12 }, (_, i) => ({
    month: `Month ${i + 1}`,
    leftRail: 8 + i * 0.8 + Math.random() * 2,
    rightRail: 7.5 + i * 0.9 + Math.random() * 2,
    criticalLevel: 15,
  }))
}

const maintenanceAlerts = [
  {
    id: "1",
    type: "critical",
    component: "Left Rail - KM 245.8",
    prediction: "Requires maintenance in 5 days",
    confidence: 94,
    impact: "High",
  },
  {
    id: "2",
    type: "warning",
    component: "Track Geometry - Section B",
    prediction: "Maintenance recommended in 2 weeks",
    confidence: 87,
    impact: "Medium",
  },
  {
    id: "3",
    type: "info",
    component: "Fastening System - KM 267",
    prediction: "Scheduled maintenance in 1 month",
    confidence: 76,
    impact: "Low",
  },
]

export function PredictiveAnalytics() {
  const maintenanceData = generateMaintenanceData()
  const wearData = generateWearPrediction()

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              Predictive Analytics
            </CardTitle>
            <CardDescription>AI-powered maintenance predictions and trend analysis</CardDescription>
          </div>
          <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
            AI Enabled
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="maintenance" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="maintenance">Maintenance Prediction</TabsTrigger>
            <TabsTrigger value="wear">Wear Analysis</TabsTrigger>
            <TabsTrigger value="alerts">Smart Alerts</TabsTrigger>
          </TabsList>

          <TabsContent value="maintenance" className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <div className="text-lg font-bold text-blue-400">5 Days</div>
                <div className="text-sm text-muted-foreground">Next Critical</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                <div className="text-lg font-bold text-green-400">92%</div>
                <div className="text-sm text-muted-foreground">Prediction Accuracy</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                <div className="text-lg font-bold text-orange-400">₹2.4L</div>
                <div className="text-sm text-muted-foreground">Cost Savings</div>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={maintenanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgb(var(--border))" />
                  <XAxis dataKey="day" stroke="rgb(var(--muted-foreground))" fontSize={12} />
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
                    dataKey="predicted"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Predicted"
                  />
                  <Line type="monotone" dataKey="actual" stroke="#10b981" strokeWidth={2} name="Actual" />
                  <Line
                    type="monotone"
                    dataKey="threshold"
                    stroke="#ef4444"
                    strokeWidth={1}
                    strokeDasharray="3 3"
                    name="Threshold"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="wear" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                <div className="text-lg font-bold text-purple-400">8 Months</div>
                <div className="text-sm text-muted-foreground">Predicted Rail Life</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                <div className="text-lg font-bold text-yellow-400">12.3mm</div>
                <div className="text-sm text-muted-foreground">Max Predicted Wear</div>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={wearData}>
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
                  <Area
                    type="monotone"
                    dataKey="leftRail"
                    stackId="1"
                    stroke="#8b5cf6"
                    fill="#8b5cf6"
                    fillOpacity={0.3}
                    name="Left Rail"
                  />
                  <Area
                    type="monotone"
                    dataKey="rightRail"
                    stackId="2"
                    stroke="#f59e0b"
                    fill="#f59e0b"
                    fillOpacity={0.3}
                    name="Right Rail"
                  />
                  <Line
                    type="monotone"
                    dataKey="criticalLevel"
                    stroke="#ef4444"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Critical Level"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-4">
            <div className="space-y-3">
              {maintenanceAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="p-4 rounded-lg border border-border/50 bg-background/50 hover:bg-background/70 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        {alert.type === "critical" && <AlertTriangle className="w-5 h-5 text-red-400" />}
                        {alert.type === "warning" && <Wrench className="w-5 h-5 text-yellow-400" />}
                        {alert.type === "info" && <Calendar className="w-5 h-5 text-blue-400" />}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground mb-1">{alert.component}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{alert.prediction}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Confidence: {alert.confidence}%</span>
                          <span>Impact: {alert.impact}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={
                          alert.type === "critical"
                            ? "bg-red-500/10 text-red-400 border-red-500/20"
                            : alert.type === "warning"
                              ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                              : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                        }
                      >
                        {alert.type}
                      </Badge>
                      <Button variant="outline" size="sm">
                        Schedule
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
