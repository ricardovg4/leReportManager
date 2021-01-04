import axios from 'axios';
import baseUrl from '../baseUrl';

const userIfLoggedIn = async () => {
    try {
        const res = await axios.get(`${baseUrl}/api/ping`, {
            withCredentials: true
        });
        const data = await res.data;
        return data;
    } catch (error) {
        if (error.response) {
            console.log(error.response.data);
        }
        return false;
    }
};

export default userIfLoggedIn;
