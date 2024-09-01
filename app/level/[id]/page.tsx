'use client'

import React, { useEffect, useState } from 'react';
import DialogueBox from '@/components/new/message';
import Ardhi from '../../../public/npc-ardhi.png'
import Raka from '../../../public/npc-raka.png'
import Nindy from '../../../public/npc-nindy.png'
import QuizQuestion from '@/components/new/quiz-message';
import BgClassroom from '../../../public/backgrounds/bg-narasi-classroom.png'
import { StaticImageData } from 'next/image';

type QuizQuestionType = {
    question: string;
    options: string[];
    correctAnswer: string;
};

type DialogueSet = {
    name?: string;
    image?: StaticImageData;
    bg?: StaticImageData;
    text: string;
}

type DialogueSets = {
    initial: DialogueSet[];
    tryAgain: DialogueSet[];
    correct: DialogueSet[];
}

export default function GamePage() {
    const [showDialogue, setShowDialogue] = useState(true);
    const [showQuiz, setShowQuiz] = useState(false);
    const [currentDialogueSet, setCurrentDialogueSet] = useState<keyof DialogueSets>('initial');
    const [quizQuestion, setQuizQuestion] = useState<QuizQuestionType | null>(null);

    const dialogueSets: DialogueSets = {
        initial: [
            {
                text: "Kabupaten B, 2024. Daerah yang cukup ramai sebagai sentra pemerintahan daerah. ",
                bg: BgClassroom,
            },
            {
                text: "Tempat mimpi-mimpi diterbangkan setiap pagi dan diistirahatkan ketika mentari tenggelam. ",
                bg: BgClassroom,
            },
            {
                text: "Terlihat kaki-kaki yang melangkah dengan semangat memenuhi jalanan dan angkutan perkotaan pagi itu.",
                bg: BgClassroom,
            },
            {
                text: "Di antaranya, seragam-seragam putih merah, putih biru, dan putih abu berbaur dengan keramaian. Seragam yang menandakan sebuah mimpi besar dari perjalanan panjang akan dimulai.",
                bg: BgClassroom,
            },
            {
                text: "Begitu pun yang terjadi di ruang kelas sebuah sekolah menengah pertama.",
                bg: BgClassroom,
            },
            {
                text: "Pagi itu, ruang kelas ramai dengan bisik-bisik kecil. Sementara, seorang siswa dengan wajah cerah melangkahkan kaki, masuk ke kelas tempat ia singgah sehari-hari.",
                bg: BgClassroom,
            },
            {
                name: "Raka",
                image: Raka,
                text: "Lagi pada gosipin apa sih?",
                bg: BgClassroom,
            },
            {
                name: "Ardhi",
                image: Ardhi,
                text: "Rumahnya Tobi kemarin malam kedatangan polisi, Rak!",
                bg: BgClassroom,
            },
            {
                name: "Raka",
                image: Raka,
                text: "Kok bisa?",
                bg: BgClassroom,
            },
            {
                name: "Ardhi",
                image: Ardhi,
                text: "Katanya Ayahnya Tobi dicurigain main judi online.",
                bg: BgClassroom,
            },
            {
                name: "Raka",
                image: Raka,
                text: "Apaan tuh judi online?",
                bg: BgClassroom,
            },
            {
                name: "Ardhi",
                image: Ardhi,
                text: "Hmm, main game online mungkin? Kayak kita pas main mobile legends.",
                bg: BgClassroom,
            },
            {
                name: "Raka",
                image: Raka,
                text: "Masa sih? Berarti kita bisa ditangkep juga dong kalo gitu?",
                bg: BgClassroom,
            },
            {
                name: "Ardhi",
                image: Ardhi,
                text: "Tanya Nindy aja deh! Kayaknya dia lebih tau. Orang tua dia kan kerja di bidang hukum.",
                bg: BgClassroom,
            },
            {
                name: "Nindy",
                image: Nindy,
                text: "Apaan nih nyebut-nyebut nama aku?",
                bg: BgClassroom,
            },
            {
                name: "Ardhi",
                image: Ardhi,
                text: "Eh Nin, si Raka nanya, emang bedanya judi online sama game online yang biasa kita mainin tuh apa sih?",
                bg: BgClassroom,
            },
            {
                name: "Nindy",
                image: Nindy,
                text: "Oalaah, pertanyaan bagus! Aku kasih petunjuk nih yaa.",
                bg: BgClassroom,
            },
        ],
        tryAgain: [
            {
                text: "The adventurer ponders for a moment, realizing the answer might not be correct..."
            },
            {
                name: "Village Elder",
                image: Nindy,
                text: "That's not quite right. Try again!"
            }
        ],
        correct: [
            {
                name: "Village Elder",
                image: Nindy,
                text: "Excellent! You've understood the situation correctly."
            }
        ]
    };

    // const quizQuestion = {
    //     question: "Misalnya, kamu melihat iklan judi online yang menjanjikan hadiah besar dengan taruhan kecil. Apa yang sebaiknya dipahami tentang tawaran ini?",
    //     options: [
    //         "Semua orang bisa menang besar.",
    //         "Iklan ini pasti benar.",
    //         "Kemenangan besar jarang terjadi dan lebih banyak yang kalah.",
    //         "El panadero con el pan"
    //     ],
    //     correctAnswer: "Kemenangan besar jarang terjadi dan lebih banyak yang kalah."
    // };

    useEffect(() => {
        // Fetch quiz question from API
        const fetchQuizQuestion = async () => {
            try {
                const response = await fetch('https://your-api-endpoint.com/get-quiz-question');
                const data = await response.json();
                setQuizQuestion(data);
            } catch (error) {
                console.error('Error fetching quiz question:', error);
            }
        };

        fetchQuizQuestion();
    }, []);

    const handleDialogueEnd = () => {
        setShowDialogue(false);
        setShowQuiz(true);
    };

    const handleQuizAnswer = (answer: string) => {
        if (quizQuestion && answer === quizQuestion.correctAnswer) {
            setShowQuiz(false);
            setCurrentDialogueSet('correct');
            setShowDialogue(true);
        } else {
            setShowQuiz(false);
            setCurrentDialogueSet('tryAgain');
            setShowDialogue(true);
        }
    };

    return (
        <div className="game-container">
            {/* Your game content goes here */}
            {showDialogue && (
                <DialogueBox
                    dialogues={dialogueSets[currentDialogueSet]}
                    onDialogueEnd={currentDialogueSet === 'initial' ? handleDialogueEnd : () => setShowQuiz(true)}
                />
            )}
            {showQuiz && quizQuestion && (
                <QuizQuestion
                    question={quizQuestion.question}
                    options={quizQuestion.options}
                    onAnswer={handleQuizAnswer}
                    characterImage={Nindy}
                    characterName="Nindy"
                    characterMessage="Gimana menurutmu"
                />
            )}
        </div>
    );
}