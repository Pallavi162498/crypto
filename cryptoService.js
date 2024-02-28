import axios from 'axios';

const baseURL = 'https://api.coingecko.com/api/v3';

export const getBitcoinPrice = async () => {
    try {
        const response = await axios.get(`${baseURL}/simple/price`, {
            params: {
                ids: 'bitcoin',
                vs_currencies: 'inr,usd',
                include_24hr_change: true,
            },
        });

        return response.data.bitcoin;
    } catch (error) {
        console.error('Error fetching Bitcoin price:', error);
        throw error;
    }
};

export const getTrendingCoins = async () => {
    try {
        const response = await axios.get(`${baseURL}/search/trending`);
        return response.data.coins.slice(0, 3);
    } catch (error) {
        console.error('Error fetching trending coins:', error);
        throw error;
    }
};

