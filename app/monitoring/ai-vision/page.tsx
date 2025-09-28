import { Suspense } from "react"
import { AIVisionHeader } from "@/components/monitoring/ai-vision/ai-vision-header"
import { InfringementDetection } from "@/components/monitoring/ai-vision/infringement-detection"
import { DefectDetection } from "@/components/monitoring/ai-vision/defect-detection"
import { ObjectTracking } from "@/components/monitoring/ai-vision/object-tracking"
import { ThreatAssessment } from "@/components/monitoring/ai-vision/threat-assessment"
import { AIAnalytics } from "@/components/monitoring/ai-vision/ai-analytics"
import { CameraFeeds } from "@/components/monitoring/ai-vision/camera-feeds"

export default function AIVisionPage() {
  return (
    <div className="min-h-screen bg-background">
      <AIVisionHeader />

      <main className="container mx-auto px-4 py-6 space-y-6">
        <Suspense fallback={<div>Loading camera feeds...</div>}>
          <CameraFeeds />
        </Suspense>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <Suspense fallback={<div>Loading infringement detection...</div>}>
            <InfringementDetection />
          </Suspense>

          <Suspense fallback={<div>Loading defect detection...</div>}>
            <DefectDetection />
          </Suspense>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Suspense fallback={<div>Loading object tracking...</div>}>
            <ObjectTracking />
          </Suspense>

          <Suspense fallback={<div>Loading threat assessment...</div>}>
            <ThreatAssessment />
          </Suspense>
        </div>

        <Suspense fallback={<div>Loading AI analytics...</div>}>
          <AIAnalytics />
        </Suspense>
      </main>
    </div>
  )
}
