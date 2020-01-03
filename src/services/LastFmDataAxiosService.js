import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://ws.audioscrobbler.com/2.0/?',
    timeout: 7000,
    responseType: 'json',
    params: {
        method: 'user.getRecentTracks',
        limit: 50,
        user: 'xxx',
        api_key: 'xxxx',
        format: 'json',
        period: '6month'
    },

})

export default instance;
