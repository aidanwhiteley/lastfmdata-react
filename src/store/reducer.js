import * as actionTypes from './actions';

const initialState = {
    topAlbums: null,
    recentTracks: null,
    topTracks: null
};

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.STORE_TOP_ALBUMS_DATA:
            return {
                ...state,
                topAlbums: {
                    apiData: action.apiData,
                    lastUpdate: new Date()
                }
            }
        case actionTypes.STORE_RECENT_TRACKS_DATA:
            return {
                ...state,
                recentTracks: {
                    apiData: action.apiData,
                    lastUpdate: new Date()
                }
            }
        case actionTypes.STORE_TOP_TRACKS_DATA:
            return {
                ...state,
                topTracks: {
                    apiData: action.apiData,
                    lastUpdate: new Date()
                }
            }
        default:
            return state;
    }

};

export default reducer;