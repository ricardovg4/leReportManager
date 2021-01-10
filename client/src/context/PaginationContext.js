import React, { useState, createContext } from 'react';

export const PaginationContext = createContext();

export const PaginationProvider = (props) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPageAvailable, setLastPageAvailable] = useState(null);
    const [paginationList, setPaginationList] = useState([0, 1, 2]);
    const [numberOfRows, setNumberOfRows] = useState(1);
    const [rowsFound, setRowsFound] = useState();

    return (
        <PaginationContext.Provider
            value={[
                currentPage,
                setCurrentPage,
                lastPageAvailable,
                setLastPageAvailable,
                paginationList,
                setPaginationList,
                numberOfRows,
                setNumberOfRows,
                rowsFound,
                setRowsFound
            ]}
        >
            {props.children}
        </PaginationContext.Provider>
    );
};
