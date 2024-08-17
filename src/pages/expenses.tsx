import React from 'react'
import { Expense } from '../components/Expense'
import { Dashboard } from '../components/Dashboard'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ExpensesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-emerald-600">Your Financial Overview</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Expense Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <Dashboard />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Add New Expense</CardTitle>
          </CardHeader>
          <CardContent>
            <Expense />
          </CardContent>
        </Card>
      </div>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Recent Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Add a component here to display recent expenses */}
        </CardContent>
      </Card>
    </div>
  )
}