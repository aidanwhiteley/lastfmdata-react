import React, {Fragment}from 'react';
import Navigation from '../Navigation/Navigation';

import Footer from '../Footer/Footer';

const layout = (props) => (
        <Fragment>
            <Navigation>
                <div>Toolbar</div>
                <div>SideDrawer</div>
            </Navigation>
            <div className="container">Container</div>
            <Footer />
        </Fragment>
);

export default layout;