'use client'

import Image from "next/image";
import Back from '../../public/back.svg'
import BackWhite from '../../public/back-white.svg'
import { useState } from "react";
import { useRouter } from "next/navigation";

export function ChatbotHeader() {
    const [isHovered, setIsHovered] = useState(false);
    const router = useRouter()

    return (
        <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b shrink-0 bg-[#190B2D]">
            <div className="ml-3 cursor-pointer transition duration-300"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={router.back}
            >
                <Image
                    height={20}
                    width={20}
                    priority
                    src={isHovered ? BackWhite : Back}
                    alt="back icon"
                />
            </div>
        </header>
    )
}