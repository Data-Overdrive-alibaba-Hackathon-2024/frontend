'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { authenticate } from '@/app/login/actions'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { IconSpinner } from './ui/icons'
import { getMessageFromCode } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { Pixelify_Sans } from 'next/font/google'
import Image from 'next/image';
import EyeOpenIcon from '../public/eye-open.svg'
import EyeClosedIcon from '../public/eye-closed.svg'

const customFont = Pixelify_Sans({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
})

export default function LoginForm() {
  const router = useRouter()
  const [result, dispatch] = useFormState(authenticate, undefined)
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (result) {
      if (result.type === 'error') {
        toast.error(getMessageFromCode(result.resultCode))
      } else {
        window.localStorage.setItem('token', result.token || ''); // Store token on client side with a default value of ''
        toast.success("Login success")
        router.push('/main')
      }
    }
  }, [result, router])

  return (
    <form
      action={dispatch}
      className="flex flex-col items-center gap-4 space-y-3 mt-[16vh]"
    >
      <div className={`${customFont.className} w-[70vh]`}>
        <div className="flex justify-between mb-8 text-gray-400">
          <div className="text-xl text-white">Masuk Akun</div>
          <Link href="/signup" className="text-xl text-[#77668E] hover:text-white transition duration-300">Buat Akun</Link>
        </div>
        <div className="space-y-6 mt-[10vh]">
          <div>
            <label htmlFor="email" className="block text-xl text-[#9177B7]">Email</label>
            <input
              className="w-full mt-2 bg-transparent border-b border-white text-white text-lg focus:outline-none focus:border-purple-500"
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email address"
              required
            />
          </div>

          <div className="relative">
            <label htmlFor="password" className="block text-xl text-[#9177B7] mb-2">Kata Sandi</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Enter password"
              required
              minLength={6}
              className="w-full bg-transparent border-b border-white text-white text-lg pb-2 pr-10 focus:outline-none focus:border-purple-500"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-0 bottom-2 text-white"
            >
              {showPassword ? (
                <Image
                  height={26}
                  width={26}
                  priority
                  src={EyeOpenIcon}
                  alt="open password"
                />
              ) : (
                <Image
                  height={26}
                  width={26}
                  priority
                  src={EyeClosedIcon}
                  alt="closed password"
                />
              )}
            </button>
          </div>
          <div className="flex justify-center">
            <LoginButton />
          </div>
        </div>
      </div>
    </form>
  )
}

function LoginButton() {
  const { pending } = useFormStatus()

  return (
    <button
      className="w-1/2 bg-[#9177B7] flex justify-center items-center text-white py-3 rounded-xl text-lg mt-8 hover:bg-purple-700 transition duration-300"
      aria-disabled={pending}
    >
      {pending ? <IconSpinner /> : 'Log in'}
    </button>
  )
}
