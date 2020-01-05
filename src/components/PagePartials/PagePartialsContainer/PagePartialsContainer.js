import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import classes from './PagePartialsContainer.module.css';
import AlbumsView from '../AlbumsView/AlbumsView';
import RecentTracksView from '../RecentTracksView/RecentTracksView';
import PopularTracksView from '../PopularTracksView/PopularTracksView';

const pagePartialsContainer = (props) => (
    <div className={["row", classes.PagePartialsContainer].join(" ")}>
        <Switch>
            <Route mame="albums" path="/albums" component={AlbumsView} />
            <Route path="/recentTracks" component={RecentTracksView} />
            <Route path="/popularTracks" component={PopularTracksView} />
            <Redirect exact from="/" to="albums" />
        </Switch>
    </div>
);

export default pagePartialsContainer;