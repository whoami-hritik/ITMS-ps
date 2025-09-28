"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, AlertTriangle, FileText } from "lucide-react"

const complianceStandards = [
  {
    id: "rdso-t-2012",
    name: "RDSO-T-2012",
    description: "Track Geometry Standards",
    compliance: 96,
    status: "compliant",
    violations: 2,
  },
  {
    id: "en-13848-1",
    name: "EN 13848-1",
    description: "Track Geometry Quality",
    compliance: 94,
    status: "compliant",
    violations: 3,
  },
  {
    id: "irs-t-1",
    name: "IRS-T-1",
    description: "Indian Railway Track Standards",
    compliance: 89,
    status: "warning",
    violations: 8,
  },
]

export function ComplianceStatus() {
  const averageCompliance = Math.round(
    complianceStandards.reduce((acc, std) => acc + std.compliance, 0) / complianceStandards.length,
  )

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-400" />
          <div>
            <CardTitle className="text-lg">Compliance Status</CardTitle>
            <CardDescription>Railway standards compliance</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
          <div className="text-3xl font-bold text-blue-400">{averageCompliance}%</div>
          <div className="text-sm text-muted-foreground">Overall Compliance</div>
        </div>

        <div className="space-y-3">
          {complianceStandards.map((standard) => (
            <div key={standard.id} className="p-3 rounded-lg border border-border/50 bg-background/50">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {standard.status === "compliant" ? (
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-yellow-400" />
                  )}
                  <span className="font-medium text-sm">{standard.name}</span>
                </div>
                <Badge
                  variant="outline"
                  className={
                    standard.status === "compliant"
                      ? "bg-green-500/10 text-green-400 border-green-500/20"
                      : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                  }
                >
                  {standard.compliance}%
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mb-2">{standard.description}</p>
              <div className="space-y-1">
                <Progress value={standard.compliance} className="h-1" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{standard.violations} violations</span>
                  <span>Target: 95%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
