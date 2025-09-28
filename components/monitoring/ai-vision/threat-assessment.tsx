import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Shield, AlertTriangle, CheckCircle, Clock } from "lucide-react"

export function ThreatAssessment() {
  const threatLevels = [
    {
      level: "Critical",
      count: 2,
      percentage: 15,
      color: "text-red-400 bg-red-500/10 border-red-500/20",
      description: "Immediate action required",
    },
    {
      level: "High",
      count: 3,
      percentage: 25,
      color: "text-orange-400 bg-orange-500/10 border-orange-500/20",
      description: "Elevated risk detected",
    },
    {
      level: "Medium",
      count: 5,
      percentage: 35,
      color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
      description: "Moderate risk level",
    },
    {
      level: "Low",
      count: 8,
      percentage: 25,
      color: "text-green-400 bg-green-500/10 border-green-500/20",
      description: "Minimal risk detected",
    },
  ]

  const recentAssessments = [
    {
      id: "THR-001",
      threat: "Unauthorized Access",
      level: "critical",
      location: "KM 125.4",
      probability: 94,
      impact: "High",
      timeToAction: "< 2 minutes",
      status: "active",
    },
    {
      id: "THR-002",
      threat: "Equipment Malfunction",
      level: "high",
      location: "KM 127.8",
      probability: 78,
      impact: "Medium",
      timeToAction: "5 minutes",
      status: "monitoring",
    },
    {
      id: "THR-003",
      threat: "Weather Impact",
      level: "medium",
      location: "KM 129.2",
      probability: 65,
      impact: "Low",
      timeToAction: "15 minutes",
      status: "assessed",
    },
  ]

  const getThreatColor = (level: string) => {
    switch (level) {
      case "critical":
        return "text-red-400 bg-red-500/10 border-red-500/20"
      case "high":
        return "text-orange-400 bg-orange-500/10 border-orange-500/20"
      case "medium":
        return "text-yellow-400 bg-yellow-500/10 border-yellow-500/20"
      case "low":
        return "text-green-400 bg-green-500/10 border-green-500/20"
      default:
        return "text-muted-foreground bg-muted/10 border-border"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <AlertTriangle className="w-4 h-4 text-red-400" />
      case "monitoring":
        return <Clock className="w-4 h-4 text-yellow-400" />
      case "assessed":
        return <CheckCircle className="w-4 h-4 text-green-400" />
      default:
        return <Shield className="w-4 h-4 text-muted-foreground" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-orange-400" />
          Threat Assessment
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-foreground">Threat Level Distribution</h4>
          {threatLevels.map((threat, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className={threat.color}>
                    {threat.level.toUpperCase()}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{threat.description}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-foreground">{threat.count}</span>
                  <span className="text-sm text-muted-foreground">({threat.percentage}%)</span>
                </div>
              </div>
              <Progress value={threat.percentage} className="h-2" />
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-medium text-foreground">Recent Assessments</h4>
          {recentAssessments.map((assessment) => (
            <div key={assessment.id} className="p-4 rounded-lg border border-border bg-card/30">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  {getStatusIcon(assessment.status)}
                  <span className="font-medium text-foreground">{assessment.threat}</span>
                </div>
                <Badge variant="outline" className={getThreatColor(assessment.level)}>
                  {assessment.level.toUpperCase()}
                </Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Probability</span>
                    <span className="text-foreground">{assessment.probability}%</span>
                  </div>
                  <Progress value={assessment.probability} className="h-2" />
                </div>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Impact:</span>
                    <span className="text-foreground">{assessment.impact}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Location:</span>
                    <span className="text-foreground">{assessment.location}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">ID: {assessment.id}</span>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span className="text-foreground">Action in: {assessment.timeToAction}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 rounded-lg border border-border bg-card/30">
            <div className="text-lg font-bold text-orange-400">18</div>
            <div className="text-sm text-muted-foreground">Total Threats</div>
          </div>
          <div className="text-center p-3 rounded-lg border border-border bg-card/30">
            <div className="text-lg font-bold text-red-400">2</div>
            <div className="text-sm text-muted-foreground">Active Alerts</div>
          </div>
          <div className="text-center p-3 rounded-lg border border-border bg-card/30">
            <div className="text-lg font-bold text-green-400">87%</div>
            <div className="text-sm text-muted-foreground">System Health</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
