import React, {Fragment}from 'react';
import classes from './Layout.module.css';
import Navigation from '../Navigation/Navigation';

import Footer from '../Footer/Footer';

const layout = (props) => (
        <Fragment className={classes.layout}>
            <Navigation>
                <div>Toolbar</div>
                <div>SideDrawer</div>
            </Navigation>
            <div>Container</div>
            <Footer />
        </Fragment>
);

export default layout;