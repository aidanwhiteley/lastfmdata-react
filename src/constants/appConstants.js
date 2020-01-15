// Set this to true to return stubbed data and avoid calling the real LastFM APIs
export const DEV_MODE = true;

// Enter you LastFM user name and API key below
export const LAST_FM_USER = 'xxx';
export const LAST_FM_API_KEY = 'xxx';

// =============== Shouldnt need to edit entries below here =====================

export const METHOD_TOP_ALBUMS = 'user.gettopalbums';
export const METHOD_TOP_TRACKS = 'user.gettoptracks';
export const METHOD_RECENT_TRACKS = 'user.getRecentTracks';

export const STUB_TOP_ALBUMS = '/stubdata/gettopalbums.json';
export const STUB_TOP_TRACKS = '/stubdata/gettoptracks.json';
export const STUB_RECENT_TRACKS = '/stubdata/getrecenttracks.json';

// Time periods known to LastFM API
export const TIME_PERIOD_7_DAYS = '7day';
export const TIME_PERIOD_1_MONTH = '1month';
export const TIME_PERIOD_3_MONTHS = '3month';
export const TIME_PERIOD_6_MONTHS = '6month';
export const TIME_PERIOD_12_MONTHS = '12month';
export const TIME_PERIOD_OVERALL = 'overall';