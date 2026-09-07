import type { User } from "@supabase/supabase-js"

function configuredAdminEmails() {
  return new Set(
    (process.env.ADMIN_EMAILS || "")
      .split(",")
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean),
  )
}

export function isAdminUser(user: User | null | undefined) {
  if (!user) return false

  const appMetadata = user.app_metadata || {}
  if (appMetadata.role === "admin" || appMetadata.is_admin === true) {
    return true
  }

  const email = user.email?.trim().toLowerCase()
  return Boolean(email && configuredAdminEmails().has(email))
}
