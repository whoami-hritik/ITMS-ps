import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Calendar, Clock, Plus, Edit } from "lucide-react"

export function RecordingScheduler() {
  const schedules = [
    {
      id: "SCH-001",
      name: "Peak Hours Recording",
      cameras: ["CAM-001", "CAM-002", "CAM-005"],
      startTime: "06:00",
      endTime: "22:00",
      days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      status: "active",
      quality: "Ultra High",
    },
    {
      id: "SCH-002",
      name: "Night Surveillance",
      cameras: ["CAM-003", "CAM-004", "CAM-006", "CAM-008"],
      startTime: "22:00",
      endTime: "06:00",
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      status: "active",
      quality: "High",
    },
    {
      id: "SCH-003",
      name: "Weekend Monitoring",
      cameras: ["CAM-001", "CAM-005", "CAM-007"],
      startTime: "08:00",
      endTime: "20:00",
      days: ["Sat", "Sun"],
      status: "inactive",
      quality: "Medium",
    },
    {
      id: "SCH-004",
      name: "Maintenance Window",
      cameras: ["CAM-007"],
      startTime: "02:00",
      endTime: "04:00",
      days: ["Sun"],
      status: "active",
      quality: "Low",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-400 bg-green-500/10 border-green-500/20"
      case "inactive":
        return "text-gray-400 bg-gray-500/10 border-gray-500/20"
      case "pending":
        return "text-yellow-400 bg-yellow-500/10 border-yellow-500/20"
      default:
        return "text-muted-foreground bg-muted/10 border-border"
    }
  }

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case "Ultra High":
        return "text-purple-400 bg-purple-500/10 border-purple-500/20"
      case "High":
        return "text-blue-400 bg-blue-500/10 border-blue-500/20"
      case "Medium":
        return "text-yellow-400 bg-yellow-500/10 border-yellow-500/20"
      case "Low":
        return "text-green-400 bg-green-500/10 border-green-500/20"
      default:
        return "text-muted-foreground bg-muted/10 border-border"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-green-400" />
            Recording Scheduler
          </CardTitle>
          <Button variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Schedule
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {schedules.map((schedule) => (
          <div key={schedule.id} className="p-4 rounded-lg border border-border bg-card/30">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <Switch checked={schedule.status === "active"} />
                <div>
                  <span className="font-medium text-foreground">{schedule.name}</span>
                  <div className="text-sm text-muted-foreground">{schedule.id}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={getStatusColor(schedule.status)}>
                  {schedule.status.toUpperCase()}
                </Badge>
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span className="text-muted-foreground">Time:</span>
                  <span className="text-foreground">
                    {schedule.startTime} - {schedule.endTime}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-green-400" />
                  <span className="text-muted-foreground">Days:</span>
                  <span className="text-foreground">{schedule.days.join(", ")}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="text-muted-foreground">Cameras:</span>
                  <div className="text-foreground">{schedule.cameras.length} selected</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Quality:</span>
                  <Badge variant="outline" className={getQualityColor(schedule.quality)}>
                    {schedule.quality}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-1">
              {schedule.cameras.map((camera, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {camera}
                </Badge>
              ))}
            </div>
          </div>
        ))}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="text-center p-3 rounded-lg border border-border bg-card/30">
            <div className="text-lg font-bold text-green-400">3</div>
            <div className="text-sm text-muted-foreground">Active Schedules</div>
          </div>
          <div className="text-center p-3 rounded-lg border border-border bg-card/30">
            <div className="text-lg font-bold text-blue-400">18</div>
            <div className="text-sm text-muted-foreground">Hours/Day</div>
          </div>
          <div className="text-center p-3 rounded-lg border border-border bg-card/30">
            <div className="text-lg font-bold text-purple-400">8</div>
            <div className="text-sm text-muted-foreground">Cameras Scheduled</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
