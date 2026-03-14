"use client"

import { useEffect, useState, useRef } from "react"
import { Plus, Trash2, Pencil, X, Eye, EyeOff } from "lucide-react"
import { ImageInput } from "@/components/admin/ImageInput"
import { supabase } from "@/lib/supabase"
import NextImage from "next/image"

type GalleryItem = {
  id: string
  title: string
  image_url: string
  media_type: string
  album: string
  published: boolean
  created_at: string
}

const emptyForm = { title: "", image_url: "", media_type: "photo", album: "", published: true }

export default function AdminGallery() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<GalleryItem | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [uploading, setUploading] = useState(false)

  async function load() {
    const res = await fetch("/api/gallery")
    setItems(await res.json())
    setLoading(false)
  }

  useEffect(() => { load() }, [])


  async function save() {
    if (!form.title.trim()) { alert("Title is required."); return }
    setUploading(true)
    try {
      const body = { ...form }
      if (editing) {
        await fetch("/api/gallery", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...body, id: editing.id }) })
      } else {
        await fetch("/api/gallery", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
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

  function edit(item: GalleryItem) {
    setEditing(item)
    setForm({ title: item.title, image_url: item.image_url || "", media_type: item.media_type || "photo", album: item.album || "", published: item.published })
    setShowForm(true)
  }

  async function remove(id: string) {
    if (!confirm("Delete this item?")) return
    await fetch("/api/gallery", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-2xl font-bold text-foreground">Gallery</h1>
          <p className="text-sm text-muted-foreground">{items.length} total items</p>
        </div>
        <button onClick={() => { setShowForm(true); setEditing(null); setForm(emptyForm) }}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">
          <Plus className="h-4 w-4" /> Add Media
        </button>
      </div>

      {showForm && (
        <div className="mb-6 rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-lg font-semibold">{editing ? "Edit Media" : "Add Media"}</h2>
            <button onClick={resetForm}><X className="h-5 w-5 text-muted-foreground" /></button>
          </div>


          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Title *</label>
              <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. Cultural Festival 2026"
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="text-sm font-medium">Album</label>
              <input value={form.album} onChange={e => setForm({ ...form, album: e.target.value })}
                placeholder="e.g. Cultural Festival, Youth Camp"
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
            </div>
            <div className="sm:col-span-2">
              <ImageInput 
                label="Media Asset" 
                value={form.image_url} 
                onChange={(url: string) => setForm({ ...form, image_url: url })} 
                helperText="Upload a photo or paste a URL"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Type</label>
              <select value={form.media_type} onChange={e => setForm({ ...form, media_type: e.target.value })}
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm">
                <option value="photo">Photo</option>
                <option value="video">Video</option>
              </select>
            </div>
            <div className="flex items-center gap-2 pt-6">
              <input type="checkbox" id="pub" checked={form.published} onChange={e => setForm({ ...form, published: e.target.checked })} />
              <label htmlFor="pub" className="text-sm font-medium">Published</label>
            </div>
          </div>

          <div className="mt-4 flex gap-3">
            <button onClick={save} disabled={uploading}
              className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-60">
              {uploading ? "Saving..." : "Save"}
            </button>
            <button onClick={resetForm} className="rounded-lg border border-border px-5 py-2 text-sm font-medium hover:bg-secondary">Cancel</button>
          </div>
        </div>
      )}

      {loading ? <p className="text-muted-foreground">Loading...</p> : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div key={item.id} className="rounded-xl border border-border bg-card overflow-hidden">
              <div className="relative aspect-video bg-secondary">
                {item.image_url && (
                  <NextImage src={item.image_url} alt={item.title} fill className="object-cover" />
                )}
              </div>
              <div className="p-4">
                <p className="font-medium text-foreground text-sm">{item.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.album} · {item.media_type}</p>
                <div className="mt-3 flex justify-between items-center">
                  <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${item.published ? "bg-green-500/10 text-green-600" : "bg-yellow-500/10 text-yellow-600"}`}>
                    {item.published ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                    {item.published ? "Published" : "Hidden"}
                  </span>
                  <div className="flex gap-2">
                    <button onClick={() => edit(item)} className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary hover:text-primary"><Pencil className="h-4 w-4" /></button>
                    <button onClick={() => remove(item.id)} className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <div className="col-span-3 py-12 text-center text-muted-foreground">No media yet. Add your first photo!</div>
          )}
        </div>
      )}
    </div>
  )
}
