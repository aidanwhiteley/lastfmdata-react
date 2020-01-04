import axios from 'axios';

// Unfortunatley there is currently a bug in Axios 0.19 meaning that 
// params set here aren't used. Works with axios 0.18
const instance = axios.create({
    //baseURL: 'http:localhost:3000',
    timeout: 7000,
    responseType: 'json',
    params: {
        method: 'getrecenttracks.json',
        limit: 50,
        user: '???',
        api_key: '???',
        format: 'json',
        period: '6month'
    },

})

export default instance;
