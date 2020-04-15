import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavigationItem.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Constants from '../../../../constants/appConstants';

const navigationItem = (props) => {

    return (
        <Fragment>
            <NavLink onClick={props.closeMenu()} className="bm-item" to={{ pathname: props.route + '/' + Constants.TIME_PERIOD_OVERALL }} exact activeClassName="myActive">
                <FontAwesomeIcon icon={props.icon} />
                <span className={classes.NavigationItem}>{props.displayName}</span>
            </NavLink>

            {props.timePeriodChildren ? (
                <Fragment>
                    <NavLink onClick={props.closeMenu()} className="bm-item" to={{ pathname: props.route + '/' + Constants.TIME_PERIOD_OVERALL }} exact activeClassName="myActive">
                        <span className={classes.NavigationSubItem}>- All time</span>
                    </NavLink>
                    <NavLink onClick={props.closeMenu()} className="bm-item" to={{ pathname: props.route + '/' + Constants.TIME_PERIOD_6_MONTHS }} exact activeClassName="myActive">
                        <span className={classes.NavigationSubItem}>- Last 6 months</span>
                    </NavLink>
                    <NavLink onClick={props.closeMenu()} className="bm-item" to={{ pathname: props.route + '/' + Constants.TIME_PERIOD_1_MONTH }} exact activeClassName="myActive">
                        <span className={classes.NavigationSubItem}>- Last 1 month</span>
                    </NavLink>
                    <NavLink onClick={props.closeMenu()} className="bm-item" to={{ pathname: props.route + '/' + Constants.TIME_PERIOD_7_DAYS }} exact activeClassName="myActive">
                        <span className={classes.NavigationSubItem}>- Last 7 days</span>
                    </NavLink>
                </Fragment>
            ) : (<br />)
            }
        </Fragment>
    );
};

export default navigationItem;