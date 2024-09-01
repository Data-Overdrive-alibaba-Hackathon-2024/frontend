'use client'
import { useState, useEffect } from 'react';
import { Pixelify_Sans } from 'next/font/google';
import Image from 'next/image';
import ResetProgress from '../../public/reset-progress.svg'
import ResetProgressWhite from '../../public/reset-progress-white.svg'
import PopupResetProgress from '@/components/new/popup-reset-progress';
import { useRouter } from 'next/navigation';
import Back from '../../public/back.svg'
import BackWhite from '../../public/back-white.svg'
import LevelButtons from '@/components/new/level-button';

const customFont = Pixelify_Sans({
    weight: ['400'],
    subsets: ['latin'],
    display: 'swap',
})

export default function LevelPage() {
    const router = useRouter()

    const [isHovered, setIsHovered] = useState(false);
    const [isHovered2, setIsHovered2] = useState(false);
    const totalLevels = 10;
    const [unlockedLevels, setUnlockedLevels] = useState<number>(1);
    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

    const handleResetProgressPopup = () => {
        setIsPopupOpen(false);
        resetProgress()
    };

    useEffect(() => {
        const fetchCurrentLevel = async () => {
            try {
                const token = localStorage.getItem('token');

                if (!token) {
                    throw new Error('No token found');
                }

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/profile`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
                const data = await response.json();
                setUnlockedLevels(data.data.current_level)
                console.log("current level yang di fetch: ", data.data.current_level)
            } catch (error) {
                console.error('Error fetching quiz question:', error);
            }
        };

        fetchCurrentLevel();
    }, []);

    const handleLevelClick = (level: number): void => {
        if (level <= unlockedLevels) {
            console.log(`Level ${level} clicked`);
            // Navigate to the level or start the game at this level
        } else {
            console.log("This level is locked.");
        }
    };

    const resetProgress = (): void => {
        setUnlockedLevels(1); // Reset to only the first level unlocked
        console.log("Progress has been reset.");
    };

    return (
        <div className={`bg-[#1C0043] ${customFont.className}`}>
            <div className='items-center justify-center flex flex-col h-screen'>
                <h1 className="absolute top-[16vh] text-white text-4xl">Klik pada level untuk memulai permainan!</h1>
                <div className='absolute top-6 left-5'>
                    <div className="ml-3 cursor-pointer transition duration-300"
                        onMouseEnter={() => setIsHovered2(true)}
                        onMouseLeave={() => setIsHovered2(false)}
                        onClick={router.back}
                    >
                        <Image
                            height={20}
                            width={20}
                            priority
                            src={isHovered2 ? BackWhite : Back}
                            alt="back icon"
                        />
                    </div>

                </div>

                {/* Reset progress button */}
                {/* <div className="absolute top-6 right-6">
                    <div className="flex flex-row items-center cursor-pointer"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onClick={() => setIsPopupOpen(true)}
                    >
                        <Image
                            height={18}
                            width={18}
                            priority
                            src={isHovered ? ResetProgressWhite : ResetProgress}
                            alt="logout"
                        />
                        <div className={`ml-2 text-xl text-[#9177B7] hover:text-white ${isHovered ? 'text-white' : 'text-[#9177B7]'}`}>Reset Progress</div>
                    </div>
                </div> */}
                <LevelButtons totalLevels={totalLevels} unlockedLevels={unlockedLevels} />

            </div>
            <PopupResetProgress
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
                onConfirm={handleResetProgressPopup}
            />
        </div>
    );
};