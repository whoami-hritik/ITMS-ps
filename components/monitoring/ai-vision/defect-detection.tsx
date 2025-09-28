"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Wrench, MapPin, Clock, Eye, Download, Camera, Zap, Settings, AlertCircle } from "lucide-react"
import { useState } from "react"

export function DefectDetection() {
  const [selectedFilter, setSelectedFilter] = useState("all")

  const defects = [
    {
      id: "DEF-001",
      type: "Missing Rail Clip",
      severity: "critical",
      location: "KM 125.4 + 200m",
      camera: "CAM-002",
      confidence: 96,
      timestamp: "2 minutes ago",
      description: "Missing rail clip detected in track section",
      action: "Maintenance team dispatched",
      imageUrl: "/railway-track-missing-rail-clip-defect.jpg",
      detectionBox: { x: 45, y: 35, width: 15, height: 10 },
      defectType: "fastening",
    },
    {
      id: "DEF-002",
      type: "Misaligned Sleeper",
      severity: "warning",
      location: "KM 126.8 + 50m",
      camera: "CAM-005",
      confidence: 94,
      timestamp: "8 minutes ago",
      description: "Sleeper alignment deviation detected",
      action: "Inspection scheduled",
      imageUrl: "/railway-track-misaligned-concrete-sleeper.jpg",
      detectionBox: { x: 60, y: 25, width: 25, height: 15 },
      defectType: "alignment",
    },
    {
      id: "DEF-003",
      type: "Cracked Sleeper",
      severity: "critical",
      location: "KM 127.2 + 300m",
      camera: "CAM-001",
      confidence: 89,
      timestamp: "15 minutes ago",
      description: "Structural crack detected in concrete sleeper",
      action: "Emergency repair initiated",
      imageUrl: "/cracked-concrete-railway-sleeper-with-visible-crac.jpg",
      detectionBox: { x: 35, y: 45, width: 20, height: 12 },
      defectType: "structural",
    },
    {
      id: "DEF-004",
      type: "Excessive Joint Gap",
      severity: "warning",
      location: "KM 128.1 + 100m",
      camera: "CAM-007",
      confidence: 92,
      timestamp: "22 minutes ago",
      description: "Excessive gap detected at rail joint",
      action: "Monitoring increased",
      imageUrl: "/railway-rail-joint-with-excessive-gap-between-rail.jpg",
      detectionBox: { x: 55, y: 40, width: 18, height: 8 },
      defectType: "joint",
    },
    {
      id: "DEF-005",
      type: "Ballast Degradation",
      severity: "warning",
      location: "KM 129.5 + 150m",
      camera: "CAM-006",
      confidence: 87,
      timestamp: "35 minutes ago",
      description: "Ballast settlement and degradation detected",
      action: "Ballast renewal scheduled",
      imageUrl: "/railway-track-ballast-degradation-and-settlement.jpg",
      detectionBox: { x: 40, y: 60, width: 30, height: 20 },
      defectType: "ballast",
    },
    {
      id: "DEF-006",
      type: "Rail Surface Defect",
      severity: "critical",
      location: "KM 130.2 + 75m",
      camera: "CAM-003",
      confidence: 91,
      timestamp: "45 minutes ago",
      description: "Surface wear and corrugation detected on rail head",
      action: "Rail grinding scheduled",
      imageUrl: "/railway-rail-head-surface-wear-and-corrugation-def.jpg",
      detectionBox: { x: 30, y: 20, width: 40, height: 8 },
      defectType: "surface",
    },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "text-red-400 bg-red-500/10 border-red-500/20"
      case "warning":
        return "text-yellow-400 bg-yellow-500/10 border-yellow-500/20"
      case "info":
        return "text-blue-400 bg-blue-500/10 border-blue-500/20"
      default:
        return "text-muted-foreground bg-muted/10 border-border"
    }
  }

  const getDefectIcon = (defectType: string) => {
    switch (defectType) {
      case "fastening":
        return <Settings className="w-3 h-3" />
      case "structural":
        return <AlertCircle className="w-3 h-3" />
      case "surface":
        return <Wrench className="w-3 h-3" />
      default:
        return <Zap className="w-3 h-3" />
    }
  }

  const filteredDefects = selectedFilter === "all" ? defects : defects.filter((d) => d.severity === selectedFilter)

  const defectCounts = {
    critical: defects.filter((d) => d.severity === "critical").length,
    warning: defects.filter((d) => d.severity === "warning").length,
    info: defects.filter((d) => d.severity === "info").length,
  }

  const exportDefectData = (format: string) => {
    const data = {
      timestamp: new Date().toISOString(),
      totalDefects: defects.length,
      summary: defectCounts,
      detailedReport: defects.map((def) => ({
        id: def.id,
        type: def.type,
        severity: def.severity,
        location: def.location,
        confidence: def.confidence,
        timestamp: def.timestamp,
        description: def.description,
        action: def.action,
        defectType: def.defectType,
      })),
    }

    if (format === "csv") {
      const csvContent = [
        "ID,Type,Severity,Location,Confidence,Timestamp,Description,Action,Defect_Type",
        ...defects.map(
          (def) =>
            `${def.id},"${def.type}",${def.severity},"${def.location}",${def.confidence}%,"${def.timestamp}","${def.description}","${def.action}",${def.defectType}`,
        ),
      ].join("\n")

      const blob = new Blob([csvContent], { type: "text/csv" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `defect-detection-report-${Date.now()}.csv`
      a.click()
    } else if (format === "json") {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `defect-detection-report-${Date.now()}.json`
      a.click()
    }
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Wrench className="w-5 h-5 text-orange-400" />
            AI Infrastructure Defect Detection
          </CardTitle>
          <div className="flex items-center gap-2">
            <select
              className="px-3 py-1 rounded border border-border bg-background text-sm"
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
            >
              <option value="all">All Severities</option>
              <option value="critical">Critical</option>
              <option value="warning">Warning</option>
              <option value="info">Info</option>
            </select>
            <Button variant="outline" size="sm" onClick={() => exportDefectData("csv")}>
              <Download className="w-4 h-4 mr-2" />
              CSV
            </Button>
            <Button variant="outline" size="sm" onClick={() => exportDefectData("json")}>
              <Download className="w-4 h-4 mr-2" />
              JSON
            </Button>
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              Live View
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 rounded-lg border border-red-500/20 bg-red-500/10 relative">
            <div className="absolute top-2 right-2">
              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
            </div>
            <div className="text-2xl font-bold text-red-400">{defectCounts.critical}</div>
            <div className="text-sm text-muted-foreground">Critical Defects</div>
          </div>
          <div className="text-center p-4 rounded-lg border border-yellow-500/20 bg-yellow-500/10 relative">
            <div className="absolute top-2 right-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            </div>
            <div className="text-2xl font-bold text-yellow-400">{defectCounts.warning}</div>
            <div className="text-sm text-muted-foreground">Warnings</div>
          </div>
          <div className="text-center p-4 rounded-lg border border-blue-500/20 bg-blue-500/10">
            <div className="text-2xl font-bold text-blue-400">{defectCounts.info}</div>
            <div className="text-sm text-muted-foreground">Info</div>
          </div>
          <div className="text-center p-4 rounded-lg border border-green-500/20 bg-green-500/10">
            <div className="text-2xl font-bold text-green-400">94.2%</div>
            <div className="text-sm text-muted-foreground">Detection Accuracy</div>
          </div>
        </div>

        <ScrollArea className="h-80">
          <div className="space-y-4">
            {filteredDefects.map((defect) => (
              <div
                key={defect.id}
                className="p-4 rounded-lg border border-border bg-card/30 hover:bg-card/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className={getSeverityColor(defect.severity)}>
                      {defect.severity.toUpperCase()}
                    </Badge>
                    <span className="font-medium text-foreground">{defect.type}</span>
                    <Badge variant="outline" className="text-orange-400 bg-orange-500/10 border-orange-500/20">
                      {getDefectIcon(defect.defectType)}
                      <span className="ml-1">{defect.defectType}</span>
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-green-400 bg-green-500/10 border-green-500/20">
                      {defect.confidence}%
                    </Badge>
                    <span className="text-sm text-muted-foreground">{defect.id}</span>
                  </div>
                </div>

                <div className="flex gap-4 mb-3">
                  <div className="relative w-32 h-24 rounded border border-border overflow-hidden bg-slate-800">
                    <img
                      src={defect.imageUrl || "/placeholder.svg"}
                      alt={defect.type}
                      className="w-full h-full object-cover"
                    />
                    {/* AI Detection Box Overlay */}
                    <div
                      className="absolute border-2 border-orange-400 bg-orange-400/20"
                      style={{
                        left: `${defect.detectionBox.x}%`,
                        top: `${defect.detectionBox.y}%`,
                        width: `${defect.detectionBox.width}%`,
                        height: `${defect.detectionBox.height}%`,
                      }}
                    />
                    {/* AI Confidence Label */}
                    <div className="absolute top-1 left-1 bg-black/70 text-orange-400 text-xs px-1 rounded flex items-center gap-1">
                      {getDefectIcon(defect.defectType)}
                      {defect.confidence}%
                    </div>
                    {/* AI Detection Status */}
                    <div className="absolute bottom-1 right-1 bg-orange-500/80 text-white text-xs px-1 rounded">
                      DEFECT DETECTED
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-2">{defect.description}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{defect.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{defect.timestamp}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Camera className="w-4 h-4 text-blue-400" />
                        <span>{defect.camera}</span>
                      </div>
                      <div className="text-green-400">{defect.action}</div>
                    </div>
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
