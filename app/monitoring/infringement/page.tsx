import { Suspense } from "react"
import { InfringementDetection } from "@/components/monitoring/ai-vision/infringement-detection"
import { AlertTriangle } from "lucide-react"

export default function InfringementPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <AlertTriangle className="w-8 h-8 text-red-400" />
            <div>
              <h1 className="text-2xl font-bold text-foreground">Infringement Detection System</h1>
              <p className="text-sm text-muted-foreground">AI-powered track clearance and safety monitoring</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Suspense fallback={<div>Loading infringement detection...</div>}>
          <InfringementDetection />
        </Suspense>
      </main>
    </div>
  )
}
