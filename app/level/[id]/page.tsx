'use client'

import React, { useEffect, useState } from 'react';
import DialogueBox from '@/components/new/message';
import Ardhi from '../../../public/npc-ardhi.png'
import Raka from '../../../public/npc-raka.png'
import Nindy from '../../../public/npc-nindy.png'
import QuizQuestion from '@/components/new/quiz-message';
import BgClassroom from '../../../public/backgrounds/bg-narasi-classroom.png'
import { StaticImageData } from 'next/image';
import { useRouter } from 'next/navigation';
import { fetchNextLevel } from './action';

type QuizQuestionType = {
    id: string;
    question: string;
    level: number,
    option_1: string,
    option_2: string,
    option_3: string,
    option_4: string,
    correct_answer: string;
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
    const router = useRouter();
    const [showDialogue, setShowDialogue] = useState(true);
    const [showQuiz, setShowQuiz] = useState(false);
    const [currentDialogueSet, setCurrentDialogueSet] = useState<keyof DialogueSets>('initial');
    const [quizQuestion, setQuizQuestion] = useState<QuizQuestionType | null>(null);

    useEffect(() => {
        setShowDialogue(true);
        setShowQuiz(false);
    }, []);

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
                name: "Nindy",
                image: Nindy,
                text: "Kurang tepat, nih...",
                bg: BgClassroom,
            }
        ],
        correct: [
            {
                name: "Nindy",
                image: Nindy,
                text: "Benar, Ketika bermain game online, kita mengharapkan hiburan atau tantangan, sedangkan dari judi online kita berharap memperoleh keuntungan finansial. ",
                bg: BgClassroom
            },
            {
                name: "Nindy",
                image: Nindy,
                text: "Selain itu, ketika main game online biasa, kita perlu keterampilan dalam bermain, kan? Nah, dalam judi online, kita gak perlu jago, cuma perlu hoki.",
                bg: BgClassroom
            },
            {
                name: "Ardhi",
                image: Ardhi,
                text: "Bukannya malah bagus, ya, kalo gitu kita jadi gampang dapet uang dong!",
                bg: BgClassroom
            },
            {
                name: "Nindy",
                image: Nindy,
                text: "Enggak gitu juga, Dhi. Kalo di judi online, pemain wajib pasang taruhan. Kata ayahku, kita bisa rugi hingga miliaran, tauu.",
                bg: BgClassroom
            },
            {
                name: "Ardhi",
                image: Ardhi,
                text: "Waduh",
                bg: BgClassroom
            },
        ]
    };

    useEffect(() => {
        const fetchQuizQuestion = async () => {
            try {
                const token = localStorage.getItem('token');

                if (!token) {
                    throw new Error('No token found');
                }

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/questions?lv=1`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
                const data = await response.json();
                setQuizQuestion(data.data);
            } catch (error) {
                console.error('Error fetching quiz question:', error);
            }
        };

        fetchQuizQuestion();
    }, []);

    const handleDialogueEnd = () => {

        if (currentDialogueSet === 'initial' || currentDialogueSet === 'tryAgain') {
            setShowQuiz(true);
            setShowDialogue(false);
        } else if (currentDialogueSet === 'correct') {
            // Handle what happens after showing the correct dialogue
            // Example: Move to the next question, or show a completion message, etc.
            setShowQuiz(false); // Assuming you might want to hide the quiz here
            setShowDialogue(false); // Assuming you might want to hide the dialogue here

            fetchNextLevel(quizQuestion!.id)
            router.push('/level')
        }
    };

    const handleQuizAnswer = (selectedAnswer: string) => {
        if (!quizQuestion) return;

        // Mapping the 'correct_answer' letter to the corresponding option
        const correctAnswer = [
            quizQuestion.option_1,
            quizQuestion.option_2,
            quizQuestion.option_3,
            quizQuestion.option_4
        ].find(option => option.startsWith(quizQuestion.correct_answer + "."));

        console.log("selected: ", selectedAnswer)
        console.log("correct answer: ", correctAnswer)
        if (selectedAnswer === correctAnswer) {
            setCurrentDialogueSet('correct');
        } else {
            setCurrentDialogueSet('tryAgain');
        }

        setShowDialogue(true);
        setShowQuiz(false);
    };

    return (
        <div className="game-container">
            {showDialogue && (
                <DialogueBox
                    dialogues={dialogueSets[currentDialogueSet]}
                    onDialogueEnd={handleDialogueEnd}
                />
            )}
            {showQuiz && quizQuestion && (
                <QuizQuestion
                    question={quizQuestion.question}
                    options={[
                        quizQuestion.option_1,
                        quizQuestion.option_2,
                        quizQuestion.option_3,
                        quizQuestion.option_4,
                    ]}
                    onAnswer={handleQuizAnswer}
                    characterImage={Nindy}
                    characterName="Nindy"
                    characterMessage="Gimana menurutmu"
                />
            )}
        </div>
    );
}