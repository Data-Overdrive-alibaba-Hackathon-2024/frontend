'use client'

import { Pixelify_Sans } from "next/font/google"
import Image from "next/image"
import Logout from '../../public/logout.svg'
import LogoutWhite from '../../public/logout-white.svg'
import { useState } from "react"
// import { handleSignOut } from "./actions"
import Popup from "@/components/new/popup"
import Link from "next/link"
import { useRouter } from "next/navigation"

const customFont = Pixelify_Sans({
    weight: ['400'],
    subsets: ['latin'],
    display: 'swap',
})

export default function HomePage() {
    const [isHovered, setIsHovered] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
    const router = useRouter()

    const handleSignOutPopup = () => {
        setIsPopupOpen(false);
        localStorage.removeItem('token');
        router.push('/')
    };

    return (
        <>
            <div className={`flex flex-col bg-[#1C0043] min-h-screen items-center justify-center text-white ${customFont.className}`}>
                <div className="absolute top-6 right-10">
                    <div className="flex flex-row items-center cursor-pointer"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onClick={() => setIsPopupOpen(true)}
                    >
                        <Image
                            height={24}
                            width={24}
                            priority
                            src={isHovered ? LogoutWhite : Logout}
                            alt="logout"
                        />
                        <div className={`ml-2 text-2xl text-[#9177B7] hover:text-white ${isHovered ? 'text-white' : 'text-[#9177B7]'}`}>Keluar</div>
                    </div>
                </div>
                <h1 className="text-8xl font-bold tracking-widest">Awas Judol!</h1>
                <div className="absolute flex justify-between items-center px-4 w-full max-w-screen-lg mx-auto mt-[50vh]">
                    <Link href="/level" className="flex flex-col text-center cursor-pointer">
                        <p className="text-3xl">Permainan</p>
                        <p className="text-xl text-[#9177B7]">Explore The Story</p>
                    </Link>
                    <Link href="/chatbot" className="flex flex-col text-center cursor-pointer">
                        <p className="text-3xl">Chatbot</p>
                        <p className="text-xl text-[#9177B7]">Tanya AI</p>
                    </Link>
                    <Link href="/about" className="flex flex-col text-center cursor-pointer">
                        <p className="text-3xl">About Us</p>
                        <p className="text-xl text-[#9177B7]">Get to know us</p>
                    </Link>
                </div>
                <Popup
                    isOpen={isPopupOpen}
                    onClose={() => setIsPopupOpen(false)}
                    onConfirm={handleSignOutPopup}
                />
            </div>
        </>
    )
}