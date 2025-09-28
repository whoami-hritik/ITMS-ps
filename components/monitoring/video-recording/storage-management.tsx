import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { HardDrive, Trash2, Archive, Download } from "lucide-react"

export function StorageManagement() {
  const storageDevices = [
    {
      id: "SSD-001",
      name: "Primary SSD",
      type: "NVMe SSD",
      capacity: "4TB",
      used: "1.6TB",
      available: "2.4TB",
      percentage: 40,
      status: "healthy",
      temperature: "42°C",
    },
    {
      id: "HDD-001",
      name: "Archive HDD",
      type: "SATA HDD",
      capacity: "8TB",
      used: "6.2TB",
      available: "1.8TB",
      percentage: 78,
      status: "warning",
      temperature: "38°C",
    },
    {
      id: "NAS-001",
      name: "Network Storage",
      type: "Network NAS",
      capacity: "16TB",
      used: "4.8TB",
      available: "11.2TB",
      percentage: 30,
      status: "healthy",
      temperature: "N/A",
    },
  ]

  const recentFiles = [
    { name: "CAM-001_20240115_143022.mp4", size: "2.4 GB", date: "2 hours ago", camera: "Front View" },
    { name: "CAM-002_20240115_143022.mp4", size: "2.1 GB", date: "2 hours ago", camera: "Left Rail" },
    { name: "CAM-005_20240115_120000.mp4", size: "3.2 GB", date: "5 hours ago", camera: "Track Overview" },
    { name: "CAM-003_20240115_100000.mp4", size: "2.8 GB", date: "7 hours ago", camera: "Right Rail" },
    { name: "CAM-008_20240115_080000.mp4", size: "2.6 GB", date: "9 hours ago", camera: "Platform View" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "text-green-400 bg-green-500/10 border-green-500/20"
      case "warning":
        return "text-yellow-400 bg-yellow-500/10 border-yellow-500/20"
      case "critical":
        return "text-red-400 bg-red-500/10 border-red-500/20"
      default:
        return "text-muted-foreground bg-muted/10 border-border"
    }
  }

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return "bg-red-400"
    if (percentage >= 60) return "bg-yellow-400"
    return "bg-green-400"
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <HardDrive className="w-5 h-5 text-blue-400" />
            Storage Management
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Archive className="w-4 h-4 mr-2" />
              Auto Archive
            </Button>
            <Button variant="outline" size="sm">
              <Trash2 className="w-4 h-4 mr-2" />
              Cleanup
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-foreground">Storage Devices</h4>
          {storageDevices.map((device) => (
            <div key={device.id} className="p-4 rounded-lg border border-border bg-card/30">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <HardDrive className="w-5 h-5 text-blue-400" />
                  <div>
                    <span className="font-medium text-foreground">{device.name}</span>
                    <div className="text-sm text-muted-foreground">{device.type}</div>
                  </div>
                </div>
                <Badge variant="outline" className={getStatusColor(device.status)}>
                  {device.status.toUpperCase()}
                </Badge>
              </div>

              <div className="space-y-2 mb-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Storage Usage</span>
                  <span className="text-foreground">
                    {device.used} / {device.capacity}
                  </span>
                </div>
                <Progress value={device.percentage} className="h-2" />
              </div>

              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Available:</span>
                  <div className="text-foreground font-medium">{device.available}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Usage:</span>
                  <div className="text-foreground font-medium">{device.percentage}%</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Temp:</span>
                  <div className="text-foreground font-medium">{device.temperature}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-foreground">Recent Files</h4>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Bulk Download
            </Button>
          </div>
          <div className="space-y-2">
            {recentFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg border border-border bg-card/30 hover:bg-card/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-red-500/10 flex items-center justify-center">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">{file.name}</div>
                    <div className="text-xs text-muted-foreground">{file.camera}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-foreground">{file.size}</div>
                  <div className="text-xs text-muted-foreground">{file.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="text-center p-3 rounded-lg border border-border bg-card/30">
            <div className="text-lg font-bold text-blue-400">28TB</div>
            <div className="text-sm text-muted-foreground">Total Capacity</div>
          </div>
          <div className="text-center p-3 rounded-lg border border-border bg-card/30">
            <div className="text-lg font-bold text-yellow-400">12.6TB</div>
            <div className="text-sm text-muted-foreground">Used Space</div>
          </div>
          <div className="text-center p-3 rounded-lg border border-border bg-card/30">
            <div className="text-lg font-bold text-green-400">15.4TB</div>
            <div className="text-sm text-muted-foreground">Available</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
