import React from 'react';
import { NavLink } from 'react-router-dom';
//import classes from './NavigationItem.module.css';

const navigationItem = (props) => {
    return (
        <NavLink onClick={props.closeMenu()} className="bm-item" to={props.route} exact activeClassName="myActive">{props.displayName}</NavLink>
    );
};

export default navigationItem;