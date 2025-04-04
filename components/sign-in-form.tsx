"use client"

import type React from "react"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function SignInForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(event.currentTarget)
    const username = formData.get("username") as string
    const password = formData.get("password") as string

    try {
      const result = await signIn("credentials", {
        username,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError("Invalid credentials. Please try again.")
      } else {
        router.push("/")
        router.refresh()
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="username">Email</Label>
        <Input
          id="username"
          name="username"
          type="email"
          autoComplete="email"
          required
          placeholder="your.email@example.com"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" autoComplete="current-password" required />
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <div className="mr-2 animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" />
            Signing in...
          </>
        ) : (
          "Sign in"
        )}
      </Button>
    </form>
  )
}

