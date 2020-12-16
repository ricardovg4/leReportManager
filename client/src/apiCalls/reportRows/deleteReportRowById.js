import axios from 'axios';

async function getReportRowById(id) {
    try {
        const res = await axios.delete(`http://localhost:5000/api/reportrow/${id}`, {
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
