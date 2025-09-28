"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Play, Pause, Download, Settings, MapPin } from "lucide-react"
import { useRouter } from "next/navigation"

export function TrackGeometryHeader() {
  const [isRecording, setIsRecording] = useState(true)
  const [selectedSection, setSelectedSection] = useState("section-a")
  const router = useRouter()

  return (
    <header className="border-b border-border/50 bg-card/30 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Track Geometry Monitoring</h1>
              <p className="text-sm text-muted-foreground">Real-time track alignment and geometry analysis</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Select value={selectedSection} onValueChange={setSelectedSection}>
              <SelectTrigger className="w-40">
                <MapPin className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="section-a">Section A-B</SelectItem>
                <SelectItem value="section-b">Section B-C</SelectItem>
                <SelectItem value="section-c">Section C-D</SelectItem>
                <SelectItem value="section-d">Section D-E</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant={isRecording ? "destructive" : "default"}
              size="sm"
              onClick={() => setIsRecording(!isRecording)}
            >
              {isRecording ? (
                <>
                  <Pause className="w-4 h-4 mr-2" />
                  Stop Recording
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Start Recording
                </>
              )}
            </Button>

            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>

            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4" />
            </Button>

            <Badge
              variant="outline"
              className={
                isRecording
                  ? "bg-green-500/10 text-green-400 border-green-500/20"
                  : "bg-gray-500/10 text-gray-400 border-gray-500/20"
              }
            >
              <div
                className={`w-2 h-2 rounded-full mr-2 ${isRecording ? "bg-green-400 pulse-data" : "bg-gray-400"}`}
              ></div>
              {isRecording ? "RECORDING" : "STOPPED"}
            </Badge>
          </div>
        </div>
      </div>
    </header>
  )
}
