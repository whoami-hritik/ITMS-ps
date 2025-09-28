import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Play, Pause, Square, RotateCcw, Camera } from "lucide-react"

export function RecordingControls() {
  const cameras = [
    { id: "CAM-001", name: "Front View", status: "recording", duration: "02:45:32", size: "12.4 GB" },
    { id: "CAM-002", name: "Left Rail", status: "recording", duration: "02:45:32", size: "11.8 GB" },
    { id: "CAM-003", name: "Right Rail", status: "recording", duration: "02:45:32", size: "12.1 GB" },
    { id: "CAM-004", name: "Rear View", status: "recording", duration: "02:45:32", size: "11.9 GB" },
    { id: "CAM-005", name: "Track Overview", status: "recording", duration: "02:45:32", size: "13.2 GB" },
    { id: "CAM-006", name: "Infrastructure", status: "paused", duration: "01:23:15", size: "6.8 GB" },
    { id: "CAM-007", name: "Signal View", status: "stopped", duration: "00:00:00", size: "0 GB" },
    { id: "CAM-008", name: "Platform View", status: "recording", duration: "02:45:32", size: "12.6 GB" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "recording":
        return "text-red-400 bg-red-500/10 border-red-500/20"
      case "paused":
        return "text-yellow-400 bg-yellow-500/10 border-yellow-500/20"
      case "stopped":
        return "text-gray-400 bg-gray-500/10 border-gray-500/20"
      default:
        return "text-muted-foreground bg-muted/10 border-border"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "recording":
        return <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
      case "paused":
        return <div className="w-2 h-2 bg-yellow-400 rounded-full" />
      case "stopped":
        return <div className="w-2 h-2 bg-gray-400 rounded-full" />
      default:
        return <div className="w-2 h-2 bg-muted-foreground rounded-full" />
    }
  }

  const recordingCameras = cameras.filter((c) => c.status === "recording").length
  const totalSize = cameras.reduce((sum, cam) => sum + Number.parseFloat(cam.size.replace(" GB", "")), 0)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-red-400" />
            Recording Controls
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="text-green-400 border-green-500/20 hover:bg-green-500/10 bg-transparent"
            >
              <Play className="w-4 h-4 mr-2" />
              Start All
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-yellow-400 border-yellow-500/20 hover:bg-yellow-500/10 bg-transparent"
            >
              <Pause className="w-4 h-4 mr-2" />
              Pause All
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-red-400 border-red-500/20 hover:bg-red-500/10 bg-transparent"
            >
              <Square className="w-4 h-4 mr-2" />
              Stop All
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 rounded-lg border border-red-500/20 bg-red-500/10">
            <div className="text-2xl font-bold text-red-400">{recordingCameras}</div>
            <div className="text-sm text-muted-foreground">Active Recordings</div>
          </div>
          <div className="text-center p-4 rounded-lg border border-blue-500/20 bg-blue-500/10">
            <div className="text-2xl font-bold text-blue-400">{totalSize.toFixed(1)} GB</div>
            <div className="text-sm text-muted-foreground">Total Size</div>
          </div>
          <div className="text-center p-4 rounded-lg border border-green-500/20 bg-green-500/10">
            <div className="text-2xl font-bold text-green-400">02:45:32</div>
            <div className="text-sm text-muted-foreground">Session Duration</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cameras.map((camera) => (
            <div key={camera.id} className="p-4 rounded-lg border border-border bg-card/30">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  {getStatusIcon(camera.status)}
                  <span className="font-medium text-foreground">{camera.name}</span>
                </div>
                <Badge variant="outline" className={getStatusColor(camera.status)}>
                  {camera.status.toUpperCase()}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                <div>
                  <span className="text-muted-foreground">Duration:</span>
                  <div className="text-foreground font-mono">{camera.duration}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Size:</span>
                  <div className="text-foreground font-mono">{camera.size}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  {camera.status === "recording" ? (
                    <Pause className="w-4 h-4 mr-2" />
                  ) : (
                    <Play className="w-4 h-4 mr-2" />
                  )}
                  {camera.status === "recording" ? "Pause" : "Start"}
                </Button>
                <Button variant="outline" size="sm">
                  <Square className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
