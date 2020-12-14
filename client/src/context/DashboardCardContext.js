import React, { useState, createContext } from 'react';

export const DashboardCardContext = createContext();

export const DashboardCardProvider = (props) => {
    const [trackingCard, setTrackingCard] = useState(0);
    return (
        <DashboardCardContext.Provider value={[trackingCard, setTrackingCard]}>
            {props.children}
        </DashboardCardContext.Provider>
    );
};
