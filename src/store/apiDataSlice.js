import { createSlice } from '@reduxjs/toolkit';

const apiDataSlice = createSlice({
    name: 'apiData',
    initialState: {
        topAlbums: [],
        recentTracks: null,
        topTracks: null
    },
    reducers: {
        storeTopAlbums(state, action) {
            const { apiData, lastUpdate, timePeriod } = action.payload;

            const anAlbumSet = state.topAlbums.find(albumSet => albumSet.timePeriod === timePeriod)
            if (anAlbumSet) {
                anAlbumSet.apiData = apiData;
                anAlbumSet.lastUpdate = lastUpdate;
            } else {
                state.topAlbums.push({ apiData: apiData, lastUpdate: lastUpdate, timePeriod: timePeriod });
            }
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