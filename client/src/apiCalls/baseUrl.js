const baseUrl =
    process.env.NODE_ENV === 'production'
        ? 'http://104.236.12.233'
        : 'http://localhost:5000';

export default baseUrl;