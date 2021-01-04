import axios from 'axios';
import baseUrl from '../baseUrl';

async function logout(email, password) {
    try {
        const res = await axios.get(`${baseUrl}/logout`, {
            withCredentials: true
        });
        const data = res.data;
        return data;
    } catch (error) {
        if (error.response) {
            console.log(error.response.data); // => the response payload
        }
        return false;
    }
}

export default logout;
