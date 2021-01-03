import axios from 'axios';

async function getSkuStatus(sku) {
    try {
        const res = await axios.get(`http://localhost:5000/skustatus/${sku}`, {
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

export default getSkuStatus;
