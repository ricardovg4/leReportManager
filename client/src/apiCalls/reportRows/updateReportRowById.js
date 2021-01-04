import axios from 'axios';
import baseUrl from '../baseUrl';

async function updateReportRowById(username, id, rowData) {
    try {
        const res = await axios.put(
            `${baseUrl}/api/reportrow/${username}/${id}`,
            rowData,
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

export default updateReportRowById;
