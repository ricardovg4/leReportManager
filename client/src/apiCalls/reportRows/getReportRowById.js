import axios from 'axios';

async function getReportRowById(username, id) {
    try {
        const res = await axios.get(
            `http://localhost:5000/api/reportrow/${username}/${id}`,
            {
                withCredentials: true
            }
        );
        const data = await res.data;
        return data;
    } catch (error) {
        if (error.response) {
            console.log(error.response.data);
        }
        return false;
    }
}

export default getReportRowById;
