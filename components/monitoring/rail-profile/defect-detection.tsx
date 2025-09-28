import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertTriangle, Search, Filter, MapPin, Clock } from "lucide-react"

export function DefectDetection() {
  const defects = [
    {
      id: "DEF-001",
      type: "Head Check",
      severity: "critical",
      location: "KM 125.4 + 250m",
      size: "15mm x 3mm",
      detected: "2 hours ago",
      confidence: 94,
    },
    {
      id: "DEF-002",
      type: "Corrugation",
      severity: "warning",
      location: "KM 126.1 + 100m",
      size: "200mm length",
      detected: "4 hours ago",
      confidence: 87,
    },
    {
      id: "DEF-003",
      type: "Squats",
      severity: "warning",
      location: "KM 127.8 + 50m",
      size: "8mm x 2mm",
      detected: "6 hours ago",
      confidence: 91,
    },
    {
      id: "DEF-004",
      type: "Shelling",
      severity: "critical",
      location: "KM 128.2 + 300m",
      size: "25mm x 5mm",
      detected: "8 hours ago",
      confidence: 96,
    },
    {
      id: "DEF-005",
      type: "Gauge Corner Crack",
      severity: "warning",
      location: "KM 129.5 + 150m",
      size: "12mm length",
      detected: "10 hours ago",
      confidence: 89,
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

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            Defect Detection
          </CardTitle>
          <div className="flex items-center gap-2">
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
          <div className="text-center p-3 rounded-lg border border-red-500/20 bg-red-500/10">
            <div className="text-2xl font-bold text-red-400">2</div>
            <div className="text-sm text-muted-foreground">Critical Defects</div>
          </div>
          <div className="text-center p-3 rounded-lg border border-yellow-500/20 bg-yellow-500/10">
            <div className="text-2xl font-bold text-yellow-400">3</div>
            <div className="text-sm text-muted-foreground">Warning Defects</div>
          </div>
          <div className="text-center p-3 rounded-lg border border-green-500/20 bg-green-500/10">
            <div className="text-2xl font-bold text-green-400">92%</div>
            <div className="text-sm text-muted-foreground">Avg Confidence</div>
          </div>
        </div>

        <ScrollArea className="h-64">
          <div className="space-y-3">
            {defects.map((defect) => (
              <div
                key={defect.id}
                className="p-4 rounded-lg border border-border bg-card/30 hover:bg-card/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className={getSeverityColor(defect.severity)}>
                      {defect.severity.toUpperCase()}
                    </Badge>
                    <span className="font-medium text-foreground">{defect.type}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{defect.id}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{defect.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{defect.detected}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <span className="text-sm text-muted-foreground">Size: {defect.size}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Confidence:</span>
                    <Badge variant="outline" className="text-green-400 bg-green-500/10 border-green-500/20">
                      {defect.confidence}%
                    </Badge>
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
