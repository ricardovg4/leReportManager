// need to check on filter by date, timezone difff, when selecting 12/09/2020 it shows for the 10th, check id this has been resolved
import { useEffect, useState, useContext } from 'react';
import getReportRows from '../apiCalls/reportRows/getReportRows';
import BulmaCalendar from './BulmaCalendar';
import getReportRowById from '../apiCalls/reportRows/getReportRowById';

// Context
import { PaginationContext } from '../context/PaginationContext';
import { RowsDataUpdateContext } from '../context/RowsDataUpdateContext';
import TableRowFormatter from './TableRowFormatter';

// row formatter logic
const header = {
    date: 'Date',
    systemReferenceNumber: 'Reference Number',
    issue: 'Issue',
    customerName: 'Name',
    customerPhone: 'Phone',
    customerEmail: 'Email',
    source: 'Source',
    responseMethod: 'Response Method',
    response: 'Response',
    requestToCt: 'Request to CT',
    caseStatus: 'Case Status',
    follower: 'Follower',
    solution: 'Solution'
};

const Table = () => {
    const [rowsData, setRowsData] = useState(null);
    const [numberOfRows, setNumberOfRows] = useState(10);
    const [rowsToRender, setRowsToRender] = useState(null);
    const [filters, setFilters] = useState({ date: null, caseStatus: '' });
    const [editModal, setEditModal] = useState('');
    const [editRow, setEditRow] = useState(null);

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

    // Rows data manipulation and formatting
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

    const resetPagination = () => {
        setCurrentPage(1);
        setPaginationList([0, 1, 2]);
    };

    const currentRowsData = (rowsData) => {
        const start = numberOfRows * (currentPage - 1);
        const last = numberOfRows * currentPage;
        const lastPage =
            rowsData.length >= start && rowsData.length <= last ? true : false;
        setLastPageAvailable(lastPage);
        return rowsData.slice(start, last);
    };

    // Actions tr manipulation
    const handleActions = (rowId, action) => {
        console.log(rowId, action);
        if (action === 'edit') {
            setEditRow(rowId);
            setEditModal('is-active');
        }
        if (action === 'delete') {
            document.getElementById('main-table').deleteRow(1);
        }
    };

    // Set date filters util for bulma calendar
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

    const RowModal = () => {
        return (
            <div className={`modal ${editModal}`}>
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Edit row</p>
                        <button
                            className="delete"
                            onClick={() => setEditModal('')}
                        ></button>
                    </header>
                    <section className="modal-card-body">
                        <div className="content">{editRow ? 'asdf' : 'Loading...'}</div>
                    </section>
                    <footer className="modal-card-foot">
                        <button
                            className="button is-success"
                            // onClick={handleCancelAddOne}
                        >
                            Save changes
                        </button>
                        <button
                            className="button is-danger"
                            onClick={() => setEditModal('')}
                        >
                            Cancel
                        </button>
                    </footer>
                </div>
            </div>
        );
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

            const filteredRows = currentRowsData(
                rowsDataFiltered ? rowsDataFiltered : rowsData
            );
            setRowsToRender(filteredRows);
        }
    }, [rowsData, numberOfRows, currentPage, filters]);

    useEffect(() => {
        if (rowsData && filters.date) {
            setCurrentPage(1);
            setPaginationList([0, 1, 2]);
        }
    }, [filters]);

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
                <table className="table is-striped is-hoverable" id="main-table">
                    <thead>
                        <tr>
                            {Object.entries(header).map(([key, value]) => {
                                return <th key={key}>{value}</th>;
                            })}
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {rowsToRender
                            ? rowsToRender.map((row) => {
                                  return (
                                      <TableRowFormatter
                                          row={row}
                                          header={header}
                                          handleactions={handleActions}
                                          key={row._id}
                                      />
                                  );
                              })
                            : null}
                    </tbody>
                </table>
            </div>
            <RowModal />
        </div>
    );
};

export default Table;
