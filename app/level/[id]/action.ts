export const fetchNextLevel = async (questionId: string) => {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('No token found');
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/questions/done/:${questionId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        const data = await response.json();
        console.log("berhasil mark complete level", data.message)
    } catch (error) {
        console.error('Error fetching quiz question:', error);
    }
};