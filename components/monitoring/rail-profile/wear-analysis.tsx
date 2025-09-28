import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts"
import { Activity, Calendar, Download } from "lucide-react"

export function WearAnalysis() {
  const wearData = [
    { distance: 0, headWear: 0.2, sideWear: 0.1, totalWear: 0.3 },
    { distance: 100, headWear: 0.8, sideWear: 0.4, totalWear: 1.2 },
    { distance: 200, headWear: 1.5, sideWear: 0.9, totalWear: 2.4 },
    { distance: 300, headWear: 2.1, sideWear: 1.3, totalWear: 3.4 },
    { distance: 400, headWear: 2.8, sideWear: 1.8, totalWear: 4.6 },
    { distance: 500, headWear: 3.2, sideWear: 2.1, totalWear: 5.3 },
    { distance: 600, headWear: 3.9, sideWear: 2.6, totalWear: 6.5 },
    { distance: 700, headWear: 4.3, sideWear: 2.9, totalWear: 7.2 },
    { distance: 800, headWear: 4.8, sideWear: 3.2, totalWear: 8.0 },
    { distance: 900, headWear: 5.1, sideWear: 3.4, totalWear: 8.5 },
    { distance: 1000, headWear: 5.6, sideWear: 3.8, totalWear: 9.4 },
  ]

  const wearStats = [
    { label: "Head Wear Rate", value: "5.6mm/MGT", status: "warning" },
    { label: "Side Wear Rate", value: "3.8mm/MGT", status: "good" },
    { label: "Predicted Life", value: "18.2 MGT", status: "good" },
    { label: "Replacement Due", value: "14 months", status: "warning" },
  ]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-orange-400" />
            Rail Wear Analysis
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              History
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Report
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {wearStats.map((stat, index) => (
            <div key={index} className="text-center p-3 rounded-lg border border-border bg-card/30">
              <div className="text-lg font-bold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
              <Badge
                variant="outline"
                className={`mt-2 ${stat.status === "good" ? "text-green-400 bg-green-500/10 border-green-500/20" : "text-yellow-400 bg-yellow-500/10 border-yellow-500/20"}`}
              >
                {stat.status.toUpperCase()}
              </Badge>
            </div>
          ))}
        </div>

        <div className="h-64">
          <h4 className="text-sm font-medium text-foreground mb-3">Wear Progression (mm vs Distance)</h4>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={wearData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="distance" stroke="#9CA3AF" fontSize={12} tickFormatter={(value) => `${value}m`} />
              <YAxis stroke="#9CA3AF" fontSize={12} tickFormatter={(value) => `${value}mm`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "1px solid #374151",
                  borderRadius: "8px",
                }}
                labelFormatter={(value) => `Distance: ${value}m`}
                formatter={(value: any, name: string) => [
                  `${value}mm`,
                  name === "headWear" ? "Head Wear" : name === "sideWear" ? "Side Wear" : "Total Wear",
                ]}
              />
              <Area type="monotone" dataKey="totalWear" stackId="1" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.3} />
              <Area type="monotone" dataKey="headWear" stackId="2" stroke="#EF4444" fill="#EF4444" fillOpacity={0.4} />
              <Area type="monotone" dataKey="sideWear" stackId="3" stroke="#10B981" fill="#10B981" fillOpacity={0.4} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
