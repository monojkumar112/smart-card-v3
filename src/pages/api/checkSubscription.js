import axios from 'axios';
const baseuri = process.env.NEXT_PUBLIC_BACKEND_URL

const checkSubscription = async (userId) => {
    try {
        const response = await axios.post(`${baseuri}/api/check-subscription`, { user_id: userId });
        return response.data.subscribed;
    } catch (error) {
        console.error('Error checking subscription:', error);
        return false;
    }
};

export default checkSubscription;
