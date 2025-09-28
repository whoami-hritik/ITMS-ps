import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Settings, Monitor, Zap, Save } from "lucide-react"

export function QualitySettings() {
  const presets = [
    { name: "Ultra High", resolution: "3840x2160", fps: 60, bitrate: "50 Mbps", codec: "H.265" },
    { name: "High", resolution: "2560x1440", fps: 30, bitrate: "25 Mbps", codec: "H.265" },
    { name: "Medium", resolution: "1920x1080", fps: 30, bitrate: "15 Mbps", codec: "H.264" },
    { name: "Low", resolution: "1280x720", fps: 30, bitrate: "8 Mbps", codec: "H.264" },
  ]

  const currentSettings = {
    resolution: "3840x2160",
    fps: 60,
    bitrate: 50,
    codec: "H.265/HEVC",
    quality: 85,
    compression: "Medium",
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-purple-400" />
            Quality Settings
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Zap className="w-4 h-4 mr-2" />
              Auto Optimize
            </Button>
            <Button variant="outline" size="sm">
              <Save className="w-4 h-4 mr-2" />
              Save Profile
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-foreground">Quality Presets</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {presets.map((preset, index) => (
              <div
                key={index}
                className="p-3 rounded-lg border border-border bg-card/30 hover:bg-card/50 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-foreground">{preset.name}</span>
                  <Badge variant="outline" className="text-blue-400 bg-blue-500/10 border-blue-500/20">
                    {preset.codec}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                  <div>{preset.resolution}</div>
                  <div>{preset.fps} FPS</div>
                  <div>{preset.bitrate}</div>
                  <div>Quality: High</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-medium text-foreground">Current Configuration</h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Resolution</label>
              <Select defaultValue="4k">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="4k">3840x2160 (4K)</SelectItem>
                  <SelectItem value="2k">2560x1440 (2K)</SelectItem>
                  <SelectItem value="1080p">1920x1080 (1080p)</SelectItem>
                  <SelectItem value="720p">1280x720 (720p)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Frame Rate</label>
              <Select defaultValue="60">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="60">60 FPS</SelectItem>
                  <SelectItem value="30">30 FPS</SelectItem>
                  <SelectItem value="25">25 FPS</SelectItem>
                  <SelectItem value="24">24 FPS</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Codec</label>
              <Select defaultValue="h265">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="h265">H.265/HEVC</SelectItem>
                  <SelectItem value="h264">H.264/AVC</SelectItem>
                  <SelectItem value="av1">AV1</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Compression</label>
              <Select defaultValue="medium">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low (Larger files)</SelectItem>
                  <SelectItem value="medium">Medium (Balanced)</SelectItem>
                  <SelectItem value="high">High (Smaller files)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm text-muted-foreground">Bitrate (Mbps)</label>
                <span className="text-sm text-foreground">{currentSettings.bitrate} Mbps</span>
              </div>
              <Slider defaultValue={[currentSettings.bitrate]} max={100} min={5} step={5} className="w-full" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm text-muted-foreground">Quality Level</label>
                <span className="text-sm text-foreground">{currentSettings.quality}%</span>
              </div>
              <Slider defaultValue={[currentSettings.quality]} max={100} min={50} step={5} className="w-full" />
            </div>
          </div>
        </div>

        <div className="p-4 rounded-lg border border-blue-500/20 bg-blue-500/10">
          <div className="flex items-start gap-3">
            <Monitor className="w-5 h-5 text-blue-400 mt-0.5" />
            <div>
              <h5 className="text-sm font-medium text-blue-400 mb-1">Current Settings Impact</h5>
              <div className="text-sm text-muted-foreground space-y-1">
                <div>• File size: ~450 MB per minute per camera</div>
                <div>• Storage usage: ~27 GB per hour (8 cameras)</div>
                <div>• Network bandwidth: ~400 Mbps total</div>
                <div>• Estimated storage duration: 42 hours at current rate</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="text-center p-3 rounded-lg border border-border bg-card/30">
            <div className="text-lg font-bold text-purple-400">4K</div>
            <div className="text-sm text-muted-foreground">Resolution</div>
          </div>
          <div className="text-center p-3 rounded-lg border border-border bg-card/30">
            <div className="text-lg font-bold text-green-400">60</div>
            <div className="text-sm text-muted-foreground">FPS</div>
          </div>
          <div className="text-center p-3 rounded-lg border border-border bg-card/30">
            <div className="text-lg font-bold text-blue-400">50</div>
            <div className="text-sm text-muted-foreground">Mbps</div>
          </div>
          <div className="text-center p-3 rounded-lg border border-border bg-card/30">
            <div className="text-lg font-bold text-orange-400">H.265</div>
            <div className="text-sm text-muted-foreground">Codec</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
