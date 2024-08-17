"use client"
import React from "react"
import Link from "next/link"
import { signOut, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"

export const Nav = () => {
  const { data: session } = useSession()
  return (
    <nav className="bg-white shadow-md px-4 py-3 w-full">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-xl font-bold text-green-600">
          <Link href="/">Pennywise</Link>
        </h1>
        {session && (
          <Button variant="outline" onClick={() => signOut()}>
            Logout
          </Button>
        )}
      </div>
    </nav>
  )
}
