import React from 'react';
// import classes from './Navigation.module.css';
import Toolbar from './Toolbar/Toolbar';
import SideDrawer from './SideDrawer/SideDrawer';

const navigation = (props) => (
    <nav>
        This is the navigation
        <Toolbar />
        <SideDrawer />
    </nav>
);

export default navigation;