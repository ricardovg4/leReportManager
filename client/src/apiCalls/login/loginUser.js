import axios from 'axios';
import baseUrl from '../baseUrl';

async function loginUser(email, password) {
    try {
        const res = await axios.post(
            `${baseUrl}/login`,
            {
                email: email,
                password: password
            },
            {
                withCredentials: true
            }
        );
        const data = res.data;
        return data;
    } catch (error) {
        if (error.response) {
            console.log(error.response.data); // => the response payload
        }
        return false;
    }
}

export default loginUser;
