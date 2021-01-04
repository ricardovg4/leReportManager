import axios from 'axios';
import baseUrl from '../baseUrl';

async function getReportRows(username, filters) {
    let query = '';
    if (filters) {
        if (filters.email) {
            query += `customerEmail=${filters.email}&`;
        }
        if (filters.phone) {
            query += `customerPhone=${filters.phone}&`;
        }
        if (filters.systemReference) {
            query += `systemReferenceOrigin=${filters.systemReference}&`;
        }
        if (filters.referenceNumber) {
            query += `systemReferenceNumber=${filters.referenceNumber}&`;
        }
        if (filters.caseStatus) {
            query += `caseStatus=${filters.caseStatus}&`;
        }
        if (filters.date && filters.date.startDate && filters.date.endDate) {
            query += `startDate=${filters.date.startDate}&`;
            query += `endDate=${filters.date.endDate}&`;
        }
    }
    // console.log(`${baseUrl}/api/reportrow/${username}?${query}`);
    try {
        const res = await axios.get(`${baseUrl}/api/reportrow/${username}?${query}`, {
            withCredentials: true
        });
        const data = await res.data;
        if (!data.length) {
            return false;
        }
        return data;
    } catch (error) {
        if (error.response) {
            console.log(error.response.data); // => the response payload
        }
        return false;
    }
}

export default getReportRows;
