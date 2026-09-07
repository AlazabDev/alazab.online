import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

function safeNext(value: string | null) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return "/"
  }
  return value
}

export async function GET(request: Request) {
  const url = new URL(request.url)
  const code = url.searchParams.get("code")
  const next = safeNext(url.searchParams.get("next"))

  if (!code) {
    return NextResponse.redirect(new URL("/auth/login?error=missing_code", url.origin))
  }

  try {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      return NextResponse.redirect(new URL("/auth/login?error=callback_failed", url.origin))
    }

    return NextResponse.redirect(new URL(next, url.origin))
  } catch {
    return NextResponse.redirect(new URL("/auth/login?error=auth_unavailable", url.origin))
  }
}
