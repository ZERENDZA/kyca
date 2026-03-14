import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { name, email, membership_type } = await req.json()

    const membershipLabel = "Member"

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body style="margin:0;padding:0;background:#f5f0eb;font-family:Georgia,serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f0eb;padding:40px 16px;">
          <tr><td align="center">
            <table width="100%" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e8e0d6;">
              <!-- Header -->
              <tr>
                <td style="background:#3d2b1f;padding:32px 40px;text-align:center;">
                  <p style="margin:0;color:#d4a96a;font-size:11px;letter-spacing:3px;text-transform:uppercase;">Kamwe Youth Connect Association</p>
                  <h1 style="margin:8px 0 0;color:#ffffff;font-size:28px;font-weight:700;">Welcome to KYCA!</h1>
                </td>
              </tr>
              <!-- Body -->
              <tr>
                <td style="padding:40px;">
                  <p style="margin:0 0 16px;font-size:16px;color:#3d2b1f;">Dear <strong>${name}</strong>,</p>
                  <p style="margin:0 0 16px;font-size:15px;color:#5c4a3a;line-height:1.7;">
                    Thank you for joining the Kamwe Youth Connect Association. Your registration has been received and confirmed.
                  </p>
                  <p style="margin:0 0 24px;font-size:15px;color:#5c4a3a;line-height:1.7;">
                    You are now part of a vibrant community dedicated to preserving Kamwe culture, empowering youth, and connecting our people across Nigeria, Cameroon, and the diaspora.
                  </p>
                  <!-- Info box -->
                  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f0eb;border-radius:12px;margin-bottom:24px;">
                    <tr><td style="padding:20px 24px;">
                      <p style="margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#9c7c5a;">Your Membership</p>
                      <p style="margin:0;font-size:18px;font-weight:700;color:#3d2b1f;">KYCA Member</p>
                    </td></tr>
                  </table>
                  <p style="margin:0 0 16px;font-size:15px;color:#5c4a3a;line-height:1.7;">
                    Our team will be in touch soon with more information about upcoming events, programs, and how you can get involved.
                  </p>
                  <!-- CTA -->
                  <table cellpadding="0" cellspacing="0" style="margin:28px 0;">
                    <tr><td style="background:#3d2b1f;border-radius:8px;">
                      <a href="${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}" style="display:inline-block;padding:14px 32px;color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;letter-spacing:0.5px;">
                        Visit KYCA Website →
                      </a>
                    </td></tr>
                  </table>
                  <p style="margin:0;font-size:14px;color:#9c7c5a;line-height:1.6;">
                    With warm regards,<br/>
                    <strong style="color:#5c4a3a;">The KYCA Team</strong>
                  </p>
                </td>
              </tr>
              <!-- Footer -->
              <tr>
                <td style="background:#f5f0eb;padding:20px 40px;text-align:center;border-top:1px solid #e8e0d6;">
                  <p style="margin:0;font-size:12px;color:#9c7c5a;">
                    © ${new Date().getFullYear()} Kamwe Youth Connect Association. All rights reserved.
                  </p>
                </td>
              </tr>
            </table>
          </td></tr>
        </table>
      </body>
      </html>
    `

    if (process.env.RESEND_API_KEY) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "KYCA <noreply@kyca.org.ng>", 
          to: email,
          subject: "Welcome to KYCA — Registration Confirmed!",
          html,
        }),
      })

      if (!res.ok) {
        const err = await res.json()
        console.error("Email send failed:", err)
      }
    } else {
      console.warn("RESEND_API_KEY is missing, skipping email.")
    }

    return NextResponse.json({ success: true })
  } catch (e: any) {
    console.error("Welcome email error:", e)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
