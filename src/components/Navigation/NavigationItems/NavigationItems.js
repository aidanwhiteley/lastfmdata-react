import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationData = [
    { id: 1, name: 'albums', displayName: 'Most listened to albums', route: '/albums' },
    { id: 2, name: 'recentTracks', displayName: 'Recently played tracks', route: '/recentTracks' },
    { id: 3, name: 'popularTracks', displayName: 'Most played tracks', route: '/popularTracks' }
];

const navigationItems = (props) => {

    const navDataItems = navigationData.map(navDataItem => {
        return <NavigationItem key={navDataItem.id} {...navDataItem} />
    });

    return (
        <ul className={classes.NavLocal}>
            {navDataItems}
        </ul>
    );
};

export default navigationItems;