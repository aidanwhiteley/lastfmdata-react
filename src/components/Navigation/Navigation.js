import React from 'react';
import classes from './Navigation.module.css';
import Toolbar from './Toolbar/Toolbar';
import SideDrawer from './SideDrawer/SideDrawer';

const navigation = (props) => (
    <div className={classes.navigation}>
        This is the navigation
        <Toolbar />
        <SideDrawer />
    </div>
);

export default navigation;