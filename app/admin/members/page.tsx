"use client"

import { useEffect, useState } from "react"
import { Plus, Trash2, Pencil } from "lucide-react"

type Member = {
  id: string
  full_name: string
  email: string
  phone: string
  region: string
  membership_type: string
  status: string
  joined_at: string
}

export default function AdminMembers() {
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ full_name: "", email: "", phone: "", region: "", membership_type: "basic", status: "active" })

  async function load() {
    const res = await fetch("/api/members")
    setMembers(await res.json())
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function save() {
    await fetch("/api/members", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) })
    setShowForm(false)
    setForm({ full_name: "", email: "", phone: "", region: "", membership_type: "basic", status: "active" })
    load()
  }

  async function remove(id: string) {
    if (!confirm("Remove this member?")) return
    await fetch("/api/members", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-2xl font-bold text-foreground">Members</h1>
          <p className="text-sm text-muted-foreground">{members.length} total members</p>
        </div>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">
          <Plus className="h-4 w-4" /> Add Member
        </button>
      </div>

      {showForm && (
        <div className="mb-6 rounded-xl border border-border bg-card p-6">
          <h2 className="font-serif text-lg font-semibold mb-4">Add Member</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div><label className="text-sm font-medium">Full Name</label><input value={form.full_name} onChange={e => setForm({...form, full_name: e.target.value})} className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" /></div>
            <div><label className="text-sm font-medium">Email</label><input value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" /></div>
            <div><label className="text-sm font-medium">Phone</label><input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" /></div>
            <div><label className="text-sm font-medium">Region</label><input value={form.region} onChange={e => setForm({...form, region: e.target.value})} className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" /></div>
            <div>
              <label className="text-sm font-medium">Membership Type</label>
              <select value={form.membership_type} onChange={e => setForm({...form, membership_type: e.target.value})} className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm">
                <option value="basic">Basic</option>
                <option value="premium">Premium</option>
                <option value="lifetime">Lifetime</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Status</label>
              <select value={form.status} onChange={e => setForm({...form, status: e.target.value})} className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm">
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            <button onClick={save} className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">Save</button>
            <button onClick={() => setShowForm(false)} className="rounded-lg border border-border px-5 py-2 text-sm font-medium hover:bg-secondary">Cancel</button>
          </div>
        </div>
      )}

      {loading ? <p className="text-muted-foreground">Loading...</p> : (
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-secondary">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Name</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Email</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Region</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Type</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map((m) => (
                <tr key={m.id} className="border-b border-border last:border-b-0 hover:bg-secondary/50">
                  <td className="px-4 py-3 font-medium text-foreground">{m.full_name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{m.email}</td>
                  <td className="px-4 py-3 text-muted-foreground">{m.region}</td>
                  <td className="px-4 py-3 capitalize text-muted-foreground">{m.membership_type}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${m.status === "active" ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"}`}>
                      {m.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => remove(m.id)} className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                  </td>
                </tr>
              ))}
              {members.length === 0 && <tr><td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">No members yet.</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
