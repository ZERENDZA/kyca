"use client"

import { useEffect, useState } from "react"
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react"

type Post = {
  id: string
  title: string
  slug: string
  excerpt: string
  category: string
  image_url: string
  published: boolean
  created_at: string
}

export default function AdminPosts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Post | null>(null)
  const [form, setForm] = useState({ title: "", slug: "", excerpt: "", category: "", image_url: "", published: false })
  const [imageFile, setImageFile] = useState<File | null>(null)

  async function load() {
    const res = await fetch("/api/posts")
    setPosts(await res.json())
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function save() {
    let finalImageUrl = form.image_url

    if (imageFile) {
      const uploadData = new FormData()
      uploadData.append("file", imageFile)

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: uploadData,
      })

      if (uploadRes.ok) {
        const result = await uploadRes.json()
        finalImageUrl = result.url
      } else {
        alert("Failed to upload image")
        return
      }
    }

    const method = editing ? "PUT" : "POST"
    const body = editing ? { ...form, id: editing.id, image_url: finalImageUrl } : { ...form, image_url: finalImageUrl }
    await fetch("/api/posts", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
    
    setShowForm(false)
    setEditing(null)
    setImageFile(null)
    setForm({ title: "", slug: "", excerpt: "", category: "", image_url: "", published: false })
    load()
  }

  async function remove(id: string) {
    if (!confirm("Delete this post?")) return
    await fetch("/api/posts", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })
    load()
  }

  function edit(post: Post) {
    setEditing(post)
    setForm({ title: post.title, slug: post.slug, excerpt: post.excerpt || "", category: post.category || "", image_url: post.image_url || "", published: post.published })
    setShowForm(true)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-2xl font-bold text-foreground">News & Posts</h1>
          <p className="text-sm text-muted-foreground">{posts.length} total posts</p>
        </div>
        <button onClick={() => { setShowForm(true); setEditing(null) }} className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">
          <Plus className="h-4 w-4" /> New Post
        </button>
      </div>

      {showForm && (
        <div className="mb-6 rounded-xl border border-border bg-card p-6">
          <h2 className="font-serif text-lg font-semibold mb-4">{editing ? "Edit Post" : "New Post"}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div><label className="text-sm font-medium">Title</label><input value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" /></div>
            <div><label className="text-sm font-medium">Slug</label><input value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" /></div>
            <div><label className="text-sm font-medium">Category</label><input value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" /></div>
            <div>
              <label className="text-sm font-medium">Image Upload</label>
              <input 
                type="file" 
                accept="image/*"
                onChange={e => {
                  if (e.target.files && e.target.files[0]) {
                    setImageFile(e.target.files[0])
                  }
                }} 
                className="mt-1 flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium" 
              />
              {form.image_url && !imageFile && (
                 <p className="mt-1 text-xs text-muted-foreground truncate">Current: {form.image_url.split('/').pop()}</p>
              )}
            </div>
            <div className="sm:col-span-2"><label className="text-sm font-medium">Excerpt</label><textarea value={form.excerpt} onChange={e => setForm({...form, excerpt: e.target.value})} rows={3} className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" /></div>
            <div className="flex items-center gap-2"><input type="checkbox" id="pub" checked={form.published} onChange={e => setForm({...form, published: e.target.checked})} /><label htmlFor="pub" className="text-sm font-medium">Published</label></div>
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
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Title</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Category</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Date</th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-b border-border last:border-b-0 hover:bg-secondary/50">
                  <td className="px-4 py-3 font-medium text-foreground">{post.title}</td>
                  <td className="px-4 py-3 text-muted-foreground">{post.category}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${post.published ? "bg-green-500/10 text-green-600" : "bg-yellow-500/10 text-yellow-600"}`}>
                      {post.published ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                      {post.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{new Date(post.created_at).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => edit(post)} className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary hover:text-primary"><Pencil className="h-4 w-4" /></button>
                      <button onClick={() => remove(post.id)} className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {posts.length === 0 && <tr><td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">No posts yet. Create your first post!</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
