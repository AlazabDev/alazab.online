"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { signUp } from "@/lib/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Mail, Lock } from "lucide-react"
import Link from "next/link"

function SignUpSubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      className="w-full bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-semibold"
      disabled={pending}
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          جاري إنشاء الحساب...
        </>
      ) : (
        "إنشاء حساب"
      )}
    </Button>
  )
}

export default function SignUpForm() {
  const [state, formAction] = useActionState(signUp, null)

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white text-center">إنشاء حساب جديد</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          {state?.error && (
            <Alert className="border-red-500/50 bg-red-500/10">
              <AlertDescription className="text-red-400">{state.error}</AlertDescription>
            </Alert>
          )}

          {state?.success && (
            <Alert className="border-green-500/50 bg-green-500/10">
              <AlertDescription className="text-green-400">{state.success}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-300">
              البريد الإلكتروني
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                maxLength={254}
                className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                placeholder="your-email@alazab.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-slate-300">
              كلمة المرور
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="new-password"
                minLength={12}
                maxLength={256}
                className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                placeholder="••••••••••••"
              />
            </div>
          </div>

          <SignUpSubmitButton />

          <div className="text-center">
            <Link href="/auth/login" className="text-yellow-400 hover:text-yellow-300 text-sm">
              لديك حساب بالفعل؟ تسجيل الدخول
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
