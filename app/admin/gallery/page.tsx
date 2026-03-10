"use client"

import { useEffect, useState } from "react"
import { Plus, Trash2, Image, Video } from "lucide-react"

type GalleryItem = {
  id: string
  title: string
  media_url: string
  media_type: string
  album: string
  published: boolean
  created_at: string
}

export default function AdminGallery() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ title: "", media_url: "", media_type: "photo", album: "", published: true })

  async function load() {
    const res = await fetch("/api/gallery")
    setItems(await res.json())
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function save() {
    await fetch("/api/gallery", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) })
    setShowForm(false)
    setForm({ title: "", media_url: "", media_type: "photo", album: "", published: true })
    load()
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
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">
          <Plus className="h-4 w-4" /> Add Media
        </button>
      </div>

      {showForm && (
        <div className="mb-6 rounded-xl border border-border bg-card p-6">
          <h2 className="font-serif text-lg font-semibold mb-4">Add Media</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div><label className="text-sm font-medium">Title</label><input value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" /></div>
            <div><label className="text-sm font-medium">Album</label><input value={form.album} onChange={e => setForm({...form, album: e.target.value})} placeholder="e.g. Cultural Festival" className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" /></div>
            <div className="sm:col-span-2"><label className="text-sm font-medium">Media URL</label><input value={form.media_url} onChange={e => setForm({...form, media_url: e.target.value})} placeholder="https://... or /images/photo.jpg" className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" /></div>
            <div>
              <label className="text-sm font-medium">Type</label>
              <select value={form.media_type} onChange={e => setForm({...form, media_type: e.target.value})} className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm">
                <option value="photo">Photo</option>
                <option value="video">Video</option>
              </select>
            </div>
            <div className="flex items-center gap-2 pt-6"><input type="checkbox" id="pub" checked={form.published} onChange={e => setForm({...form, published: e.target.checked})} /><label htmlFor="pub" className="text-sm font-medium">Published</label></div>
          </div>
          <div className="mt-4 flex gap-3">
            <button onClick={save} className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">Save</button>
            <button onClick={() => setShowForm(false)} className="rounded-lg border border-border px-5 py-2 text-sm font-medium hover:bg-secondary">Cancel</button>
          </div>
        </div>
      )}

      {loading ? <p className="text-muted-foreground">Loading...</p> : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div key={item.id} className="rounded-xl border border-border bg-card overflow-hidden">
              <div className="relative aspect-video bg-secondary flex items-center justify-center">
                {item.media_type === "video"
                  ? <Video className="h-10 w-10 text-muted-foreground" />
                  : <Image className="h-10 w-10 text-muted-foreground" />
                }
              </div>
              <div className="p-4">
                <p className="font-medium text-foreground text-sm">{item.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.album} · {item.media_type}</p>
                <div className="mt-3 flex justify-between items-center">
                  <span className={`text-xs rounded-full px-2 py-0.5 ${item.published ? "bg-green-500/10 text-green-600" : "bg-yellow-500/10 text-yellow-600"}`}>
                    {item.published ? "Published" : "Hidden"}
                  </span>
                  <button onClick={() => remove(item.id)} className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {items.length === 0 && <div className="col-span-3 py-12 text-center text-muted-foreground">No media yet. Add your first photo or video!</div>}
        </div>
      )}
    </div>
  )
}
