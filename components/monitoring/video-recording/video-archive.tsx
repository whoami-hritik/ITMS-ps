import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Archive, Download, Search, Filter, Play, Trash2 } from "lucide-react"

export function VideoArchive() {
  const archivedVideos = [
    {
      id: "VID-001",
      filename: "CAM-001_20240115_060000.mp4",
      camera: "Front View",
      date: "2024-01-15",
      time: "06:00:00",
      duration: "01:00:00",
      size: "2.4 GB",
      quality: "4K",
      status: "archived",
      location: "KM 125.0-126.0",
    },
    {
      id: "VID-002",
      filename: "CAM-002_20240115_060000.mp4",
      camera: "Left Rail",
      date: "2024-01-15",
      time: "06:00:00",
      duration: "01:00:00",
      size: "2.1 GB",
      quality: "4K",
      status: "archived",
      location: "KM 125.0-126.0",
    },
    {
      id: "VID-003",
      filename: "CAM-005_20240115_080000.mp4",
      camera: "Track Overview",
      date: "2024-01-15",
      time: "08:00:00",
      duration: "02:00:00",
      size: "4.8 GB",
      quality: "4K",
      status: "archived",
      location: "KM 125.0-127.0",
    },
    {
      id: "VID-004",
      filename: "CAM-003_20240114_220000.mp4",
      camera: "Right Rail",
      date: "2024-01-14",
      time: "22:00:00",
      duration: "08:00:00",
      size: "9.6 GB",
      quality: "2K",
      status: "archived",
      location: "KM 125.0-133.0",
    },
    {
      id: "VID-005",
      filename: "CAM-008_20240114_120000.mp4",
      camera: "Platform View",
      date: "2024-01-14",
      time: "12:00:00",
      duration: "04:00:00",
      size: "7.2 GB",
      quality: "4K",
      status: "processing",
      location: "KM 125.0-129.0",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "archived":
        return "text-green-400 bg-green-500/10 border-green-500/20"
      case "processing":
        return "text-yellow-400 bg-yellow-500/10 border-yellow-500/20"
      case "uploading":
        return "text-blue-400 bg-blue-500/10 border-blue-500/20"
      default:
        return "text-muted-foreground bg-muted/10 border-border"
    }
  }

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case "4K":
        return "text-purple-400 bg-purple-500/10 border-purple-500/20"
      case "2K":
        return "text-blue-400 bg-blue-500/10 border-blue-500/20"
      case "1080p":
        return "text-green-400 bg-green-500/10 border-green-500/20"
      default:
        return "text-muted-foreground bg-muted/10 border-border"
    }
  }

  const totalSize = archivedVideos.reduce((sum, video) => sum + Number.parseFloat(video.size.replace(" GB", "")), 0)
  const archivedCount = archivedVideos.filter((v) => v.status === "archived").length

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Archive className="w-5 h-5 text-orange-400" />
            Video Archive
          </CardTitle>
          <div className="flex items-center gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Videos</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="text-center p-3 rounded-lg border border-orange-500/20 bg-orange-500/10">
            <div className="text-xl font-bold text-orange-400">{archivedCount}</div>
            <div className="text-sm text-muted-foreground">Archived Videos</div>
          </div>
          <div className="text-center p-3 rounded-lg border border-blue-500/20 bg-blue-500/10">
            <div className="text-xl font-bold text-blue-400">{totalSize.toFixed(1)} GB</div>
            <div className="text-sm text-muted-foreground">Total Size</div>
          </div>
          <div className="text-center p-3 rounded-lg border border-green-500/20 bg-green-500/10">
            <div className="text-xl font-bold text-green-400">16h 00m</div>
            <div className="text-sm text-muted-foreground">Total Duration</div>
          </div>
        </div>

        <ScrollArea className="h-64">
          <div className="space-y-3">
            {archivedVideos.map((video) => (
              <div
                key={video.id}
                className="p-4 rounded-lg border border-border bg-card/30 hover:bg-card/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-8 rounded bg-red-500/10 flex items-center justify-center">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    </div>
                    <div>
                      <span className="font-medium text-foreground">{video.filename}</span>
                      <div className="text-sm text-muted-foreground">{video.camera}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={getQualityColor(video.quality)}>
                      {video.quality}
                    </Badge>
                    <Badge variant="outline" className={getStatusColor(video.status)}>
                      {video.status.toUpperCase()}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm text-muted-foreground mb-3">
                  <div>
                    <span>Date:</span>
                    <div className="text-foreground">{video.date}</div>
                  </div>
                  <div>
                    <span>Time:</span>
                    <div className="text-foreground">{video.time}</div>
                  </div>
                  <div>
                    <span>Duration:</span>
                    <div className="text-foreground">{video.duration}</div>
                  </div>
                  <div>
                    <span>Size:</span>
                    <div className="text-foreground">{video.size}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Location: {video.location}</span>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Play className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
