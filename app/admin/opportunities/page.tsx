"use client"

import { useEffect, useState } from "react"
import { Plus, Trash2, Pencil, X, Eye, EyeOff } from "lucide-react"

type Opportunity = {
  id: string
  title: string
  org: string
  location: string
  deadline: string
  type: string
  tag: string
  url: string | null
  published: boolean
  created_at: string
}

export default function AdminOpportunities() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Opportunity | null>(null)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    title: "",
    org: "",
    location: "",
    deadline: "",
    type: "Job",
    tag: "",
    url: "",
    published: false
  })

  async function load() {
    try {
      const res = await fetch("/api/opportunities")
      const data = await res.json()
      setOpportunities(Array.isArray(data) ? data : [])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  async function save() {
    setSaving(true)
    try {
      const body = { ...form }
      if (editing) {
        await fetch("/api/opportunities", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...body, id: editing.id })
        })
      } else {
        await fetch("/api/opportunities", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        })
      }
      resetForm()
      load()
    } catch (e: any) {
      alert("Error: " + e.message)
    } finally {
      setSaving(false)
    }
  }

  function resetForm() {
    setShowForm(false)
    setEditing(null)
    setForm({ title: "", org: "", location: "", deadline: "", type: "Job", tag: "", url: "", published: false })
  }

  function edit(opp: Opportunity) {
    setEditing(opp)
    setForm({
      title: opp.title,
      org: opp.org,
      location: opp.location,
      deadline: opp.deadline,
      type: opp.type,
      tag: opp.tag,
      url: opp.url || "",
      published: opp.published
    })
    setShowForm(true)
  }

  async function remove(id: string) {
    if (!confirm("Delete this opportunity?")) return
    await fetch("/api/opportunities", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    })
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-2xl font-bold text-foreground">Opportunities</h1>
          <p className="text-sm text-muted-foreground">{opportunities.length} total opportunities</p>
        </div>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">
          <Plus className="h-4 w-4" /> New Opportunity
        </button>
      </div>

      {showForm && (
        <div className="mb-6 rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-lg font-semibold">{editing ? "Edit Opportunity" : "New Opportunity"}</h2>
            <button onClick={resetForm}><X className="h-5 w-5 text-muted-foreground" /></button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="text-sm font-medium">Title *</label>
              <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="e.g. Software Engineer — Remote" className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="text-sm font-medium">Organization *</label>
              <input value={form.org} onChange={e => setForm({ ...form, org: e.target.value })} placeholder="e.g. TechBridge Africa" className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="text-sm font-medium">Location *</label>
              <input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="e.g. Remote / Nigeria" className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="text-sm font-medium">Deadline *</label>
              <input value={form.deadline} onChange={e => setForm({ ...form, deadline: e.target.value })} placeholder="e.g. April 10, 2026" className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="text-sm font-medium">Type *</label>
              <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm">
                <option value="Job">Job</option>
                <option value="Scholarship">Scholarship</option>
                <option value="Event">Event</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Tag / Category *</label>
              <input value={form.tag} onChange={e => setForm({ ...form, tag: e.target.value })} placeholder="e.g. Technology" className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="text-sm font-medium">Apply URL</label>
              <input value={form.url} onChange={e => setForm({ ...form, url: e.target.value })} placeholder="https://..." className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
            </div>
            <div className="flex items-center gap-2 sm:col-span-2">
              <input type="checkbox" id="pub" checked={form.published} onChange={e => setForm({ ...form, published: e.target.checked })} />
              <label htmlFor="pub" className="text-sm font-medium">Published</label>
            </div>
          </div>

          <div className="mt-4 flex gap-3">
            <button onClick={save} disabled={saving} className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50">
              {saving ? "Saving..." : "Save Opportunity"}
            </button>
            <button onClick={resetForm} className="rounded-lg border border-border px-5 py-2 text-sm font-medium hover:bg-secondary">Cancel</button>
          </div>
        </div>
      )}

      {loading ? <p className="text-muted-foreground">Loading...</p> : (
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-secondary">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Title</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Org / Location</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Type / Tag</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {opportunities.map((opp) => (
                <tr key={opp.id} className="border-b border-border last:border-b-0 hover:bg-secondary/50">
                  <td className="px-4 py-3 font-medium text-foreground">{opp.title}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    <div>{opp.org}</div>
                    <div className="text-xs">{opp.location}</div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    <div>{opp.type}</div>
                    <div className="text-xs">{opp.tag}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${opp.published ? "bg-green-500/10 text-green-600" : "bg-yellow-500/10 text-yellow-600"}`}>
                      {opp.published ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                      {opp.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => edit(opp)} className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary hover:text-primary"><Pencil className="h-4 w-4" /></button>
                      <button onClick={() => remove(opp.id)} className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {opportunities.length === 0 && <tr><td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">No opportunities yet.</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
