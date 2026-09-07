"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

function normalizeEmail(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim().toLowerCase() : ""
}

function readPassword(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value : ""
}

export async function signIn(prevState: any, formData: FormData) {
  if (!formData) {
    return { error: "Form data is missing" }
  }

  const email = normalizeEmail(formData.get("email"))
  const password = readPassword(formData.get("password"))

  if (!email || !password || email.length > 254 || password.length > 256) {
    return { error: "Invalid email or password" }
  }

  try {
    const supabase = await createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      return { error: "Invalid email or password" }
    }

    return { success: true }
  } catch (error) {
    console.error("Login error:", error)
    return { error: "Authentication service is temporarily unavailable" }
  }
}

export async function signUp(prevState: any, formData: FormData) {
  if (!formData) {
    return { error: "Form data is missing" }
  }

  const email = normalizeEmail(formData.get("email"))
  const password = readPassword(formData.get("password"))

  if (!email || email.length > 254 || password.length < 12 || password.length > 256) {
    return { error: "Use a valid email and a password of at least 12 characters" }
  }

  try {
    const supabase = await createClient()
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://alazab.com"
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${siteUrl.replace(/\/$/, "")}/auth/callback`,
      },
    })

    if (error) {
      return { error: "Unable to create account" }
    }

    return { success: "Check your email to confirm your account." }
  } catch (error) {
    console.error("Sign up error:", error)
    return { error: "Authentication service is temporarily unavailable" }
  }
}

export async function signOut() {
  try {
    const supabase = await createClient()
    await supabase.auth.signOut()
  } catch (error) {
    console.error("Sign out error:", error)
  }

  redirect("/auth/login")
}
