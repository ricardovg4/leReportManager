import axios from 'axios';
import baseUrl from '../baseUrl';

async function getReportRowById(username, id) {
    try {
        const res = await axios.get(`${baseUrl}/api/reportrow/${username}/${id}`, {
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
}

export default getReportRowById;
