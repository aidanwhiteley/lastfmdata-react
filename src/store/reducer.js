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
                topAlbums: action.apiData
            }
        default:
            return state;
    }

};

export default reducer;