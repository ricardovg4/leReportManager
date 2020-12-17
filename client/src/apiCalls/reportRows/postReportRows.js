import axios from 'axios';

async function postReportRows(username, rowData) {
    try {
        const res = await axios.post(
            `http://localhost:5000/api/reportrow/${username}`,
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
            console.log(rowData);
        }
        return false;
    }
}

export default postReportRows;
