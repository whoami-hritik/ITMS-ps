import { LoginForm } from "@/components/auth/login-form"
import { RailwayLogo } from "@/components/ui/railway-logo"

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-slate-900 to-slate-800">
      <div className="w-full max-w-md space-y-8 p-8">
        <div className="text-center space-y-6">
          <RailwayLogo />
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">ITMS Portal</h1>
            <p className="text-muted-foreground">Indigenous Track Monitoring System</p>
            <p className="text-sm text-muted-foreground">Indian Railways - Advanced Track Analysis</p>
          </div>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
