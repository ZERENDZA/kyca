"use client"

import { useEffect, useState } from "react"
import { Plus, Trash2, Pencil } from "lucide-react"

type Leader = {
  id: string
  name: string
  role: string
  region: string
  bio: string
  image_url: string
  order_index: number
  created_at: string
}

export default function AdminLeadership() {
  const [leaders, setLeaders] = useState<Leader[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Leader | null>(null)
  const [form, setForm] = useState({
    name: "", role: "", region: "", bio: "", image_url: "", order_index: 0
  })

  async function load() {
    const res = await fetch("/api/leadership")
    const data = await res.json()
    setLeaders(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function save() {
    const method = editing ? "PUT" : "POST"
    const body = editing ? { ...form, id: editing.id } : form
    await fetch("/api/leadership", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
    setShowForm(false)
    setEditing(null)
    setForm({ name: "", role: "", region: "", bio: "", image_url: "", order_index: 0 })
    load()
  }

  async function remove(id: string) {
    if (!confirm("Remove this person?")) return
    await fetch("/api/leadership", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })
    load()
  }

  function edit(l: Leader) {
    setEditing(l)
    setForm({ name: l.name, role: l.role, region: l.region || "", bio: l.bio || "", image_url: l.image_url || "", order_index: l.order_index || 0 })
    setShowForm(true)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-2xl font-bold text-foreground">Leadership</h1>
          <p className="text-sm text-muted-foreground">{leaders.length} team members</p>
        </div>
        <button onClick={() => { setShowForm(true); setEditing(null) }} className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">
          <Plus className="h-4 w-4" /> Add Member
        </button>
      </div>

      {showForm && (
        <div className="mb-6 rounded-xl border border-border bg-card p-6">
          <h2 className="font-serif text-lg font-semibold mb-4">{editing ? "Edit Leader" : "Add Leader"}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div><label className="text-sm font-medium">Full Name</label><input value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" /></div>
            <div><label className="text-sm font-medium">Role / Title</label><input value={form.role} onChange={e => setForm({...form, role: e.target.value})} placeholder="e.g. President, Secretary" className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" /></div>
            <div><label className="text-sm font-medium">Region</label><input value={form.region} onChange={e => setForm({...form, region: e.target.value})} placeholder="e.g. Nigeria, UK" className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" /></div>
            <div><label className="text-sm font-medium">Photo URL</label><input value={form.image_url} onChange={e => setForm({...form, image_url: e.target.value})} placeholder="https://..." className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" /></div>
            <div className="sm:col-span-2"><label className="text-sm font-medium">Bio</label><textarea value={form.bio} onChange={e => setForm({...form, bio: e.target.value})} rows={3} placeholder="Short biography..." className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm resize-none" /></div>
            <div><label className="text-sm font-medium">Display Order</label><input type="number" value={form.order_index} onChange={e => setForm({...form, order_index: parseInt(e.target.value) || 0})} placeholder="0 = first" className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" /></div>
          </div>
          <div className="mt-4 flex gap-3">
            <button onClick={save} className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">Save</button>
            <button onClick={() => { setShowForm(false); setEditing(null) }} className="rounded-lg border border-border px-5 py-2 text-sm font-medium hover:bg-secondary">Cancel</button>
          </div>
        </div>
      )}

      {loading ? <p className="text-muted-foreground">Loading...</p> : (
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-secondary">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Name</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Role</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Region</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Order</th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaders.map((l) => (
                <tr key={l.id} className="border-b border-border last:border-b-0 hover:bg-secondary/50">
                  <td className="px-4 py-3 font-medium text-foreground">{l.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{l.role}</td>
                  <td className="px-4 py-3 text-muted-foreground">{l.region}</td>
                  <td className="px-4 py-3 text-muted-foreground">{l.order_index}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => edit(l)} className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary hover:text-primary"><Pencil className="h-4 w-4" /></button>
                      <button onClick={() => remove(l.id)} className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {leaders.length === 0 && <tr><td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">No leaders yet. Add your first team member!</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
