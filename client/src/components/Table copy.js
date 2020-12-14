// need to check on filter by date, timezone difff, when selecting 12/09/2020 it shows for the 10th, check id this has been resolved
import { useEffect, useState, useContext } from 'react';
import getReportRows from '../apiCalls/reportRows/getReportRows';
import { header, lastPage, rows, editID } from '../apiCalls/reportRows/utils/formatter';
import BulmaCalendar from './BulmaCalendar';

// Context
import { PaginationContext } from '../context/PaginationContext';
import { RowsDataUpdateContext } from '../context/RowsDataUpdateContext';

const Table = (props) => {
    const [rowsData, setRowsData] = useState(null);
    const [numberOfRows, setNumberOfRows] = useState(10);
    const [rowsToRender, setRowsToRender] = useState(null);
    const [filters, setFilters] = useState({ date: null, caseStatus: '' });

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

    const resetPagination = () => {
        setCurrentPage(1);
        setPaginationList([0, 1, 2]);
    };

    const setDateFilters = (startDate, endDate) => {
        if (startDate === null && endDate === null) {
            setFilters((prev) => {
                return { ...prev, date: null };
            });
            resetPagination();
            return false;
        }
        setFilters((prev) => {
            return { ...prev, date: { startDate, endDate } };
        });
    };

    const updateRows = async () => {
        const response = await getReportRows();
        const sorted = sortRowsData(response);
        setRowsData(sorted);
    };

    const sortRowsData = (rows) => {
        const sortedData = rows.slice().sort(function (a, b) {
            return a.date < b.date ? 1 : a.date > b.date ? -1 : 0;
        });
        return sortedData;
    };

    useEffect(() => {
        updateRows();
    }, [rowsDataUpdate]);

    useEffect(() => {
        if (rowsData) {
            let rowsDataFiltered = null;

            // Filters
            if (filters.date || filters.caseStatus) {
                rowsDataFiltered = rowsData.filter((row) => {
                    let condition;
                    if (filters.date && filters.caseStatus) {
                        condition =
                            row.date >= filters.date.startDate &&
                            row.date <= filters.date.endDate &&
                            row.caseStatus === filters.caseStatus;
                    } else if (filters.date && !filters.caseStatus) {
                        // Date filter
                        condition =
                            row.date >= filters.date.startDate &&
                            row.date <= filters.date.endDate;
                    } else if (!filters.date && filters.caseStatus) {
                        condition = row.caseStatus === filters.caseStatus;
                    }
                    return condition;
                });
            } else {
                rowsDataFiltered = null;
            }

            // console.log(rowsData.length);
            // console.log(rowsDataFiltered);
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
        console.log(editID);
    });

    useEffect(() => {
        setLastPageAvailable(lastPage);
    }, [lastPage]);

    return (
        <div>
            <div className="level px-2 mb-2">
                <div className="level-left"></div>
                <div className="level-right">
                    <div className="level-item">
                        <p className="subtitle is-6">Date filter</p>
                    </div>
                    <div className="level-item">
                        <BulmaCalendar setdatefilters={setDateFilters} />
                    </div>
                    <div className="level-item">
                        <p className="subtitle is-6">Case status</p>
                    </div>
                    <div className="level-item">
                        <div className="field has-addons">
                            <div className="control">
                                <span className="select">
                                    <select
                                        value={filters.caseStatus}
                                        onChange={(e) => {
                                            setFilters({
                                                ...filters,
                                                caseStatus: e.target.value
                                            });
                                            resetPagination();
                                        }}
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="waiting for cs answer">
                                            Waiting for cs answer
                                        </option>
                                        <option value="solved">Solved</option>
                                        <option value=""></option>
                                    </select>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr />

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
                            <th></th>
                        </tr>
                    </thead>
                    {/* <tbody>{rowsToRender}</tbody> */}
                    <tbody>{rowsToRender}</tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;
