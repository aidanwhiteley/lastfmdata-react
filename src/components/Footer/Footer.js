import React from 'react';
import classes from './Footer.module.css';
import lastFmImage from '../../assets/images/lastfm_black_small.gif';
import gitHubImage from '../../assets/images/GitHub_Logo2.png';

const footer = (props) => (
    <div className={["row", classes.Footer].join(" ")}>

        <div>
            <div className="x">powered by AudioScrobbler from <a href="http://www.last.fm/" target="_top">
                <img src={lastFmImage} alt="Last fm logo" /></a>
            </div>
            <div className="y">code available on <a href="https://github.com/aidanwhiteley" target="_top">
                <img src={gitHubImage} alt="GitHub logo" /></a>
            </div>
        </div>

    </div>
);

export default footer;