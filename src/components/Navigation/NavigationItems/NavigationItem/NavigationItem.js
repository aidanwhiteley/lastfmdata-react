import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavigationItem.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const navigationItem = (props) => {
    return (
        <NavLink onClick={props.closeMenu()} className="bm-item" to={props.route} exact activeClassName="myActive">
            <FontAwesomeIcon icon={props.icon} />
            <span className={classes.NavigationItem}>{props.displayName}</span>
        </NavLink>
    );
};

export default navigationItem;