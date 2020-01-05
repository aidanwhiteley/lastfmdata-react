
import * as Constants from '../constants/appConstants';

// Originally this was used to create an instance of axios. 
// However, there is a bug in the current (v0.19) version of axios that 
// meant it wasn't possible to merge instance params with those supplied by the caller.
// That bug has been open for a while which meant we were having to use v0.18.
// So this now just provides a copy of the required config with the caller
// required to pass in the "method" to be called on the LastFM API and the 
// required number of objects to be returned.
const lastFmDataService = (method, limit) => {

    const getLastFmConfigInstance = (method, limit) => {
        const instance = {
            baseURL: 'https://ws.audioscrobbler.com',
            url: '/2.0/?',
            timeout: 7000,
            responseType: 'json',
            params: {
                method: '',
                limit: 50,
                user: Constants.LAST_FM_USER,
                api_key: Constants.LAST_FM_API_KEY,
                format: 'json',
                period: 'overall'
            },
        }

        const copy = Object.assign({}, instance);
        const paramsCopy = Object.assign({}, copy.params);
        copy.params = paramsCopy;

        copy.params.method = method;
        copy.params.limit = limit;

        return copy;
    }

    // In dev mode just return the location of stubbed data (within the project)
    const getStubDataConfig = (method) => {
        if (method === Constants.METHOD_TOP_ALBUMS) {
            return Constants.STUB_TOP_ALBUMS;
        } else if (method === Constants.METHOD_TOP_TRACKS) {
            return Constants.STUB_TOP_TRACKS
        } else if (method === Constants.METHOD_RECENT_TRACKS) {
            return Constants.STUB_RECENT_TRACKS
        } else {
            throw new Error('Unsupported LastFM method name supplied');
        }
    }

    return Constants.DEV_MODE ? getStubDataConfig(method) : getLastFmConfigInstance(method, limit);
}

export default lastFmDataService;
