import { auth } from '@/auth'
import SignupForm from '@/components/signup-form'
import { Session } from '@/lib/types'
import { redirect } from 'next/navigation'

export default async function SignupPage() {
  const session = (await auth()) as Session

  if (session) {
    redirect('/main')
  }

  return (
    <main className="flex flex-col bg-[#1C0043] min-h-screen items-center">
      <SignupForm />
    </main>
  )
}
