import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import classes from './PagePartialsContainer.module.css';
import AlbumsView from '../AlbumsView/AlbumsView';
import RecentTracksView from '../RecentTracksView/RecentTracksView';
import PopularTracksView from '../PopularTracksView/PopularTracksView';

const pagePartialsContainer = (props) => (
    <div id="maincontent" className={classes.PagePartialsContainer}>
        <div className="row">
            <Switch>
                <Route name="albums" path="/albums/:timePeriod" component={AlbumsView} />
                <Route path="/recentTracks/:timePeriod" component={RecentTracksView} />
                <Route path="/popularTracks/:timePeriod" component={PopularTracksView} />
                <Redirect exact from="/" to="albums/12month" />
            </Switch>
        </div>
    </div>
);

export default pagePartialsContainer;