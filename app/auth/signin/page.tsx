import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { SignInForm } from "@/components/sign-in-form"

export default async function SignIn() {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect("/")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h1 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your Toggl account
          </h1>
          <p className="mt-2 text-center text-sm text-gray-600">
            Connect your Toggl account to categorize your time entries
          </p>
        </div>
        <SignInForm />
      </div>
    </div>
  )
}

