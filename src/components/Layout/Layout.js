import React, { Fragment } from 'react';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import PagePartialsContainer from '../PagePartials/PagePartialsContainer/PagePartialsContainer';
import Footer from '../Footer/Footer';

const layout = (props) => (
    <Fragment>
        <div id="outer-container">
            <Toolbar />
            <div id="page-wrap" className="container">
                <PagePartialsContainer />
                <Footer />
            </div>
        </div>
    </Fragment>
);

export default layout;