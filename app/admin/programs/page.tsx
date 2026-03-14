"use client"

import { useEffect, useState } from "react"
import { Plus, Trash2, Pencil, Eye, EyeOff } from "lucide-react"
import { ImageInput } from "@/components/admin/ImageInput"

type Program = {
  id: string
  title: string
  slug: string
  subtitle: string
  description: string
  category: string
  image_url: string
  participants: string
  events_count: string
  mentors: string
  status: string
  published: boolean
  featured: boolean
  created_at: string
}

const emptyForm = {
  title: "", slug: "", subtitle: "", description: "",
  category: "", image_url: "", participants: "", events_count: "",
  mentors: "", status: "active", published: true, featured: false
}

export default function AdminPrograms() {
  const [programs, setPrograms] = useState<Program[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Program | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  async function load() {
    const res = await fetch("/api/programs")
    const data = await res.json()
    setPrograms(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  function handleTitleChange(title: string) {
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
    setForm(f => ({ ...f, title, slug: editing ? f.slug : slug }))
  }

  async function save() {
    if (!form.title.trim()) { setError("Title is required."); return }
    if (!form.slug.trim()) { setError("Slug is required."); return }
    setSaving(true); setError("")
    const method = editing ? "PUT" : "POST"
    const body = editing ? { ...form, id: editing.id } : form
    const res = await fetch("/api/programs", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
    const data = await res.json()
    if (!res.ok) { setError(data.error || "Failed to save."); setSaving(false); return }
    setShowForm(false); setEditing(null); setForm(emptyForm); setSaving(false); load()
  }

  async function remove(id: string) {
    if (!confirm("Delete this program?")) return
    await fetch("/api/programs", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })
    load()
  }

  function edit(p: Program) {
    setEditing(p)
    setForm({
      title: p.title, slug: p.slug || "", subtitle: p.subtitle || "",
      description: p.description || "", category: p.category || "",
      image_url: p.image_url || "", participants: p.participants || "",
      events_count: p.events_count || "", mentors: p.mentors || "",
      status: p.status || "active", published: p.published, featured: p.featured || false
    })
    setShowForm(true); setError("")
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-2xl font-bold text-foreground">Programs</h1>
          <p className="text-sm text-muted-foreground">{programs.length} total programs</p>
        </div>
        <button onClick={() => { setShowForm(true); setEditing(null); setForm(emptyForm); setError("") }}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">
          <Plus className="h-4 w-4" /> Add Program
        </button>
      </div>

      {showForm && (
        <div className="mb-6 rounded-xl border border-border bg-card p-6">
          <h2 className="font-serif text-lg font-semibold mb-4">{editing ? "Edit Program" : "New Program"}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Title *</label>
              <input value={form.title} onChange={e => handleTitleChange(e.target.value)}
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="text-sm font-medium">Slug * <span className="text-muted-foreground text-xs">(URL: /programs/slug)</span></label>
              <input value={form.slug} onChange={e => setForm({...form, slug: e.target.value})}
                placeholder="e.g. youth-empowerment"
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm font-mono" />
            </div>
            <div>
              <label className="text-sm font-medium">Subtitle</label>
              <input value={form.subtitle} onChange={e => setForm({...form, subtitle: e.target.value})}
                placeholder="e.g. Building Leaders for Tomorrow"
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="text-sm font-medium">Category</label>
              <input value={form.category} onChange={e => setForm({...form, category: e.target.value})}
                placeholder="e.g. Education, Culture"
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
            </div>
            <div className="sm:col-span-2">
              <ImageInput 
                label="Program Image" 
                value={form.image_url} 
                onChange={(url: string) => setForm({ ...form, image_url: url })} 
                helperText="Direct upload or external URL"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm font-medium">Description</label>
              <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})}
                rows={4} placeholder="Full description of the program..."
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm resize-none" />
            </div>
            <div>
              <label className="text-sm font-medium">Participants</label>
              <input value={form.participants} onChange={e => setForm({...form, participants: e.target.value})}
                placeholder="e.g. 1,200+"
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="text-sm font-medium">Events Run</label>
              <input value={form.events_count} onChange={e => setForm({...form, events_count: e.target.value})}
                placeholder="e.g. 35"
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="text-sm font-medium">Mentors</label>
              <input value={form.mentors} onChange={e => setForm({...form, mentors: e.target.value})}
                placeholder="e.g. 80"
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="text-sm font-medium">Status</label>
              <select value={form.status} onChange={e => setForm({...form, status: e.target.value})}
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm">
                <option value="active">Active</option>
                <option value="upcoming">Upcoming</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div className="flex items-center gap-6 pt-2">
              <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
                <input type="checkbox" checked={form.published} onChange={e => setForm({...form, published: e.target.checked})} />
                Published
              </label>
              <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
                <input type="checkbox" checked={form.featured} onChange={e => setForm({...form, featured: e.target.checked})} />
                Featured
              </label>
            </div>
          </div>
          {error && <p className="mt-3 rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-600">{error}</p>}
          <div className="mt-4 flex gap-3">
            <button onClick={save} disabled={saving}
              className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-60">
              {saving ? "Saving..." : "Save"}
            </button>
            <button onClick={() => { setShowForm(false); setEditing(null) }}
              className="rounded-lg border border-border px-5 py-2 text-sm font-medium hover:bg-secondary">
              Cancel
            </button>
          </div>
        </div>
      )}

      {loading ? <p className="text-muted-foreground">Loading...</p> : (
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-secondary">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Title</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Slug</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Category</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Visibility</th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {programs.map((p) => (
                <tr key={p.id} className="border-b border-border last:border-b-0 hover:bg-secondary/50">
                  <td className="px-4 py-3 font-medium text-foreground">
                    {p.title}
                    {p.featured && <span className="ml-2 rounded-full bg-yellow-500/10 px-2 py-0.5 text-xs text-yellow-600">Featured</span>}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{p.slug}</td>
                  <td className="px-4 py-3 text-muted-foreground">{p.category}</td>
                  <td className="px-4 py-3 capitalize text-muted-foreground">{p.status}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${p.published ? "bg-green-500/10 text-green-600" : "bg-yellow-500/10 text-yellow-600"}`}>
                      {p.published ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                      {p.published ? "Published" : "Hidden"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => edit(p)} className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary hover:text-primary"><Pencil className="h-4 w-4" /></button>
                      <button onClick={() => remove(p.id)} className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {programs.length === 0 && <tr><td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">No programs yet. Add your first program!</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
