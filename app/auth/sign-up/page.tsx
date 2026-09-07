import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { isAdminUser } from "@/lib/auth/admin"
import SignUpForm from "@/components/sign-up-form"

export default async function SignUpPage() {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (user) {
      redirect(isAdminUser(user) ? "/admin" : "/")
    }
  } catch {
    // Render the sign-up form if authentication is unavailable.
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img src="/images/design-mode/logaz.gif" alt="Al-Azab Construction" className="h-20 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">إنشاء حساب جديد</h1>
          <p className="text-slate-400">انضم إلى فريق شركة العزب للإنشاءات</p>
        </div>
        <SignUpForm />
      </div>
    </div>
  )
}
