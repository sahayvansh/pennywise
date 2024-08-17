import React from 'react'
import { useQuery } from 'react-query'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

type ExpenseSummary = {
  category: string
  total: number
}

export const Dashboard = () => {
  const { data: summary, isLoading, error } = useQuery<ExpenseSummary[]>('expenseSummary', 
    () => fetch('/api/expense-summary').then(res => res.json())
  )

  if (isLoading) return <p>Loading summary...</p>
  if (error) return <p>Error loading summary</p>

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Expense Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={summary}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#4ade80" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}