import React from "react"
import { useRouter } from "next/router"
import { signIn, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"

export default function Home() {
  const router = useRouter()
  const { data: session } = useSession()

  React.useEffect(() => {
    if (session) {
      router.push("/expenses")
    }
  }, [session, router])

  return (
    <main className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-emerald-400 to-teal-600 text-white p-8 font-sans">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-7xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-emerald-200">
          Pennywise
        </h1>
        <h2 className="text-3xl font-light mb-10 text-emerald-100">
          Your Personal Budgeting Assistant
        </h2>
        <p className="text-xl mb-12 text-emerald-50 max-w-2xl mx-auto">
          Effortlessly track expenses, manage your budget, and gain valuable insights into your spending habits.
        </p>
        {!session ? (
          <Button 
            size="lg" 
            onClick={() => signIn()}
            className="bg-white text-emerald-600 hover:bg-emerald-100 transition-colors duration-300 text-xl px-10 py-4 rounded-full shadow-lg"
          >
            Get Started
          </Button>
        ) : (
          <p className="text-emerald-200 animate-pulse text-xl">Preparing your dashboard...</p>
        )}
      </div>
    </main>
  )
}