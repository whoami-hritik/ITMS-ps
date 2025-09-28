import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import { Wrench, Calendar, Clock, CheckCircle, AlertCircle } from "lucide-react"

export function MaintenanceRecommendations() {
  const recommendations = [
    {
      id: "REC-001",
      title: "Rail Grinding Required",
      priority: "high",
      location: "KM 125.4 - 126.2",
      description: "Head checks detected requiring immediate grinding intervention",
      estimatedTime: "4 hours",
      scheduledDate: "2024-01-15",
      progress: 0,
      status: "pending",
    },
    {
      id: "REC-002",
      title: "Lubrication System Check",
      priority: "medium",
      location: "KM 127.0 - 128.0",
      description: "Increased side wear indicates insufficient lubrication",
      estimatedTime: "2 hours",
      scheduledDate: "2024-01-18",
      progress: 25,
      status: "in-progress",
    },
    {
      id: "REC-003",
      title: "Track Geometry Adjustment",
      priority: "medium",
      location: "KM 129.5 + 150m",
      description: "Gauge corner cracking suggests alignment issues",
      estimatedTime: "6 hours",
      scheduledDate: "2024-01-20",
      progress: 100,
      status: "completed",
    },
    {
      id: "REC-004",
      title: "Rail Replacement Planning",
      priority: "low",
      location: "KM 128.2 + 300m",
      description: "Shelling defect monitoring for replacement scheduling",
      estimatedTime: "12 hours",
      scheduledDate: "2024-02-01",
      progress: 0,
      status: "scheduled",
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-400 bg-red-500/10 border-red-500/20"
      case "medium":
        return "text-yellow-400 bg-yellow-500/10 border-yellow-500/20"
      case "low":
        return "text-green-400 bg-green-500/10 border-green-500/20"
      default:
        return "text-muted-foreground bg-muted/10 border-border"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case "in-progress":
        return <Clock className="w-4 h-4 text-blue-400" />
      case "pending":
        return <AlertCircle className="w-4 h-4 text-yellow-400" />
      default:
        return <Calendar className="w-4 h-4 text-muted-foreground" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Wrench className="w-5 h-5 text-green-400" />
            Maintenance Recommendations
          </CardTitle>
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-3 rounded-lg border border-red-500/20 bg-red-500/10">
            <div className="text-xl font-bold text-red-400">1</div>
            <div className="text-sm text-muted-foreground">High Priority</div>
          </div>
          <div className="text-center p-3 rounded-lg border border-yellow-500/20 bg-yellow-500/10">
            <div className="text-xl font-bold text-yellow-400">2</div>
            <div className="text-sm text-muted-foreground">Medium Priority</div>
          </div>
          <div className="text-center p-3 rounded-lg border border-green-500/20 bg-green-500/10">
            <div className="text-xl font-bold text-green-400">1</div>
            <div className="text-sm text-muted-foreground">Low Priority</div>
          </div>
          <div className="text-center p-3 rounded-lg border border-blue-500/20 bg-blue-500/10">
            <div className="text-xl font-bold text-blue-400">31%</div>
            <div className="text-sm text-muted-foreground">Avg Progress</div>
          </div>
        </div>

        <ScrollArea className="h-64">
          <div className="space-y-4">
            {recommendations.map((rec) => (
              <div key={rec.id} className="p-4 rounded-lg border border-border bg-card/30">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(rec.status)}
                    <div>
                      <h4 className="font-medium text-foreground">{rec.title}</h4>
                      <p className="text-sm text-muted-foreground">{rec.location}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className={getPriorityColor(rec.priority)}>
                    {rec.priority.toUpperCase()}
                  </Badge>
                </div>

                <p className="text-sm text-muted-foreground mb-3">{rec.description}</p>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="text-foreground">{rec.progress}%</span>
                  </div>
                  <Progress value={rec.progress} className="h-2" />
                </div>

                <div className="flex items-center justify-between mt-3 text-sm text-muted-foreground">
                  <span>Duration: {rec.estimatedTime}</span>
                  <span>Scheduled: {rec.scheduledDate}</span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
