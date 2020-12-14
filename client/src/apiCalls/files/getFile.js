import axios from 'axios';

const getFile = (file) => {
    axios({
        url: `http://localhost:5000/files/${file}`,
        method: 'GET',
        withCredentials: true,
        responseType: 'blob' // important
    }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${file}`);
        document.body.appendChild(link);
        link.click();
        link.remove();
    });
};

export default getFile;
