"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertTriangle, XCircle, Info } from "lucide-react"

const complianceStandards = [
  {
    id: "rdso-t-2012",
    name: "RDSO-T-2012",
    description: "Track Geometry Standards",
    compliance: 96,
    status: "compliant",
    lastCheck: "2 hours ago",
    violations: 2,
  },
  {
    id: "en-13848",
    name: "EN 13848",
    description: "Railway Applications - Track Geometry",
    compliance: 94,
    status: "compliant",
    lastCheck: "1 hour ago",
    violations: 3,
  },
  {
    id: "irs-t-1",
    name: "IRS-T-1",
    description: "Indian Railway Standards for Track",
    compliance: 89,
    status: "warning",
    lastCheck: "30 minutes ago",
    violations: 8,
  },
  {
    id: "rdso-gd-2014",
    name: "RDSO-GD-2014",
    description: "Guidelines for Track Maintenance",
    compliance: 98,
    status: "compliant",
    lastCheck: "45 minutes ago",
    violations: 1,
  },
]

const getStatusIcon = (status: string) => {
  switch (status) {
    case "compliant":
      return <CheckCircle className="w-4 h-4 text-green-400" />
    case "warning":
      return <AlertTriangle className="w-4 h-4 text-yellow-400" />
    case "critical":
      return <XCircle className="w-4 h-4 text-red-400" />
    default:
      return <Info className="w-4 h-4 text-blue-400" />
  }
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "compliant":
      return (
        <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
          Compliant
        </Badge>
      )
    case "warning":
      return (
        <Badge variant="outline" className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20">
          Warning
        </Badge>
      )
    case "critical":
      return (
        <Badge variant="outline" className="bg-red-500/10 text-red-400 border-red-500/20">
          Critical
        </Badge>
      )
    default:
      return (
        <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
          Unknown
        </Badge>
      )
  }
}

export function ComplianceMetrics() {
  const averageCompliance = Math.round(
    complianceStandards.reduce((acc, std) => acc + std.compliance, 0) / complianceStandards.length,
  )
  const totalViolations = complianceStandards.reduce((acc, std) => acc + std.violations, 0)

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">Compliance Monitoring</CardTitle>
            <CardDescription>Railway standards and regulatory compliance</CardDescription>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-foreground">{averageCompliance}%</div>
            <div className="text-sm text-muted-foreground">Overall Compliance</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 rounded-lg bg-green-500/10 border border-green-500/20">
            <div className="text-lg font-bold text-green-400">{complianceStandards.length}</div>
            <div className="text-sm text-muted-foreground">Standards Monitored</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-red-500/10 border border-red-500/20">
            <div className="text-lg font-bold text-red-400">{totalViolations}</div>
            <div className="text-sm text-muted-foreground">Active Violations</div>
          </div>
        </div>

        <div className="space-y-4">
          {complianceStandards.map((standard) => (
            <div key={standard.id} className="p-4 rounded-lg border border-border/50 bg-background/50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {getStatusIcon(standard.status)}
                  <div>
                    <h4 className="font-medium text-foreground">{standard.name}</h4>
                    <p className="text-sm text-muted-foreground">{standard.description}</p>
                  </div>
                </div>
                {getStatusBadge(standard.status)}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Compliance Level</span>
                  <span className="font-medium">{standard.compliance}%</span>
                </div>
                <Progress value={standard.compliance} className="h-2" />
              </div>

              <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
                <span>Last checked: {standard.lastCheck}</span>
                <span>{standard.violations} violations</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
