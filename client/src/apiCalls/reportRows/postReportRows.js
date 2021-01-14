import axios from 'axios';
import baseUrl from '../baseUrl';

async function postReportRows(username, rowData) {
    // console.log(rowData);
    try {
        const res = await axios.post(`${baseUrl}/api/reportrow/${username}`, rowData, {
            withCredentials: true
        });
        const data = await res.data;
        return data;
    } catch (error) {
        if (error.response) {
            console.log(error.response.data);
            // console.log(error.response.status);
        }
        return false;
    }
}

export default postReportRows;
