"use client"

import { useEffect, useState, useRef } from "react"
import { Plus, Trash2, Pencil, X, Eye, EyeOff } from "lucide-react"
import { ImageInput } from "@/components/admin/ImageInput"
import { supabase } from "@/lib/supabase"
import NextImage from "next/image"

type Event = {
  id: string
  title: string
  description: string
  location: string
  event_date: string
  image_url: string
  published: boolean
  featured: boolean
}

const emptyForm = { title: "", description: "", location: "", event_date: "", image_url: "", published: false, featured: false }

export default function AdminEvents() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Event | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [uploading, setUploading] = useState(false)

  async function load() {
    const res = await fetch("/api/events")
    setEvents(await res.json())
    setLoading(false)
  }

  useEffect(() => { load() }, [])


  async function save() {
    setUploading(true)
    try {
      const body = { ...form }
      if (editing) {
        await fetch("/api/events", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...body, id: editing.id }) })
      } else {
        await fetch("/api/events", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
      }
      resetForm()
      load()
    } catch (e: any) {
      alert("Error: " + e.message)
    } finally {
      setUploading(false)
    }
  }

  function resetForm() {
    setShowForm(false)
    setEditing(null)
    setForm(emptyForm)
  }

  function edit(event: Event) {
    setEditing(event)
    setForm({
      title: event.title,
      description: event.description || "",
      location: event.location || "",
      event_date: event.event_date ? event.event_date.slice(0, 16) : "",
      image_url: event.image_url || "",
      published: event.published,
      featured: event.featured || false,
    })
    setShowForm(true)
  }

  async function remove(id: string) {
    if (!confirm("Delete this event?")) return
    await fetch("/api/events", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-2xl font-bold text-foreground">Events</h1>
          <p className="text-sm text-muted-foreground">{events.length} events</p>
        </div>
        <button onClick={() => { setShowForm(true); setEditing(null); setForm(emptyForm) }}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">
          <Plus className="h-4 w-4" /> Add Event
        </button>
      </div>

      {showForm && (
        <div className="mb-6 rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-lg font-semibold">{editing ? "Edit Event" : "New Event"}</h2>
            <button onClick={resetForm}><X className="h-5 w-5 text-muted-foreground" /></button>
          </div>


          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
               <label className="text-sm font-medium">Title *</label>
               <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
            </div>
            <div className="sm:col-span-2">
              <ImageInput 
                label="Event Image" 
                value={form.image_url} 
                onChange={(url: string) => setForm({ ...form, image_url: url })} 
                helperText="Upload from computer or paste a URL"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Location</label>
              <input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })}
                placeholder="e.g. Michika, Adamawa"
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="text-sm font-medium">Date & Time</label>
              <input type="datetime-local" value={form.event_date} onChange={e => setForm({ ...form, event_date: e.target.value })}
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm font-medium">Description</label>
              <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
                rows={3} className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm resize-none" />
            </div>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
                <input type="checkbox" checked={form.published} onChange={e => setForm({ ...form, published: e.target.checked })} />
                Published
              </label>
              <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
                <input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} />
                Featured <span className="text-xs text-muted-foreground">(shows on homepage)</span>
              </label>
            </div>
          </div>

          <div className="mt-4 flex gap-3">
            <button onClick={save} disabled={uploading}
              className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50">
              {uploading ? "Saving..." : editing ? "Save Changes" : "Create Event"}
            </button>
            <button onClick={resetForm} className="rounded-lg border border-border px-5 py-2 text-sm font-medium hover:bg-secondary">Cancel</button>
          </div>
        </div>
      )}

      {loading ? <p className="text-muted-foreground">Loading...</p> : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <div key={event.id} className="rounded-xl border border-border bg-card overflow-hidden">
              <div className="relative aspect-video bg-secondary">
                {event.image_url && <NextImage src={event.image_url} alt={event.title} fill className="object-cover" />}
                {event.featured && (
                  <div className="absolute top-2 left-2">
                    <span className="rounded-full bg-yellow-500/90 px-2 py-0.5 text-xs font-semibold text-white">Featured</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <p className="font-semibold text-foreground">{event.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{event.location}</p>
                {event.event_date && (
                  <p className="text-xs text-primary mt-1">{new Date(event.event_date).toLocaleDateString()}</p>
                )}
                <div className="mt-3 flex justify-between items-center">
                  <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${event.published ? "bg-green-500/10 text-green-600" : "bg-yellow-500/10 text-yellow-600"}`}>
                    {event.published ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                    {event.published ? "Published" : "Draft"}
                  </span>
                  <div className="flex gap-2">
                    <button onClick={() => edit(event)} className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary hover:text-primary"><Pencil className="h-4 w-4" /></button>
                    <button onClick={() => remove(event.id)} className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {events.length === 0 && (
            <div className="col-span-3 py-12 text-center text-muted-foreground">No events yet.</div>
          )}
        </div>
      )}
    </div>
  )
}
