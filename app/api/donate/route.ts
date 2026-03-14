import { NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, amount, cause, frequency, reference, status } = body

    const { error } = await supabaseAdmin
      .from("donations")
      .insert([{ name, email, amount, cause, frequency, reference: reference ?? null, status: status ?? "pending" }])

    if (error) {
      console.error("Donation submission error:", error)
    }

    return NextResponse.json({ success: true })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
