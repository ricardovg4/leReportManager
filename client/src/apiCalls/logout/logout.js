import axios from 'axios';

async function logout(email, password) {
    try {
        const res = await axios.get('http://localhost:5000/logout', {
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
