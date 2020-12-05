import React from 'react';

import image from './notFound.png';
import './index.css';

const NotFound = () => {
    return (
        <div className="notFound">
            <h1 className="notFound__title">404 Page not found!</h1>
            <img className="notFound__image" src={image} alt="Page not found" />
        </div>
    );
};

export default NotFound;
