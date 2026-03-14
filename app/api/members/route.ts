import { NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("members")
    .select("*")
    .order("full_name", { ascending: true })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data || [])
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    
    // Normalize data: ensure we use full_name and default membership_type to "basic" (which we'll label as Member in UI)
    const payload = {
      full_name: body.full_name || body.name || "Unknown",
      email: body.email,
      phone: body.phone || "",
      region: body.region || body.location || "",
      membership_type: "basic", // Standardize all to one type
      status: body.status || "active",
      joined_at: new Date().toISOString()
    }

    const { data, error } = await supabaseAdmin
      .from("members")
      .insert([payload])
      .select()
      .single()

    if (error) {
      console.error("Supabase insert error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (e: any) {
    console.error("API Member Error:", e)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json()
    const { error } = await supabaseAdmin.from("members").delete().eq("id", id)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ success: true })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
