import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { supabaseAdmin } from "@/lib/supabase"

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || ""
const stripe = stripeSecretKey ? new Stripe(stripeSecretKey) : null

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("payments")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const { amount, name, email, purpose } = await req.json()

  try {
    if (!stripe) {
      throw new Error("Stripe is not configured. Please add STRIPE_SECRET_KEY to .env.local")
    }
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "ngn",
            product_data: {
              name: purpose || "KYCA Donation",
              description: `Supporting Kamwe Youth Connect Association`,
            },
            unit_amount: amount * 100, // amount in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_email: email,
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/donate/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/donate`,
      metadata: { name, email, purpose },
    })

    // Save pending payment to database
    await supabaseAdmin.from("payments").insert([{
      name,
      email,
      amount,
      purpose,
      stripe_payment_id: session.id,
      status: "pending",
    }])

    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
