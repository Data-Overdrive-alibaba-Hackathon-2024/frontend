'use client'

import Image, { StaticImageData } from "next/image"
import Ariq from '../../public/npc-ardhi.png'
import Isti from '../../public/npc-nindy.png'
import Gema from '../../public/npc-raka2.png'
import { Pixelify_Sans } from "next/font/google"
import IconAbout from "../../public/icon-about.svg"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Back from '../../public/back.svg'
import BackWhite from '../../public/back-white.svg'

const customFont = Pixelify_Sans({
    weight: ['400'],
    subsets: ['latin'],
    display: 'swap',
})

export default function AboutPage() {
    const router = useRouter()
    const [isHovered, setIsHovered] = useState(false);

    return (
        <>
            <div className='absolute top-6 left-5'>
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
            </div>
            <div className={`bg-[#1C0043] min-h-screen text-white ${customFont.className}`}>
                <div className="flex items-center justify-center mt-12">
                    <Image
                        src={IconAbout}
                        width={16}
                        height={16}
                        alt="icon"
                    />
                    <p className="ml-4 text-3xl text-center">About Us</p>
                    <Image
                        src={IconAbout}
                        width={16}
                        height={16}
                        alt="icon"
                        className="ml-5"
                    />
                </div>
                <div className="grid grid-cols-3 gap-4 p-4">
                    <TeamMember imageSrc={Ariq} name="Ariq" role="Fullstack Developer" description="Hustler" />
                    <TeamMember imageSrc={Isti} name="Isti" role="Fullstack Designer" description="Hipster" />
                    <TeamMember imageSrc={Gema} name="Gema" role="Backend Developer" description="Hacker" />
                </div>
                <Section title="About Our App">
                    <p>Awus Jodol! is an educational web-based game about online gambling that consists of gamification learning contents and AI Chatbot to raise awareness about the danger of online gambling.</p>
                </Section>
                <Section title="Behind the Prompt">
                    <p>You may see that the questions are different for each account because we use generative AI to create those questions. Important to note, we use System Message contract in Model Studio so that the output is always in JSON format and then we inject the AI's response into our database. Here's the secret prompt on each level:</p>
                    <ol>
                        <li>1. Imagine you are a high school teacher that teaches about norms about definition of antique gambling and answer questions.</li>
                        <li>2. The topic is why the more often we do online gambling, the probability of us winning doesn&apos;t increase.</li>
                        <li>3. The topic is what scheme or trick that is used by online gambling sites so they can get profit from their business.</li>
                        <li>4. Give me four descriptions of different sites with different features, the user must choose which site they should most likely avoid.                    </li>
                        <li>5. The topic is what kind of penalty/sentence the online gambling perpetrators will get.</li>
                        <li>6. The topic of the question is what should you do and how to deal with people who are addicted or are trying to participate in online gambling?</li>
                        <li>7. The topic of the question is the risk of personal data use in online gambling sites.</li>
                        <li>8. The topic of the question is how online gambling sites are likely to use your data.</li>
                        <li>9. The topic of the question is the risk of using unverified payment methods on online gambling sites.</li>
                        <li>10. Provide four options, all of them are in form of hypotheses. Players must guess which hypothesis is not the reason why online gambling is hard to eradicate, even by the government.</li>
                    </ol>
                </Section>
                <div className="mb-12">
                    <Section title="Tech Stack">
                        <ul>
                            <TechStackItem name="Next.js" />
                            <TechStackItem name="Golang" />
                            <TechStackItem name="PostgreSQL (deployed on AsparaDB RDS for PostgreSQL)" />
                            <TechStackItem name="Qwen-Plus as GenAI (deployed using Alibaba Cloud Model Studio)" />
                        </ul>
                    </Section>
                </div>
            </div>
        </>
    )
}

interface TeamMemberProps {
    imageSrc: StaticImageData;
    name: string;
    role: string;
    description: string;
}

interface SectionProps {
    title: string;
    children: React.ReactNode;
}

interface TechStackItemProps {
    name: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({ imageSrc, name, role, description }) => (
    <div className="text-center p-4">
        <Image src={imageSrc} alt={name} className="w-24 h-24 rounded-full mx-auto" />
        <h3 className="text-lg font-bold mt-2">{name}</h3>
        <p className="text-md font-semibold">{role}</p>
        <p className="text-sm mt-1">{description}</p>
    </div>
);

const Section: React.FC<SectionProps> = ({ title, children }) => (
    <div className="p-4">
        <h2 className="text-3xl font-bold mb-2 flex items-center justify-center mt-4">{title}</h2>
        <div className="px-10 text-lg">{children}</div>
    </div>
);

const TechStackItem: React.FC<TechStackItemProps> = ({ name }) => (
    <li className="text-md">{name}</li>
);