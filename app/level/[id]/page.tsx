'use client'

import React, { useEffect, useState } from 'react';
import DialogueBox from '@/components/new/message';
import Ardhi from '../../../public/npc-ardhi.png'
import Raka from '../../../public/npc-raka.png'
import Raka2 from '../../../public/npc-raka2.png'
import Nindy from '../../../public/npc-nindy.png'
import Kakak from '../../../public/npc-kakak.png'
import QuizQuestion from '@/components/new/quiz-message';
import BgClassroom from '../../../public/backgrounds/bg-narasi-classroom.png'
import BgNarasiUjan from '../../../public/backgrounds/bg-narasiujan.png'
import { StaticImageData } from 'next/image';
import { useParams, useRouter } from 'next/navigation';
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
    const params = useParams();
    const id = Array.isArray(params.id) ? parseInt(params.id[0], 10) : parseInt(params.id, 10);

    const router = useRouter();
    const [showDialogue, setShowDialogue] = useState(true);
    const [showQuiz, setShowQuiz] = useState(false);
    const [currentDialogueSet, setCurrentDialogueSet] = useState<keyof DialogueSets>('initial');
    const [quizQuestion, setQuizQuestion] = useState<QuizQuestionType | null>(null);

    useEffect(() => {
        setShowDialogue(true);
        setShowQuiz(false);
    }, []);

    const dialogueSets: { [key: number]: DialogueSets } = {
        1: {
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
        },
        2: {
            initial: [
                {
                    name: "Raka",
                    image: Raka,
                    text: "Nin, tadi kata kamu main judi online gak harus jago kan ya?",
                    bg: BgClassroom,
                },
                {
                    name: "Nindy",
                    image: Nindy,
                    text: "Iyaa...",
                    bg: BgClassroom,
                },
                {
                    name: "Nindy",
                    image: Nindy,
                    text: "Eh, emang kenapa Rak kok nanya itu? Jangan coba-coba loh ya! Kita masih kecil.",
                    bg: BgClassroom,
                },
                {
                    name: "Ardhi",
                    image: Ardhi,
                    text: "Berarti kalo udah besar nanti boleh?",
                    bg: BgClassroom,
                },
                {
                    name: "Nindy",
                    image: Nindy,
                    text: "Sama aja gak boleh, sih…",
                    bg: BgClassroom,
                },
                {
                    name: "Raka",
                    image: Raka,
                    text: "Nin, kenapa semakin sering seseorang main judi online gak bikin dia makin besar kesempatan menangnya?",
                    bg: BgClassroom,
                },
                {
                    name: "Nindy",
                    image: Nindy,
                    text: "Kok kamu penasaran banget?",
                    bg: BgClassroom,
                },
                {
                    name: "Raka",
                    image: Raka,
                    text: "Menarik aja sih menurutku.",
                    bg: BgClassroom,
                },
                {
                    name: "Nindy",
                    image: Nindy,
                    text: "Oke! Sebelum aku jawab, coba kamu tebak dulu dari pilihan yang kukasih, kenapa kemenangan bagi orang yang bermain judi online itu gak pernah pasti.",
                    bg: BgClassroom,
                },
            ],
            correct: [
                {
                    name: "Nindy",
                    image: Nindy,
                    text: "Benar, judi itu tentang peluang. Misalnya nih, ramalan cuaca mengatakan kemungkinan cuaca besok cerah adalah 50%, artinya ada peluang 50% kalau besok bakal hujan. Semakin besar angka persentasenya,  maka semakin mungkin hal tersebut kejadian.",
                    bg: BgClassroom,
                },
                {
                    name: "Nindy",
                    image: Nindy,
                    text: "Berlaku juga sama judi. Bedanya, karena bandar judi itu butuh keuntungan dan gak mungkin dia mau ambil keuntungan yang kecil-kecil aja, maka peluang seseorang untuk menang dibuat semakin kecil.",
                    bg: BgClassroom,
                }, {
                    name: "Nindy",
                    image: Nindy,
                    text: "Logikanya, kalau bandar dan pemenang bisa dapet keuntungan yang besar, berarti harus ada yang dikorbankan, kan? Nah, peluang menang untuk penjudi lain itulah yang dikurangi, jadi kesempatan untuk menang itu keciiiiil banget.",
                    bg: BgClassroom,
                }, {
                    name: "Raka",
                    image: Raka,
                    text: "Ooh gitu?",
                    bg: BgClassroom,
                }, {
                    name: "Nindy",
                    image: Nindy,
                    text: "Yup! Nah kalo udah cukup paham, jangan coba-coba deh pokoknya. Aku laper, mau ke kantin dulu, nanti tanya lanjut aja ke emak bapakmu Rak kalo masih penasaran.",
                    bg: BgClassroom,
                },
            ],
            tryAgain: [
                {
                    name: "Nindy",
                    image: Nindy,
                    text: "Coba lagi",
                    bg: BgClassroom,
                },
            ],
        },
        3: {
            initial: [
                {
                    text: "Malam hari di pinggiran kota, mulai turun gerimis rintik-rintik. Akhir-akhir ini langit cukup sering memuntahkan isinya.",
                    bg: BgNarasiUjan,
                },
                {
                    text: "Mungkin ia kecewa melihat carut-marut kota sibuk ini?",
                    bg: BgNarasiUjan,
                },
                {
                    text: "Atau… ia memang tahu saja bahwa orang-orang yang ia naungi butuh penyegaran setelah seharian lelah bekerja.",
                    bg: BgNarasiUjan,
                },
                {
                    text: "Waktu yang tepat untuk berkumpul sambil menyantap makan malam yang hangat di meja.",
                    bg: BgNarasiUjan,
                },
                {
                    name: "Raka",
                    image: Raka,
                    text: "Kak, kamu pernah main judi online?",
                    bg: BgNarasiUjan,
                },
                {
                    name: "Kakak",
                    image: Kakak,
                    text: "Ya enggak lah! Dosa tau taruhan begitu. Emang kenapa?",
                    bg: BgNarasiUjan,
                },
                {
                    name: "Raka",
                    image: Raka,
                    text: "Kalo yang ngadain judi online itu… gimana mereka bisa dapet untung sih kak? Kata temen kelasku, mereka main peluang gitu, ya?",
                    bg: BgNarasiUjan,
                },
                {
                    name: "Kakak",
                    image: Kakak,
                    text: "Betul! Secara sederhana, judi online itu mirip-mirip permainan mesin capit. Kamu tau kan, mesin yang biasa ada di arkade? Isinya hadiah, bisa berupa boneka sampai barang berharga.",
                    bg: BgNarasiUjan,
                },
                {
                    name: "Kakak",
                    image: Kakak,
                    text: "Mesin arkade itu diatur agar hanya membayar hadiah setelah sejumlah permainan tertentu telah dimainkan. Kadang memang ada orang yang beruntung, tapi coba kamu hitung berapa perbandingan orang yang dapat hadiah dibanding yang nggak dapat, deh.",
                    bg: BgNarasiUjan,
                },
                {
                    name: "Kakak",
                    image: Kakak,
                    text: "Berdasarkan penjelasan aku tadi, kamu bisa simpulin gak kira-kira gimana taktik judi online supaya dapat keuntungan?",
                    bg: BgNarasiUjan,
                },
            ],
            correct: [
                {
                    name: "Kakak",
                    image: Kakak,
                    text: "Benar, kamu tuh pinter, Rak. Aku percaya kok kamu bisa memperkirakan mana yang baik dan enggak buat kamu",
                    bg: BgNarasiUjan,
                },
            ],
            tryAgain: [
                {
                    name: "Kakak",
                    image: Kakak,
                    text: "Kurang tepat nih, coba lagi.",
                    bg: BgNarasiUjan,
                },
            ],
        },
        4: {
            initial: [
                {
                    name: "Kakak",
                    image: Kakak,
                    text: "Ngomong-ngomong, Rak, kamu tahu gak gimana seseorang bisa kena jerat judi online?",
                    bg: BgNarasiUjan,
                },
                {
                    name: "Kakak",
                    image: Kakak,
                    text: "Awalnya bisa jadi coba-coba, Rak. Kayak nyari peruntungan gitu. Bisa juga lagi iseng berselancar di internet, terus ketemu tautan link yang tanpa ia sadari merujuk ke situs bermain judi.",
                    bg: BgNarasiUjan,
                },
                {
                    name: "Kakak",
                    image: Kakak,
                    text: "Banyak cara untuk menipu orang awam supaya masuk ke lingkaran bisnis judi, Rak. Sekalinya masuk bakal susah keluar lagi. Makanya, kita sebagai masyarakat sebisa mungkin mengedukasi diri sendiri dan orang lain tentang hal ini.",
                    bg: BgNarasiUjan,
                },
                {
                    name: "Kakak",
                    image: Kakak,
                    text: "Kamu tahu gak, situs kayak apa yang harus sebisa mungkin kamu hindari?",
                    bg: BgNarasiUjan,
                },
            ],
            correct: [
                {
                    name: "Kakak",
                    image: Kakak,
                    text: "Sebetulnya, banyak kok ciri-ciri situs yang mengindikasikan kalau ia berbahaya. Contohnya, situs yang memasang banyak iklan tentang bonus yang menggiurkan, banyak pop-up, tampilannya tidak konsisten, bahkan yang paling berbahaya adalah kalau situs tersebut sudah minta data-data pribadi kamu.",
                    bg: BgNarasiUjan,
                },
                {
                    name: "Raka",
                    image: Raka,
                    text: "Tapi Kak, kan banyak juga situs legal yang meminta kita memasukkan data diri kita?",
                    bg: BgNarasiUjan,
                },
                {
                    name: "Kakak",
                    image: Kakak,
                    text: "Yap. Tetap aja, kamu harus hati-hati dengan situs yang meminta data pribadimu. Kalau ragu, saranku selalu pastikan dulu ke relasimu apakah situs tersebut aman atau tidak.",
                    bg: BgNarasiUjan,
                },
            ],
            tryAgain: [
                {
                    name: "Kakak",
                    image: Kakak,
                    text: "Kurang tepat, coba lagi",
                    bg: BgNarasiUjan,
                },
            ],
        },
        5: {
            initial: [
                {
                    name: "Kakak",
                    image: Kakak,
                    text: "Kamu tahu gak, situs kayak apa yang harus sebisa mungkin kamu hindari?",
                    bg: BgNarasiUjan,
                },
                {
                    name: "Kakak",
                    image: Kakak,
                    text: "Kamu tahu gak, situs kayak apa yang harus sebisa mungkin kamu hindari?",
                    bg: BgNarasiUjan,
                },
                {
                    name: "Kakak",
                    image: Kakak,
                    text: "Kamu tahu gak, situs kayak apa yang harus sebisa mungkin kamu hindari?",
                    bg: BgNarasiUjan,
                },
                {
                    name: "Kakak",
                    image: Kakak,
                    text: "Kamu tahu gak, situs kayak apa yang harus sebisa mungkin kamu hindari?",
                    bg: BgNarasiUjan,
                },
            ],
            correct: [
                {
                    name: "Kakak",
                    image: Kakak,
                    text: "Benar, pelaku judi online bisa dikenakan pidana penjara hingga bertahun-tahun serta denda yang cukup besar. Penyitaan aset serta peringatan atau pembatasan akses juga bisa saja terjadi, sih. Pokoknya tergantung keputusan pengadilan.",
                    bg: BgNarasiUjan,
                },
            ],
            tryAgain: [
                {
                    name: "Kakak",
                    image: Kakak,
                    text: "Kurang tepat, coba lagi",
                    bg: BgNarasiUjan,
                },
            ],
        },
        6: {
            initial: [/* Array of dialogue objects for level 2 */],
            correct: [/* Array of correct dialogue objects for level 2 */],
            tryAgain: [/* Array of try-again dialogue objects for level 2 */],
        },
        7: {
            initial: [/* Array of dialogue objects for level 2 */],
            correct: [/* Array of correct dialogue objects for level 2 */],
            tryAgain: [/* Array of try-again dialogue objects for level 2 */],
        },
        8: {
            initial: [/* Array of dialogue objects for level 2 */],
            correct: [/* Array of correct dialogue objects for level 2 */],
            tryAgain: [/* Array of try-again dialogue objects for level 2 */],
        },
        9: {
            initial: [/* Array of dialogue objects for level 2 */],
            correct: [/* Array of correct dialogue objects for level 2 */],
            tryAgain: [/* Array of try-again dialogue objects for level 2 */],
        },
        10: {
            initial: [/* Array of dialogue objects for level 2 */],
            correct: [/* Array of correct dialogue objects for level 2 */],
            tryAgain: [/* Array of try-again dialogue objects for level 2 */],
        },
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

    // const dialogues = dialogueSets[id] ? dialogueSets[id][currentDialogueSet] : [];
    const dialogues = Number.isInteger(id) && dialogueSets[id]
        ? dialogueSets[id][currentDialogueSet]
        : [];

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
                    dialogues={dialogues}
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