import React, { Fragment } from 'react';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import PagePartialsContainer from '../PagePartials/PagePartialsContainer/PagePartialsContainer';

import Footer from '../Footer/Footer';

const layout = (props) => (
    <Fragment>
        <Toolbar />
        <SideDrawer />
        <PagePartialsContainer />
        <Footer />
    </Fragment>
);

export default layout;