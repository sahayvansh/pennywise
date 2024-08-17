"use client";
import "../styles/globals.css"
import type { AppProps } from "next/app"
import { SessionProvider } from "next-auth/react"
import { QueryClient, QueryClientProvider } from "react-query"
import { Toaster } from "react-hot-toast"
import { Nav } from "../components/Nav"

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps?.session ?? null}>
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen bg-gray-100">
          <Nav />
          <main className="container mx-auto px-4 py-8">
            <Component {...pageProps} />
          </main>
        </div>
        <Toaster />
      </QueryClientProvider>
    </SessionProvider>
  )
}