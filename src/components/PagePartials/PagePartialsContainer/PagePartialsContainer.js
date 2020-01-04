import React from 'react';
import { Route, Switch } from 'react-router-dom';
import classes from './PagePartialsContainer.module.css';
import AlbumsView from '../AlbumsView/AlbumsView';
import RecentTracksView from '../RecentTracksView/RecentTracksView';
import PopularTracksView from '../PopularTracksView/PopularTracksView';

const pagePartialsContainer = (props) => (
    <div className={[classes.PagePartialsContainer, "row"].join(" ")}>
        <Switch>
            <Route path="/albums" component={AlbumsView} />
            <Route path="/recentTracks" component={RecentTracksView} />
            <Route path="/popularTracks" component={PopularTracksView} />
        </Switch>
    </div>
);

export default pagePartialsContainer;