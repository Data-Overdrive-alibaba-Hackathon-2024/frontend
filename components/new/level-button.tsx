import { useRouter } from 'next/navigation';

export default function LevelButtons({ totalLevels, unlockedLevels }: { totalLevels: number, unlockedLevels: number }) {
    const router = useRouter();

    const handleLevelClick = (level: number) => {
        if (level <= unlockedLevels) {
            router.push(`/level/${level}`);
        }
    };

    return (
        <div className="mt-12 grid grid-cols-5 gap-y-12 gap-x-32">
            {Array.from({ length: totalLevels }, (_, i) => (
                <button
                    key={i}
                    className={`w-28 h-28 text-5xl bg-white text-[#9177B7] rounded-md flex items-center justify-center ${i + 1 <= unlockedLevels ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}
                    onClick={() => handleLevelClick(i + 1)}
                >
                    {i + 1}
                </button>
            ))}
        </div>
    );
}
