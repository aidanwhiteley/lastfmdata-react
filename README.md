# LastFmData-React

A work in progress to re-implement an SPA display of LastFm "scrobble" data using React. 

[![Build Status](https://travis-ci.org/aidanwhiteley/lastfmdata-react.svg?branch=master)](https://travis-ci.org/aidanwhiteley/lastfmdata-react)
[![Lighthouse](https://rawgit.com/emazzotta/lighthouse-badges/master/assets/img/scores/lighthouse.svg)](https://github.com/aidanwhiteley/lighthouse-badges)

A deployment of the current code is usually available at https://music.aidanwhiteley.com/

The source code for a  previous version using AngularJS is available at https://github.com/aidanwhiteley/lastfmdata.

This is a first attempt at doing something practical with React and comes with the caveat that I'm only halfway through the React course at https://www.udemy.com/course/react-the-complete-guide-incl-redux. The plan is to change over to using Redux, Hooks and actually write some tests when I've learnt how.

## Configuration
The checked out code should run unchanged. Run
- npm install
- npm start

This accesses dummy data files in the /public/stubdata directory rather than the LastFM API.

To access data from the LastFM API, edit /src/constants/appConstants.js to
- change DEV_MODE to false
- set LAST_FM_USER to your LastFM user
- set LAST_FM_API_KEY to the key from LasrFM for using their APIs.

## License
&copy; Aidan Whiteley
This project is licensed under the Apache 2 license (noting that the css in the Album.module.css file is based on work by [Alex Cash](https://github.com/alexcash/jQuery.last.fm) which was released under a dual MIT / GPL license)