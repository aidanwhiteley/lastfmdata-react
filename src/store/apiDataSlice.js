import { createSlice } from '@reduxjs/toolkit';

const apiDataSlice = createSlice({
    name: 'apiData',
    initialState: {
        topAlbums: null,
        recentTracks: null,
        topTracks: null
    },
    reducers: {
        storeTopAlbums(state, action) {
            const { apiData, lastUpdate } = action.payload;

            //const albums = state.find(album => album.period === action.payload.period)
            //if (album) {
            //    album.apiData = apiData;
            //    album.lastUpdate = lastUpdate;
            //} else {
            //    state.topAlbums.push({ apiData: apiData, lastUpdate: lastUpdate, period: period });
            //}

            state.topAlbums = { apiData: apiData, lastUpdate: lastUpdate }
        },
        storeRecentTracks(state, action) {
            const { apiData, lastUpdate } = action.payload;
            state.recentTracks = { apiData: apiData, lastUpdate: lastUpdate }
        },
        storeTopTracks(state, action) {
            const { apiData, lastUpdate } = action.payload;
            state.topTracks = { apiData: apiData, lastUpdate: lastUpdate }
        }
    }

});

export const { storeTopAlbums, storeRecentTracks, storeTopTracks } = apiDataSlice.actions;

export default apiDataSlice.reducer;