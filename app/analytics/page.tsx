import { AnalyticsHeader } from "@/components/analytics/analytics-header"
import { DataVisualization } from "@/components/analytics/data-visualization"
import { ComplianceMetrics } from "@/components/analytics/compliance-metrics"
import { PredictiveAnalytics } from "@/components/analytics/predictive-analytics"
import { HistoricalTrends } from "@/components/analytics/historical-trends"
import { DataExportImport } from "@/components/data-export-import"

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-background">
      <AnalyticsHeader />
      <main className="container mx-auto px-4 py-6 space-y-6">
        <DataExportImport />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DataVisualization />
          <ComplianceMetrics />
        </div>
        <PredictiveAnalytics />
        <HistoricalTrends />
      </main>
    </div>
  )
}
