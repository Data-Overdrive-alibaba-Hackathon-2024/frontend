import localFont from 'next/font/local'
import { auth } from '@/auth'
import { Session } from '@/lib/types'
import { redirect } from 'next/navigation'
import { Pixelify_Sans } from 'next/font/google'
import Link from 'next/link'

export const metadata = {
  title: 'Awas Korupsi Educational Game'
}

const customFont = Pixelify_Sans({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
})

export default async function IndexPage() {
  const session = (await auth()) as Session

  if (session) {
    redirect('/main')
  }

  return (
    <div className='flex flex-col bg-[#1C0043] min-h-screen items-center text-white'>
      <div className={customFont.className}>
        <div className="text-center">
          <p className="text-2xl mt-[15vh]">Selamat datang di</p>
          <h1 className="text-8xl font-bold mt-[16vh] tracking-widest"> Awas Korupsi! </h1>
          <div className="space-y-2 flex flex-col mt-[16vh]">
            <Link href="/login" className="text-3xl text-[#A499B4] hover:text-white transition duration-300"> Masuk akun </Link>
            <Link href="/signup" className="text-3xl text-[#A499B4] hover:text-white transition duration-300"> Buat akun baru </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
