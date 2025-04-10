import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")
  // Obtener la URL de redirección del parámetro de consulta
  const redirectTo = requestUrl.searchParams.get("redirectTo") || "/repositorio"

  if (code) {
    const supabase = createRouteHandlerClient({ cookies })
    await supabase.auth.exchangeCodeForSession(code)
  }

  // URL to redirect to after sign in process completes
  const origin = requestUrl.origin
  return NextResponse.redirect(new URL(redirectTo, origin))
}
