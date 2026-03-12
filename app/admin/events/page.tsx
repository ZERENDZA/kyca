"use client"

import { useEffect, useState, useRef } from "react"
import { Plus, Trash2, Pencil, Upload, X, Eye, EyeOff } from "lucide-react"
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
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [form, setForm] = useState(emptyForm)
  const fileInputRef = useRef<HTMLInputElement>(null)

  async function load() {
    const res = await fetch("/api/events")
    setEvents(await res.json())
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setSelectedFile(file)
    const reader = new FileReader()
    reader.onload = () => setPreview(reader.result as string)
    reader.readAsDataURL(file)
  }

  async function uploadImage(): Promise<string | null> {
    if (!selectedFile) return form.image_url || null
    const fileExt = selectedFile.name.split(".").pop()
    const fileName = `events/${Date.now()}.${fileExt}`
    const { error } = await supabase.storage.from("gallery").upload(fileName, selectedFile, { upsert: false })
    if (error) throw new Error(error.message)
    const { data } = supabase.storage.from("gallery").getPublicUrl(fileName)
    return data.publicUrl
  }

  async function save() {
    setUploading(true)
    try {
      const image_url = await uploadImage()
      const body = { ...form, image_url: image_url || "" }
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
    setSelectedFile(null)
    setPreview(null)
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
    setPreview(event.image_url || null)
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
        <button onClick={() => { setShowForm(true); setEditing(null); setForm(emptyForm); setPreview(null) }}
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

          <div onClick={() => fileInputRef.current?.click()}
            className="mb-4 relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-secondary cursor-pointer hover:border-primary transition-colors overflow-hidden"
            style={{ minHeight: 140 }}>
            {preview ? (
              <NextImage src={preview} alt="Preview" fill className="object-cover opacity-80" />
            ) : (
              <div className="flex flex-col items-center gap-2 text-muted-foreground p-6">
                <Upload className="h-8 w-8" />
                <p className="text-sm">Click to upload event image</p>
              </div>
            )}
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="text-sm font-medium">Title *</label>
              <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
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
              {uploading ? "Saving..." : "Save Event"}
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
