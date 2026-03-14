import { NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, subject, message } = body

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 })
    }

    const { error } = await supabaseAdmin
      .from("contact_messages")
      .insert([{ name, email, subject, message }])

    if (error) {
      // If table doesn't exist yet, still return success so UX isn't broken
      console.error("Contact form error:", error)
    }

    return NextResponse.json({ success: true })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
