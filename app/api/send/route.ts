import { Resend } from "resend"
import { NextResponse } from "next/server"

const WINDOW_MS = 60_000
const MAX_REQUESTS_PER_WINDOW = 5
const MAX_BODY_BYTES = 20_000
const MAX_MESSAGE_LENGTH = 5_000

const rateLimitStore = new Map<string, { count: number; resetAt: number }>()

function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown"
  return request.headers.get("x-real-ip") || "unknown"
}

function checkRateLimit(key: string) {
  const now = Date.now()
  const current = rateLimitStore.get(key)

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + WINDOW_MS })
    return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - 1, resetAt: now + WINDOW_MS }
  }

  if (current.count >= MAX_REQUESTS_PER_WINDOW) {
    return { allowed: false, remaining: 0, resetAt: current.resetAt }
  }

  current.count += 1
  return {
    allowed: true,
    remaining: MAX_REQUESTS_PER_WINDOW - current.count,
    resetAt: current.resetAt,
  }
}

function cleanupRateLimitStore() {
  if (rateLimitStore.size < 2_000) return
  const now = Date.now()
  for (const [key, value] of rateLimitStore.entries()) {
    if (value.resetAt <= now) rateLimitStore.delete(key)
  }
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;")
}

function text(value: unknown, maxLength: number) {
  if (typeof value !== "string") return ""
  return value.trim().slice(0, maxLength)
}

function isValidEmail(value: string) {
  return value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function allowedOrigin(request: Request) {
  const origin = request.headers.get("origin")
  if (!origin) return true

  const configured = [
    process.env.NEXT_PUBLIC_SITE_URL,
    ...(process.env.ALLOWED_ORIGINS || "").split(","),
    "https://alazab.com",
    "https://www.alazab.com",
  ]
    .map((value) => value?.trim().replace(/\/$/, ""))
    .filter(Boolean)

  return configured.includes(origin.replace(/\/$/, ""))
}

function rateLimitHeaders(remaining: number, resetAt: number) {
  return {
    "X-RateLimit-Limit": String(MAX_REQUESTS_PER_WINDOW),
    "X-RateLimit-Remaining": String(Math.max(0, remaining)),
    "X-RateLimit-Reset": String(Math.ceil(resetAt / 1000)),
  }
}

export async function POST(request: Request) {
  cleanupRateLimitStore()

  if (!allowedOrigin(request)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const contentType = request.headers.get("content-type") || ""
  if (!contentType.toLowerCase().includes("application/json")) {
    return NextResponse.json({ error: "Content-Type must be application/json" }, { status: 415 })
  }

  const contentLength = Number(request.headers.get("content-length") || "0")
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Payload too large" }, { status: 413 })
  }

  const ip = clientIp(request)
  const limit = checkRateLimit(ip)
  if (!limit.allowed) {
    return NextResponse.json(
      { error: "Too many requests" },
      {
        status: 429,
        headers: {
          ...rateLimitHeaders(limit.remaining, limit.resetAt),
          "Retry-After": String(Math.max(1, Math.ceil((limit.resetAt - Date.now()) / 1000))),
        },
      },
    )
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not configured")
    return NextResponse.json({ error: "Mail service unavailable" }, { status: 503 })
  }

  try {
    const body = await request.json()

    // Honeypot field: legitimate forms should leave it empty.
    if (text(body?.website, 200)) {
      return NextResponse.json({ success: true }, { headers: rateLimitHeaders(limit.remaining, limit.resetAt) })
    }

    const type = text(body?.type, 20)
    const name = text(body?.name, 100)
    const email = text(body?.email, 254).toLowerCase()
    const phone = text(body?.phone, 40)
    const service = text(body?.service, 120)
    const message = text(body?.message, MAX_MESSAGE_LENGTH)

    if (!name || name.length < 2 || !isValidEmail(email)) {
      return NextResponse.json({ error: "Invalid contact details" }, { status: 400 })
    }

    if (type !== "contact" && type !== "consultation") {
      return NextResponse.json({ error: "Invalid request type" }, { status: 400 })
    }

    if (type === "contact" && !message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    const safeName = escapeHtml(name)
    const safeEmail = escapeHtml(email)
    const safePhone = escapeHtml(phone || "غير محدد")
    const safeService = escapeHtml(service || "غير محدد")
    const safeMessage = escapeHtml(message || "لم يتم تحديد تفاصيل").replaceAll("\n", "<br />")

    const subject =
      type === "contact"
        ? `رسالة جديدة من ${name.replace(/[\r\n]/g, " ")} - موقع العزب`
        : `طلب استشارة جديد من ${name.replace(/[\r\n]/g, " ")} - موقع العزب`

    const heading = type === "contact" ? "رسالة تواصل جديدة" : "طلب استشارة مجانية"

    const htmlContent = `
      <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #030957; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">العزب</h1>
        </div>
        <div style="padding: 30px; background: #f9fafb;">
          <h2 style="color: #1f2937;">${heading}</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 10px; font-weight: bold;">الاسم:</td><td style="padding: 10px;">${safeName}</td></tr>
            <tr><td style="padding: 10px; font-weight: bold;">البريد:</td><td style="padding: 10px;">${safeEmail}</td></tr>
            <tr><td style="padding: 10px; font-weight: bold;">الهاتف:</td><td style="padding: 10px;">${safePhone}</td></tr>
            ${type === "contact" ? `<tr><td style="padding: 10px; font-weight: bold;">الخدمة:</td><td style="padding: 10px;">${safeService}</td></tr>` : ""}
            <tr><td style="padding: 10px; font-weight: bold;" colspan="2">التفاصيل:</td></tr>
            <tr><td style="padding: 10px; background: white;" colspan="2">${safeMessage}</td></tr>
          </table>
        </div>
      </div>
    `

    const resend = new Resend(process.env.RESEND_API_KEY)
    const to = process.env.CONTACT_EMAIL_TO || "info@alazab.com"
    const from = process.env.RESEND_FROM_EMAIL || "Alazab <onboarding@resend.dev>"

    const { error } = await resend.emails.send({
      from,
      to: [to],
      subject,
      html: htmlContent,
      replyTo: email,
    })

    if (error) {
      console.error("Resend error:", error.message)
      return NextResponse.json({ error: "Unable to send message" }, { status: 502 })
    }

    return NextResponse.json(
      { success: true },
      { headers: rateLimitHeaders(limit.remaining, limit.resetAt) },
    )
  } catch (error) {
    console.error("Contact API error:", error)
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}
