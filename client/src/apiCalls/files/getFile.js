import axios from 'axios';
import baseUrl from '../baseUrl';

const getFile = (file, progressCallback) => {
    axios({
        // url: `http://localhost:5000/files/${file}`,
        url: `${baseUrl}/files/${file}`,
        method: 'GET',
        withCredentials: true,
        responseType: 'blob', // important
        onDownloadProgress(progressEvent) {
            const progress = Math.round(
                (progressEvent.loaded / progressEvent.total) * 100
            );
            progressCallback(progress);
        }
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
