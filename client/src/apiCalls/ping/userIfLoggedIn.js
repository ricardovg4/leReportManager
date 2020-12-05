import axios from 'axios';

const userIfLoggedIn = async () => {
    try {
        const res = await axios.get('http://localhost:5000/api/ping', {
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
