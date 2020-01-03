import React from 'react';
import { NavLink } from 'react-router-dom';
//import classes from './NavigationItem.module.css';

const navigationItem = (props) => {
    return (<li className="nav-item"
        key={props.id}>
        <NavLink to={props.route} exact activeClassName="myActive">{props.displayName}</NavLink>
        {console.log(props)}
    </li >);
};

export default navigationItem;