import React from "react"
import { ExpenseForm } from "./ExpenseForm"
import { ExpenseList } from "./ExpenseList"

export const Expense = () => {
  return (
    <div className="w-full space-y-8">
      <section className="w-full max-w-md mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="bg-green-400 text-white px-4 py-3 border-b border-green-200">
          <h2 className="font-bold text-lg text-center">Add Expense</h2>
        </div>
        <div className="p-4">
          <ExpenseForm />
        </div>
      </section>
      <ExpenseList />
    </div>
  )
}