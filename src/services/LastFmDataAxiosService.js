import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://thegpsblog.com',
    timeout: 7000,
    wibble: 'wobble',
    params: {
        limit: 50,
        user: 'xxx',
        api_key: 'xxx',
        format: 'json',
        period: '6month'
    },

})

export default instance;
