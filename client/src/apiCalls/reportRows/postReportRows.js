import axios from 'axios';
import { header } from './utils/formatter';

async function postReportRows() {
    try {
        const headers = { ...header };
        delete headers.systemReferenceNumber;
        const res = await axios.post(
            'http://localhost:5000/api/reportrow',
            {
                ...headers,
                date: Date.now(),
                caseStatus: 'pending'
                // systemReferenceNumber: [{ origin: 'magento', number: 10123 }]
            },
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

export default postReportRows;
