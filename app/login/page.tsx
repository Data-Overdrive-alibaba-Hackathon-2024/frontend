import { auth } from '@/auth'
import LoginForm from '@/components/login-form'
import { Session } from '@/lib/types'
import { redirect } from 'next/navigation'

export default async function LoginPage() {
  const session = (await auth()) as Session

  if (session) {
    redirect('/main')
  }

  return (
    <main className="flex flex-col bg-[#1C0043] min-h-screen items-center">
      <LoginForm />
    </main>
  )
}
