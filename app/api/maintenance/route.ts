import { NextResponse } from "next/server"

const API_BASE_URL =
  process.env.MAINTENANCE_API_BASE_URL ||
  "https://zrrffsjbfkphridqyais.supabase.co/functions/v1"
const API_KEY = process.env.MAINTENANCE_API_KEY

const SERVICES = new Set(["plumbing", "electrical", "ac", "painting", "carpentry", "general"])
const PRIORITIES = new Set(["low", "medium", "high"])

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : ""
}

async function upstream(path: string, init: RequestInit) {
  if (!API_KEY) {
    return NextResponse.json({ success: false, error: "Maintenance service unavailable" }, { status: 503 })
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
      ...(init.headers || {}),
    },
    cache: "no-store",
  })

  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    return NextResponse.json(
      { success: false, error: typeof data.error === "string" ? data.error : "Maintenance request failed" },
      { status: response.status >= 400 && response.status < 600 ? response.status : 502 },
    )
  }

  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") || ""
  if (!contentType.toLowerCase().includes("application/json")) {
    return NextResponse.json({ success: false, error: "Invalid content type" }, { status: 415 })
  }

  try {
    const body = await request.json()
    const operation = clean(body?.operation, 32)

    if (operation === "submit") {
      const customerName = clean(body?.customerName, 100)
      const customerPhone = clean(body?.customerPhone, 40)
      const serviceType = clean(body?.serviceType, 32)
      const description = clean(body?.description, 3000)
      const priority = clean(body?.priority, 20)

      if (
        customerName.length < 2 ||
        customerPhone.length < 5 ||
        !SERVICES.has(serviceType) ||
        !PRIORITIES.has(priority) ||
        !description
      ) {
        return NextResponse.json({ success: false, error: "Invalid maintenance request" }, { status: 400 })
      }

      return upstream("/maintenance-gateway", {
        method: "POST",
        body: JSON.stringify({ customerName, customerPhone, serviceType, description, priority }),
      })
    }

    if (operation === "query-number") {
      const requestNumber = clean(body?.requestNumber, 100)
      if (!requestNumber) {
        return NextResponse.json({ success: false, error: "Request number is required" }, { status: 400 })
      }
      return upstream(`/query-maintenance-requests?requestNumber=${encodeURIComponent(requestNumber)}`, {
        method: "GET",
      })
    }

    if (operation === "query-phone") {
      const phone = clean(body?.phone, 40)
      if (!phone) {
        return NextResponse.json({ success: false, error: "Phone number is required" }, { status: 400 })
      }
      return upstream(`/query-maintenance-requests?phone=${encodeURIComponent(phone)}`, {
        method: "GET",
      })
    }

    return NextResponse.json({ success: false, error: "Invalid operation" }, { status: 400 })
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 })
  }
}
