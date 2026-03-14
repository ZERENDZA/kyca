"use client"

import { useEffect, useState } from "react"

type Payment = {
  id: string
  name: string
  email: string
  amount: number
  purpose: string
  status: string
  created_at: string
}

export default function AdminPayments() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/payments")
      .then(r => r.json())
      .then(data => { setPayments(Array.isArray(data) ? data : []); setLoading(false) })
  }, [])

  const total = payments.filter(p => p.status === "paid").reduce((sum, p) => sum + p.amount, 0)

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-serif text-2xl font-bold text-foreground">Payments & Donations</h1>
        <p className="text-sm text-muted-foreground">{payments.length} transactions</p>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-sm text-muted-foreground">Total Received</p>
          <p className="mt-1 text-2xl font-bold text-foreground">₦{total.toLocaleString()}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-sm text-muted-foreground">Completed</p>
          <p className="mt-1 text-2xl font-bold text-green-600">{payments.filter(p => p.status === "paid").length}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-sm text-muted-foreground">Pending</p>
          <p className="mt-1 text-2xl font-bold text-yellow-600">{payments.filter(p => p.status === "pending").length}</p>
        </div>
      </div>

      {loading ? <p className="text-muted-foreground">Loading...</p> : (
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-secondary">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Name</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Email</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Amount</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Purpose</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id} className="border-b border-border last:border-b-0 hover:bg-secondary/50">
                  <td className="px-4 py-3 font-medium text-foreground">{p.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{p.email}</td>
                  <td className="px-4 py-3 font-medium text-foreground">₦{p.amount}</td>
                  <td className="px-4 py-3 text-muted-foreground">{p.purpose}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      p.status === "paid" ? "bg-green-500/10 text-green-600" :
                      p.status === "pending" ? "bg-yellow-500/10 text-yellow-600" :
                      "bg-red-500/10 text-red-600"
                    }`}>{p.status}</span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{new Date(p.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
              {payments.length === 0 && <tr><td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">No payments yet.</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
