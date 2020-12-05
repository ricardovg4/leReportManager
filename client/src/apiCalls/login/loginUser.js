import axios from 'axios';

async function loginUser(email, password) {
    try {
        const res = await axios.post(
            'http://localhost:5000/login',
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
