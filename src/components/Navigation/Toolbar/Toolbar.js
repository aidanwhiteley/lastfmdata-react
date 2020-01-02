import React from 'react';
import classes from './Toolbar.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../UI/Logo/Logo';

const toolbar = (props) => (
    <div className={classes.toolbar}>
        This is a toolbar
        <Logo />
        <NavigationItems />
    </div>
);

export default toolbar;