import React from 'react';
import classes from './Footer.module.css';

const footer = (props) => (
    <div className={[classes.Footer, "row"].join(" ")}>
        Here is a footer
    </div>
);

export default footer;