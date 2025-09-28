"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Shield, User } from "lucide-react"
import { useRouter } from "next/navigation"

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    employeeId: "",
    password: "",
  })
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simulate authentication
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Demo credentials
      if (formData.employeeId === "admin" && formData.password === "admin123") {
        localStorage.setItem(
          "itms-user",
          JSON.stringify({
            employeeId: formData.employeeId,
            role: "System Administrator",
            name: "Admin User",
            division: "Central Railway",
            loginTime: new Date().toISOString(),
          }),
        )
        router.push("/dashboard")
      } else {
        setError("Invalid credentials. Use admin/admin123 for demo.")
      }
    } catch (err) {
      setError("Authentication failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
          <Shield className="w-5 h-5 text-blue-400" />
          Secure Login
        </CardTitle>
        <CardDescription className="text-center">Enter your railway employee credentials</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="employeeId" className="text-sm font-medium">
              Employee ID
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="employeeId"
                type="text"
                placeholder="Enter your employee ID"
                value={formData.employeeId}
                onChange={(e) => setFormData((prev) => ({ ...prev, employeeId: e.target.value }))}
                className="pl-10 bg-background/50 border-border/50"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">
              Password
            </Label>
            <div className="relative">
              <Shield className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                className="pl-10 pr-10 bg-background/50 border-border/50"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={isLoading}>
            {isLoading ? "Authenticating..." : "Sign In"}
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            <p>Demo: admin / admin123</p>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
