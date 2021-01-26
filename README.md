# LastFmData-React

An SPA display of LastFm "scrobble" data using React.

![LastFM React CI](https://github.com/aidanwhiteley/lastfmdata-react/workflows/LastFM%20React%20CI/badge.svg)

A deployment of the current code is usually available at https://music.aidanwhiteley.com/

The source code for a previous version using AngularJS is available at https://github.com/aidanwhiteley/lastfmdata.

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
