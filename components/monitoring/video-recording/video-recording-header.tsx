import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, RefreshCw, Settings, Video } from "lucide-react"

export function VideoRecordingHeader() {
  return (
    <div className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Video className="w-6 h-6 text-red-400" />
              4K Video Recording System
            </h1>
            <p className="text-muted-foreground mt-1">
              High-definition video capture and intelligent storage management
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Badge variant="outline" className="bg-red-500/10 text-red-400 border-red-500/20">
              <div className="w-2 h-2 bg-red-400 rounded-full mr-2 animate-pulse" />
              Recording Active
            </Badge>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Configure
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
          <span>Resolution: 3840x2160 @ 60fps</span>
          <span>•</span>
          <span>Bitrate: 50 Mbps</span>
          <span>•</span>
          <span>Codec: H.265/HEVC</span>
          <span>•</span>
          <span>Storage: 2.4TB Available</span>
        </div>
      </div>
    </div>
  )
}
