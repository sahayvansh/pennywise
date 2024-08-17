"use client"
import React from 'react'
import { useQuery } from 'react-query'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Expense = {
  id: string
  amount: number
  date: string
  category: string
  description: string
}

export const ExpenseList = () => {
  const { data, isLoading, error } = useQuery<Expense[]>('expenses', 
    () => fetch('/api/expenses').then(res => res.json())
  )

  // Ensure `expenses` is always an array
  const expenses = Array.isArray(data) ? data : [];

  if (isLoading) return <p>Loading expenses...</p>
  if (error) return <p>Error loading expenses</p>

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Expenses</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
                <TableCell>{expense.category}</TableCell>
                <TableCell>{expense.description}</TableCell>
                <TableCell className="text-right">{expense.amount.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}