"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Download, Upload, FileText, Database, Calendar } from "lucide-react"
import { useState } from "react"

export function DataExportImport() {
  const [exportFormat, setExportFormat] = useState("csv")
  const [dateRange, setDateRange] = useState("today")
  const [dataType, setDataType] = useState("all")

  const exportData = async (format: string, type: string, range: string) => {
    const timestamp = new Date().toISOString()
    const filename = `railway-data-${type}-${range}-${Date.now()}`

    // Sample data structure
    const sampleData = {
      metadata: {
        exportDate: timestamp,
        dataType: type,
        dateRange: range,
        totalRecords: 1250,
        version: "1.0",
      },
      railProfile: [
        { km: 125.4, vWear: 3.7, lWear: 0.74, hWear: 2.38, aWear: 4.57, railInc: 3.97 },
        { km: 126.2, vWear: 2.85, lWear: 0.92, hWear: 1.95, aWear: 3.21, railInc: 2.14 },
        { km: 127.8, vWear: 4.12, lWear: 1.23, hWear: 3.45, aWear: 5.67, railInc: 4.32 },
      ],
      infringements: [
        { id: "INF-001", type: "Missing Clip", severity: "critical", location: "KM 125.4", confidence: 96 },
        { id: "INF-002", type: "Cracked Sleeper", severity: "warning", location: "KM 126.8", confidence: 89 },
      ],
      trackGeometry: [
        { km: 125.0, gauge: 1435.2, alignment: 0.8, level: 1.2, twist: 0.5 },
        { km: 125.5, gauge: 1434.8, alignment: 1.1, level: 0.9, twist: 0.7 },
      ],
      aiVision: [
        { timestamp: "2024-01-15T10:30:00Z", camera: "CAM-001", detections: 3, accuracy: 98.2 },
        { timestamp: "2024-01-15T10:31:00Z", camera: "CAM-002", detections: 1, accuracy: 96.5 },
      ],
    }

    if (format === "csv") {
      let csvContent = ""

      if (type === "rail-profile" || type === "all") {
        csvContent += "Rail Profile Data\n"
        csvContent += "KM,V-WEAR,L-WEAR,H-WEAR,A-WEAR,RAIL-INC\n"
        sampleData.railProfile.forEach((row) => {
          csvContent += `${row.km},${row.vWear},${row.lWear},${row.hWear},${row.aWear},${row.railInc}\n`
        })
        csvContent += "\n"
      }

      if (type === "infringements" || type === "all") {
        csvContent += "Infringement Data\n"
        csvContent += "ID,Type,Severity,Location,Confidence\n"
        sampleData.infringements.forEach((row) => {
          csvContent += `${row.id},${row.type},${row.severity},${row.location},${row.confidence}\n`
        })
        csvContent += "\n"
      }

      const blob = new Blob([csvContent], { type: "text/csv" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${filename}.csv`
      a.click()
      URL.revokeObjectURL(url)
    } else if (format === "json") {
      const blob = new Blob([JSON.stringify(sampleData, null, 2)], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${filename}.json`
      a.click()
      URL.revokeObjectURL(url)
    } else if (format === "xml") {
      const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<RailwayData>
  <Metadata>
    <ExportDate>${timestamp}</ExportDate>
    <DataType>${type}</DataType>
    <DateRange>${range}</DateRange>
  </Metadata>
  <RailProfile>
    ${sampleData.railProfile
      .map(
        (item) => `
    <Record>
      <KM>${item.km}</KM>
      <VWear>${item.vWear}</VWear>
      <LWear>${item.lWear}</LWear>
      <HWear>${item.hWear}</HWear>
      <AWear>${item.aWear}</AWear>
      <RailInc>${item.railInc}</RailInc>
    </Record>`,
      )
      .join("")}
  </RailProfile>
</RailwayData>`

      const blob = new Blob([xmlContent], { type: "application/xml" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${filename}.xml`
      a.click()
      URL.revokeObjectURL(url)
    }
  }

  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target?.result as string
      console.log("Imported file content:", content)
      // Here you would process the imported data
      alert(`Successfully imported ${file.name}`)
    }
    reader.readAsText(file)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="w-5 h-5 text-blue-400" />
          Data Export & Import
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Export Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Export Data</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="data-type">Data Type</Label>
              <Select value={dataType} onValueChange={setDataType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Data</SelectItem>
                  <SelectItem value="rail-profile">Rail Profile</SelectItem>
                  <SelectItem value="infringements">Infringements</SelectItem>
                  <SelectItem value="track-geometry">Track Geometry</SelectItem>
                  <SelectItem value="ai-vision">AI Vision</SelectItem>
                  <SelectItem value="analytics">Analytics</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date-range">Date Range</Label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">Last Week</SelectItem>
                  <SelectItem value="month">Last Month</SelectItem>
                  <SelectItem value="quarter">Last Quarter</SelectItem>
                  <SelectItem value="year">Last Year</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="export-format">Format</Label>
              <Select value={exportFormat} onValueChange={setExportFormat}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="json">JSON</SelectItem>
                  <SelectItem value="xml">XML</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="pdf">PDF Report</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={() => exportData(exportFormat, dataType, dateRange)} className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export Data
            </Button>
            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Export
            </Button>
          </div>
        </div>

        {/* Import Section */}
        <div className="space-y-4 border-t border-border pt-6">
          <h3 className="text-lg font-semibold text-foreground">Import Data</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="import-file">Select File</Label>
              <Input
                id="import-file"
                type="file"
                accept=".csv,.json,.xml,.xlsx"
                onChange={handleFileImport}
                className="cursor-pointer"
              />
            </div>
            <div className="space-y-2">
              <Label>Supported Formats</Label>
              <div className="flex gap-2">
                <Badge variant="outline">CSV</Badge>
                <Badge variant="outline">JSON</Badge>
                <Badge variant="outline">XML</Badge>
                <Badge variant="outline">Excel</Badge>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              Import Data
            </Button>
            <Button variant="outline">
              <FileText className="w-4 h-4 mr-2" />
              View Template
            </Button>
          </div>
        </div>

        {/* Recent Exports */}
        <div className="space-y-4 border-t border-border pt-6">
          <h3 className="text-lg font-semibold text-foreground">Recent Exports</h3>

          <div className="space-y-2">
            {[
              { name: "railway-data-all-today-1642089600.csv", size: "2.4 MB", date: "2 hours ago" },
              { name: "infringement-report-week-1642003200.json", size: "856 KB", date: "1 day ago" },
              { name: "rail-profile-month-1641398400.xlsx", size: "4.1 MB", date: "3 days ago" },
            ].map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg border border-border bg-card/30"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-blue-400" />
                  <div>
                    <div className="font-medium text-sm">{file.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {file.size} • {file.date}
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
