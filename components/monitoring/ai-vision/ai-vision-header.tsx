import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, RefreshCw, Settings, Brain } from "lucide-react"

export function AIVisionHeader() {
  return (
    <div className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Brain className="w-6 h-6 text-purple-400" />
              AI Vision & Infringement Detection
            </h1>
            <p className="text-muted-foreground mt-1">
              Intelligent monitoring with real-time threat detection and object tracking
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
              AI Models Active
            </Badge>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                AI Config
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
          <span>Model Version: YOLO-v8.2</span>
          <span>•</span>
          <span>Inference Speed: 45 FPS</span>
          <span>•</span>
          <span>Accuracy: 94.2%</span>
          <span>•</span>
          <span>Active Cameras: 8/8</span>
        </div>
      </div>
    </div>
  )
}
