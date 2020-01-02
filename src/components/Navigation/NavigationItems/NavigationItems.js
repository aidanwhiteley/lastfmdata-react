import React from 'react';
//import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className="nav">
        This is a container for navigation items
        <NavigationItem />
    </ul>
);

export default navigationItems;