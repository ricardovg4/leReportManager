import { useEffect, useState, useContext } from 'react';
import getReportRows from '../apiCalls/reportRows/getReportRows';
import { header, lastPage, rows } from '../apiCalls/reportRows/utils/formatter';
import BulmaCalendar from './BulmaCalendar';

// Context
import { PaginationContext } from '../context/PaginationContext';
import { RowsDataUpdateContext } from '../context/RowsDataUpdateContext';

const Table = (props) => {
    const [rowsData, setRowsData] = useState(null);
    const [numberOfRows, setNumberOfRows] = useState(10);
    const [rowsToRender, setRowsToRender] = useState(null);
    const [filters, setFilters] = useState({});

    // Context
    const [
        currentPage,
        setCurrentPage,
        lastPageAvailable,
        setLastPageAvailable,
        paginationList,
        setPaginationList
    ] = useContext(PaginationContext);

    const [rowsDataUpdate, setRowsDataUpdate] = useContext(RowsDataUpdateContext);

    const setDateFilters = (startDate, endDate) => {
        setFilters({ ...filters, date: { startDate, endDate } });
    };

    const updateRows = async () => {
        const response = await getReportRows();
        // setRowsData(response);
        const sorted = sortRowsData(response);
        setRowsData(sorted);
    };

    const sortRowsData = (rows) => {
        const sortedData = rows.slice().sort(function (a, b) {
            return a.date < b.date ? -1 : a.date > b.date ? 1 : 0;
        });
        return sortedData;
    };

    useEffect(() => {
        updateRows();
    }, [rowsDataUpdate]);

    useEffect(() => {
        if (rowsData) {
            let rowsDataFiltered = null;

            if (filters.date) {
                const filter = filters.date;
                rowsDataFiltered = rowsData.filter((row) => {
                    const condition =
                        row.date >= filter.startDate && row.date <= filter.endDate;
                    return condition;
                });
            }

            const formattedRows = rows(
                rowsDataFiltered ? rowsDataFiltered : rowsData,
                numberOfRows,
                currentPage
            );
            setRowsToRender(formattedRows);
        }
    }, [rowsData, numberOfRows, currentPage, filters]);

    useEffect(() => {
        if (rowsData && filters.date) {
            setCurrentPage(1);
            setPaginationList([0, 1, 2]);
        }
    }, [filters]);

    useEffect(() => {
        setLastPageAvailable(lastPage);
    }, [lastPage]);

    return (
        // add box for style
        <div>
            <div className="container">
                <BulmaCalendar setdatefilters={setDateFilters} />
                <pre>{JSON.stringify(filters.date)}</pre>
            </div>

            <div
                className="table-container"
                style={{ height: '60vh', overflowY: 'auto' }}
            >
                <table className="table is-striped is-hoverable">
                    <thead>
                        <tr>
                            {Object.entries(header).map(([key, value]) => {
                                return <th key={key}>{value}</th>;
                            })}
                        </tr>
                    </thead>
                    <tbody>{rowsToRender}</tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;
