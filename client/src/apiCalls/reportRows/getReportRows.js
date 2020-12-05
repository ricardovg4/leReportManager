import axios from 'axios';

async function getReportRows() {
    try {
        const res = await axios.get('http://localhost:5000/api/reportrow', {
            withCredentials: true
        });
        const data = await res.data;
        return data;
    } catch (error) {
        if (error.response) {
            console.log(error.response.data); // => the response payload
        }
        return false;
    }
}

export default getReportRows;
