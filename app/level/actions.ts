// actions.ts
const API_URL = 'https://your-api-url.com/api/levels';

// Function to fetch unlocked levels from the API
export async function fetchUnlockedLevels(userId: string) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_id: userId })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data.unlockedLevels;
    } catch (error) {
        console.error('Failed to fetch unlocked levels:', error);
        throw error;
    }
};