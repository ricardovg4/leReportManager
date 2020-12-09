import React, { useState, createContext } from 'react';

export const RowsDataUpdateContext = createContext();

export const RowsDataUpdateProvider = (props) => {
    const [rowsDataUpdate, setRowsDataUpdate] = useState(0);
    return (
        <RowsDataUpdateContext.Provider value={[rowsDataUpdate, setRowsDataUpdate]}>
            {props.children}
        </RowsDataUpdateContext.Provider>
    );
};
