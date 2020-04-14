import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavigationItem.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const navigationItem = (props) => {
    return (
        <Fragment>
            <NavLink onClick={props.closeMenu()} className="bm-item" to={{ pathname:props.route, search:'?period=all'}} exact activeClassName="myActive">
                <FontAwesomeIcon icon={props.icon} />
                <span className={classes.NavigationItem}>{props.displayName}</span>
            </NavLink>
            <NavLink onClick={props.closeMenu()} className="bm-item" to={{ pathname:props.route, search:'?period=all'}} exact activeClassName="myActive">
                <span className={classes.NavigationSubItem}>- All time</span>
            </NavLink>
            <NavLink onClick={props.closeMenu()} className="bm-item" to={{ pathname:props.route, search:'?period=6month'}} exact activeClassName="myActive">
                <span className={classes.NavigationSubItem}>- Last 6 months</span>
            </NavLink>
            <NavLink onClick={props.closeMenu()} className="bm-item" to={{ pathname:props.route, search:'?period=1month'}} exact activeClassName="myActive">
                <span className={classes.NavigationSubItem}>- Last 1 month</span>
            </NavLink>
            <NavLink onClick={props.closeMenu()} className="bm-item" to={{ pathname:props.route, search:'?period=7day'}} exact activeClassName="myActive">
                <span className={classes.NavigationSubItem}>- Last 7 days</span>
            </NavLink>
        </Fragment>
    );
};

export default navigationItem;