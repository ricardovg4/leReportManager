import axios from 'axios';

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
    }
    // console.log(`http://localhost:5000/api/reportrow/${username}?${query}`);
    try {
        const res = await axios.get(
            `http://localhost:5000/api/reportrow/${username}?${query}`,
            {
                withCredentials: true
            }
        );
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
