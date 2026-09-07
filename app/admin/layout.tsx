import type { ReactNode } from "react"
import { redirect } from "next/navigation"
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server"
import { isAdminUser } from "@/lib/auth/admin"

export const dynamic = "force-dynamic"

export default async function AdminLayout({ children }: { children: ReactNode }) {
  if (!isSupabaseConfigured) {
    redirect("/auth/login?error=auth_unavailable")
  }

  const supabase = await createClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/auth/login?next=/admin")
  }

  if (!isAdminUser(user)) {
    redirect("/")
  }

  return children
}
