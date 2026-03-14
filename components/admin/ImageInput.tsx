"use client"

import { useState, useRef, useEffect } from "react"
import { Upload, Link as LinkIcon, X, Loader2, Image as ImageIcon } from "lucide-react"
import Image from "next/image"
import { supabase } from "@/lib/supabase"

interface ImageInputProps {
  value: string
  onChange: (url: string) => void
  label?: string
  helperText?: string
  bucket?: string
}

export function ImageInput({ value, onChange, label, helperText, bucket }: ImageInputProps) {
  const [mode, setMode] = useState<"upload" | "url">(value?.startsWith("http") || !value ? "url" : "upload")
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(value || null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setPreview(value)
  }, [value])

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)

    try {
      if (bucket) {
        // Direct Supabase Storage Upload
        const fileExt = file.name.split(".").pop()
        const fileName = `${Date.now()}.${fileExt}`
        const filePath = `${fileName}`

        const { error: uploadError } = await supabase.storage
          .from(bucket)
          .upload(filePath, file)

        if (uploadError) throw uploadError

        const { data } = supabase.storage.from(bucket).getPublicUrl(filePath)
        onChange(data.publicUrl)
        setPreview(data.publicUrl)
      } else {
        // Local API Upload
        const formData = new FormData()
        formData.append("file", file)

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        })

        if (res.ok) {
          const data = await res.json()
          onChange(data.url)
          setPreview(data.url)
        } else {
          alert("Upload failed")
        }
      }
    } catch (err: any) {
      console.error(err)
      alert("Error uploading file: " + err.message)
    } finally {
      setUploading(false)
    }
  }

  const clear = () => {
    onChange("")
    setPreview(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        {label && <label className="text-sm font-medium text-foreground">{label}</label>}
        <div className="flex gap-1 rounded-lg bg-secondary p-1">
          <button
            type="button"
            onClick={() => setMode("upload")}
            className={`rounded-md px-2.5 py-1 text-xs font-medium transition-all ${
              mode === "upload" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Upload className="mr-1 inline-block h-3 w-3" />
            Upload
          </button>
          <button
            type="button"
            onClick={() => setMode("url")}
            className={`rounded-md px-2.5 py-1 text-xs font-medium transition-all ${
              mode === "url" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <LinkIcon className="mr-1 inline-block h-3 w-3" />
            URL
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-xl border border-input bg-background/50 transition-all focus-within:ring-2 focus-within:ring-primary/20">
        {mode === "upload" ? (
          <div className="p-1">
            <div
              onClick={() => fileInputRef.current?.click()}
              className={`group relative flex min-h-[140px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-all hover:bg-secondary/50 ${
                preview ? "border-transparent" : "border-border"
              }`}
            >
              {preview ? (
                <div className="relative h-full w-full overflow-hidden rounded-lg">
                  <Image src={preview} alt="Upload preview" fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center">
                    <p className="text-xs font-medium text-white">Click to change</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 p-6 text-center text-muted-foreground">
                  {uploading ? (
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  ) : (
                    <ImageIcon className="h-8 w-8" />
                  )}
                  <div>
                    <p className="text-sm font-medium">{uploading ? "Uploading..." : "Select Image File"}</p>
                    <p className="text-xs">PNG, JPG or WebP (Max 5MB)</p>
                  </div>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>
        ) : (
          <div className="p-3">
            <input
              type="url"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            {preview && (
               <div className="mt-3 relative aspect-video w-full overflow-hidden rounded-lg border border-border bg-secondary">
                  <Image src={preview} alt="URL preview" fill className="object-cover" unoptimized />
               </div>
            )}
          </div>
        )}

        {preview && (
          <button
            type="button"
            onClick={clear}
            className="absolute right-2 top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-transform hover:scale-110"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>
      {helperText && <p className="text-[10px] text-muted-foreground italic">{helperText}</p>}
    </div>
  )
}
