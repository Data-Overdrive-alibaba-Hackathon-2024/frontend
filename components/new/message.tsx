import { Pixelify_Sans } from 'next/font/google';
import Image from 'next/image';
import React, { useState } from 'react';
import IconNext from '../../public/logout.svg'

const customFont = Pixelify_Sans({
    weight: ['400'],
    subsets: ['latin'],
    display: 'swap',
})

const DialogueBox = ({ dialogues, onDialogueEnd }: { dialogues: any[], onDialogueEnd: () => void }) => {
    const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);

    const handleNext = () => {
        if (currentDialogueIndex < dialogues.length - 1) {
            setCurrentDialogueIndex(currentDialogueIndex + 1);
        } else {
            onDialogueEnd && onDialogueEnd();
        }
    };

    const currentDialogue = dialogues[currentDialogueIndex];

    return (
        <>
            <div className='bg-[#2E2043] h-[100vh] w-full relative'>
                <Image
                    src={currentDialogue.bg}
                    alt="background"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                />
            </div>
            <div className={`fixed bottom-0 left-0 right-0 bg-[#230D43] m-9 text-white rounded-sm ${customFont.className}`}>
                <div className="flex items-start cursor-pointer" onClick={handleNext}>
                    {currentDialogue.image && (
                        <div className="flex flex-col w-[32vh] justify-center items-center bg-[#1C0043]">
                            <div className="w-44 h-44 mr-4 relative">
                                <Image
                                    src={currentDialogue.image}
                                    alt={currentDialogue.name || "Character"}
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-full"
                                />
                            </div>
                            {currentDialogue.name && (
                                <p className="text-xl text-center">{currentDialogue.name}</p>
                            )}
                        </div>
                    )}
                    <div className="flex-1 p-6">
                        <p className="text-2xl mb-4">{currentDialogue.text}</p>
                        <div className='absolute right-8 bottom-4'>
                            <Image
                                src={IconNext}
                                width={24}
                                height={24}
                                alt='next icon'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DialogueBox;