import React, { useState, createContext } from 'react';

export const PaginationContext = createContext();

export const PaginationProvider = (props) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPageAvailable, setLastPageAvailable] = useState(null);

    return (
        <PaginationContext.Provider
            value={[currentPage, setCurrentPage, lastPageAvailable, setLastPageAvailable]}
        >
            {props.children}
        </PaginationContext.Provider>
    );
};
