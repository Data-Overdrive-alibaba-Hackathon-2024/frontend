'use server'

// import { auth } from '@/auth'
import LoginForm from '@/components/login-form'
import { redirect } from 'next/navigation'

export default async function LoginPage() {

  return (
    <main className="flex flex-col bg-[#1C0043] min-h-screen items-center">
      <LoginForm />
    </main>
  )
}
