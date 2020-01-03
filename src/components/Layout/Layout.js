import React, { Fragment } from 'react';
import Navigation from '../Navigation/Navigation';
import PagePartialsContainer from '../PagePartials/PagePartialsContainer/PagePartialsContainer';

import Footer from '../Footer/Footer';

const layout = (props) => (
    <Fragment>
        <Navigation>
            <div>Toolbar</div>
            <div>SideDrawer</div>
        </Navigation>
        <PagePartialsContainer />
        <Footer />
    </Fragment>
);

export default layout;