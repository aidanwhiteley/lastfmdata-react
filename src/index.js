import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// Stub json files used during development to avoid hitting LastFM all the time
// import './stubdata/gettopalbums.json'
// import './stubdata/gettoptracks.json'
// import './stubdata/getrecenttracks.json'

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
