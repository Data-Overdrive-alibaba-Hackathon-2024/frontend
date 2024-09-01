import React, { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { Pixelify_Sans } from 'next/font/google';

type QuizQuestionProps = {
    question: string;
    options: string[];
    onAnswer: (answer: string) => void;
    characterImage: StaticImageData;
    characterName: string;
    characterMessage: string
};

const customFont = Pixelify_Sans({
    weight: ['400'],
    subsets: ['latin'],
    display: 'swap',
})

const QuizQuestion: React.FC<QuizQuestionProps> = ({ question, options, onAnswer, characterImage, characterName, characterMessage }) => {
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

    const handleAnswer = async (answer: string) => {
        setSelectedAnswer(answer);
        await onAnswer(answer);
    };

    return (
        <>
            <div className={`bg-[#2E2043] min-h-screen p-24 ${customFont.className}`}>
                <div className="mb-4 text-[#BFB8CA] text-3xl">{question}</div>
                <div className="grid grid-cols-2 gap-7 gap-x-12 mt-8">
                    {options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleAnswer(option)}
                            className={`bg-[#BFB8CA] hover:bg-[#D3CFD9] text-white font-bold py-6 px-4 rounded ${selectedAnswer === option ? 'ring-2 ring-white' : ''
                                }`}
                        >
                            <p className="text-[#2E2043] text-2xl">{option}</p>
                        </button>
                    ))}
                </div>
            </div>

            <div className={`fixed bottom-0 left-0 right-0 bg-[#230D43] m-9 text-white rounded-sm ${customFont.className}`}>
                <div className="flex items-start">
                    <div className="flex flex-col w-[32vh] justify-center items-center bg-[#1C0043]">
                        <div className="w-44 h-44 mr-4 relative">
                            <Image
                                src={characterImage}
                                alt="Character"
                                layout="fill"
                                objectFit="cover"
                                className="rounded-full"
                            />
                        </div>
                        <p className="text-2xl text-center mb-1">{characterName}</p>
                    </div>

                    <div className="flex-1 p-4">
                        <p className="text-2xl mb-4">{characterMessage}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default QuizQuestion;