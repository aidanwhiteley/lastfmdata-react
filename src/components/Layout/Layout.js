import React, { Fragment } from 'react';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import PagePartialsContainer from '../PagePartials/PagePartialsContainer/PagePartialsContainer';
import Footer from '../Footer/Footer';
import './layout-override.css';

const layout = (props) => (
    <Fragment>
        <div id="outer-container">
            <Toolbar />
            <div id="page-wrap" className="mycontainer">
                <PagePartialsContainer />
                <Footer />
            </div>
        </div>
    </Fragment>
);

export default layout;