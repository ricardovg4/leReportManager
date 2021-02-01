// need to check on filter by date, timezone difff, when selecting 12/09/2020 it shows for the 10th, check id this has been resolved
import { useEffect, useState, useContext } from 'react';
import getReportRows from '../apiCalls/reportRows/getReportRows';
import BulmaCalendar from './BulmaCalendar';
import getReportRowById from '../apiCalls/reportRows/getReportRowById';
import updateReportRowById from '../apiCalls/reportRows/updateReportRowById';
// import deleteReportRowById from '../apiCalls/reportRows/deleteReportRowById';

// Context
import { PaginationContext } from '../context/PaginationContext';
import { RowsDataUpdateContext } from '../context/RowsDataUpdateContext';
import TableRowFormatter from './TableRowFormatter';
import FormDailyReport from './FormDailyReportRow';
import header from '../apiCalls/reportRows/utils/reportHeader';
import Loading from '../pages/Loading/Loading';

const Table = (props) => {
    const resetFilters = {
        date: null,
        country: '',
        caseStatus: '',
        email: null,
        phone: null,
        referenceNumber: null,
        follower: null
    };

    const resetAllFilters = () => {
        setFilters(resetFilters);
        setEmail('');
        setPhone('');
        setReferenceNumber('');
        setFollower('');
        try {
            const clearButton = document.getElementsByClassName(
                'datetimepicker-clear-button'
            )[0];
            clearButton.click();
        } catch (error) {}
    };

    const [loading, setLoading] = useState(false);
    const [rowsData, setRowsData] = useState(null);
    const [numberOfRows, setNumberOfRows] = useState(10);
    const [rowsToRender, setRowsToRender] = useState(null);
    const [editModal, setEditModal] = useState('');
    const [editRow, setEditRow] = useState(null);
    const [cancelModal, setCancelModal] = useState('');
    // const [deleteRowId, setDeleteRowId] = useState(null);
    const [timezone, setTimezone] = useState(null);

    const [showFilters, setShowFilters] = useState(true);
    const [filters, setFilters] = useState(resetFilters);
    // Needed to be separate so the filter search is not triggered on event change
    const [follower, setFollower] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [referenceNumber, setReferenceNumber] = useState('');

    // Context
    const [
        currentPage,
        setCurrentPage,
        lastPageAvailable,
        setLastPageAvailable,
        paginationList,
        setPaginationList,
        rowsFound,
        setRowsFound
    ] = useContext(PaginationContext);
    const [rowsDataUpdate, setRowsDataUpdate] = useContext(RowsDataUpdateContext);

    const handleTimezone = (tz) => {
        // console.log(tz);
        setTimezone(tz);
    };

    // Rows data manipulation and formatting
    const updateRows = async (
        query,
        resetPaginationOnUpdate = true,
        setRowsDataToNull
    ) => {
        let response;
        // Loading state
        try {
            if (setRowsDataToNull) {
                setRowsData(null);
            }
            setLoading(true);
            response = await getReportRows(props.user, query);
            setLoading(false);
        } catch (error) {
            alert(
                "couldn't update report row request, please check you internet connection or save your work and re-login"
            );
        }
        // if query returns false
        if (!response) {
            setRowsData(null);
            setRowsFound(0);
            // alert('No items found');
            return false;
        }
        // reset filters
        if (resetPaginationOnUpdate) {
            resetPagination();
        }
        // console.log(response.length);
        // console.log(filters);
        setRowsFound(response.length);
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
    const handleActions = async (rowId, action) => {
        if (action === 'edit') {
            try {
                const rowData = await getReportRowById(props.user, rowId);
                if (rowData) {
                    setEditRow(rowData);
                    setEditModal('is-active');
                }
                if (!rowData) {
                    alert(
                        "couldn't get row request, check your internet connection or save your work and re-login"
                    );
                }
            } catch (error) {
                alert(
                    "couldn't get row request, check your internet connection or save your work and re-login"
                );
            }
        }
        // if (action === 'delete') {
        //     setDeleteRowId(rowId);
        //     setCancelModal('is-active');
        // }
    };

    // Set date filters util for bulma calendar
    const setDateFilters = (startDate, endDate) => {
        // reset pagination if dates are null
        if (startDate === null && endDate === null) {
            setFilters((prev) => {
                return { ...prev, date: null };
            });
            resetPagination();
            return false;
        }
        // set filters with new data
        setFilters((prev) => {
            return { ...prev, date: { startDate, endDate } };
        });
    };

    const handleUpdateOneRow = (row, id) => {
        updateReportRowById(props.user, id, row)
            .then((res) => {
                if (!res) {
                    alert(
                        "couldn't update repowrt row request, please check you internet connection or save your work and re-login"
                    );
                }

                updateRows(filters ? filters : null, false);
                setEditModal('');
                setEditRow(null);
            })
            .catch((e) => {
                console.log(e);
                alert(
                    "couldn't update repowrt row request, please check you internet connection or save your work and re-login"
                );
            });
    };

    const confirmCancelOne = (e) => {
        e.preventDefault();
        setEditModal('');
        setEditRow(null);
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
                        <div className="content">
                            {editRow ? (
                                <FormDailyReport
                                    rowData={editRow}
                                    handleonerow={handleUpdateOneRow}
                                    submitButtonName="Save changes"
                                    confirmcancelone={confirmCancelOne}
                                    role={props.role}
                                    reviewerUsername={props.reviewerUsername}
                                />
                            ) : (
                                'Loading...'
                            )}
                        </div>
                    </section>
                </div>
            </div>
        );
    };

    const handleCancelModal = (e) => {
        e.preventDefault();
        setCancelModal('');
    };
    // const handleDeleteRow = async (rowId) => {
    //     try {
    //         const deleteRow = await deleteReportRowById(props.user, deleteRowId);
    //         if (deleteRow) {
    //             setCancelModal('');
    //             alert('row deleted successfully');
    //             setDeleteRowId(null);
    //             updateRows();
    //         }
    //         if (!deleteRow) {
    //             alert(
    //                 "couldn't delete row request, check your internet connection or save your work and re-login"
    //             );
    //         }
    //     } catch (error) {
    //         alert(
    //             "couldn't delete row request, check your internet connection or save your work and re-login"
    //         );
    //     }
    // };

    // const ConfirmDeleteModal = () => {
    //     return (
    //         <div className={`modal ${cancelModal}`}>
    //             <div className="modal-background"></div>
    //             <div className="modal-card">
    //                 <header className="modal-card-head has-background-danger">
    //                     <p className="modal-card-title has-text-white">Cancel</p>
    //                     <button
    //                         className="delete"
    //                         aria-label="close"
    //                         onClick={handleCancelModal}
    //                     ></button>
    //                 </header>
    //                 <section className="modal-card-body">
    //                     <div className="content">
    //                         <p>
    //                             You are about to delete this row, this cannot be undone.
    //                             Are you sure you want to proceed?
    //                         </p>
    //                     </div>
    //                 </section>
    //                 <footer className="modal-card-foot">
    //                     <button className="button is-danger" onClick={handleDeleteRow}>
    //                         Delete row
    //                     </button>
    //                     <button className="button is-success" onClick={handleCancelModal}>
    //                         Go back
    //                     </button>
    //                 </footer>
    //             </div>
    //         </div>
    //     );
    // };

    useEffect(() => {
        // setFilters(resetFilters);
        resetAllFilters();
        updateRows();
    }, [rowsDataUpdate]);

    // use filters
    useEffect(() => {
        updateRows(filters, true, true);
    }, [filters]);

    useEffect(() => {
        if (!rowsData) {
            setRowsToRender(null);
        }
        if (rowsData) {
            const currentRows = currentRowsData(rowsData);
            setRowsToRender(currentRows);
        }
    }, [rowsData, numberOfRows, currentPage, filters]);

    // reset pagination back to 1 when a date filter is applied
    useEffect(() => {
        if (rowsData && filters.date) {
            setCurrentPage(1);
            setPaginationList([0, 1, 2]);
        }
    }, [filters]);

    useEffect(() => {
        resetAllFilters();
        updateRows(undefined, undefined, true);
        // Update the rows when the user in props has changed
    }, [props.user]);

    return (
        <div>
            {!showFilters ? (
                <div className="level">
                    <div className="level-left">
                        <div className="level-item">
                            <button
                                onClick={() => {
                                    setShowFilters(!showFilters);
                                }}
                                className="button is-info"
                            >
                                Filters
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="filter">
                    <div className="level">
                        <div className="level-left">
                            <div className="level-item">
                                {/* <p className="title is-6">Filters: </p> */}
                                <button
                                    onClick={() => {
                                        setShowFilters(!showFilters);
                                    }}
                                    className="button is-info is-light"
                                >
                                    Filters:
                                </button>
                            </div>
                            <div className="level-item mx-4"></div>
                            <div className="level-item">
                                <button
                                    className="button is-danger is-small is-light"
                                    onClick={() => resetAllFilters()}
                                >
                                    Reset filters
                                </button>
                            </div>
                        </div>
                        <div className="level-right">
                            <div className="level-item">
                                <p className="subtitle is-6">Date</p>
                            </div>
                            <div className="level-item">
                                <BulmaCalendar
                                    setdatefilters={setDateFilters}
                                    handletimezone={handleTimezone}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="level">
                        <div className="level-left">
                            <div className="level-item"></div>
                        </div>
                        <div className="level-right">
                            <div className="level-item">
                                <p className="subtitle is-6">Follower</p>
                            </div>
                            <div className="level-item">
                                <div className="field">
                                    <div className="control">
                                        <input
                                            style={{ width: '100px' }}
                                            className="input"
                                            placeholder="Follower"
                                            value={follower}
                                            onChange={(e) => {
                                                setFollower(e.target.value);
                                            }}
                                            onBlur={(e) => {
                                                setFilters({
                                                    ...filters,
                                                    follower: follower.toLowerCase()
                                                });
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="level-item">
                                <p className="subtitle is-6">Ctry</p>
                            </div>
                            <div className="level-item">
                                <div className="field has-addons">
                                    <div className="control">
                                        <span className="select">
                                            <select
                                                value={filters.country}
                                                onChange={(e) => {
                                                    setFilters({
                                                        ...filters,
                                                        country: e.target.value
                                                    });
                                                }}
                                            >
                                                <option value="us">US</option>
                                                <option value="ca">CA</option>
                                                <option value="uk">UK</option>
                                                <option value="de">DE</option>
                                                <option value=""></option>
                                            </select>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="level mb-2">
                        <div className="level-left"></div>
                        <div className="level-right" style={{ width: '100%' }}>
                            {/* <div className="level-item">
                                <p className="subtitle is-6">Follower</p>
                            </div>
                            <div className="level-item">
                                <div className="field">
                                    <div className="control">
                                        <input
                                            style={{ width: '100px' }}
                                            className="input"
                                            placeholder="Follower"
                                            value={follower}
                                            onChange={(e) => {
                                                setFollower(e.target.value);
                                            }}
                                            onBlur={(e) => {
                                                setFilters({
                                                    ...filters,
                                                    follower: follower.toLowerCase()
                                                });
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="level-item">
                                <p className="subtitle is-6">Ctry</p>
                            </div>
                            <div className="level-item">
                                <div className="field has-addons">
                                    <div className="control">
                                        <span className="select">
                                            <select
                                                value={filters.country}
                                                onChange={(e) => {
                                                    setFilters({
                                                        ...filters,
                                                        country: e.target.value
                                                    });
                                                }}
                                            >
                                                <option value="us">US</option>
                                                <option value="ca">CA</option>
                                                <option value="uk">UK</option>
                                                <option value="de">DE</option>
                                                <option value=""></option>
                                            </select>
                                        </span>
                                    </div>
                                </div>
                            </div> */}
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
                            <div className="level-item">
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();

                                        setFilters({
                                            ...filters
                                        });
                                    }}
                                >
                                    <div className="field is-horizontal">
                                        <div className="control">
                                            <input
                                                className="input"
                                                placeholder="Reference number"
                                                value={referenceNumber}
                                                onChange={(e) => {
                                                    setReferenceNumber(e.target.value);
                                                }}
                                                onBlur={(e) => {
                                                    setFilters({
                                                        ...filters,
                                                        referenceNumber
                                                    });
                                                }}
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="level-item">
                                {/* <form> */}
                                <div className="field has-addons">
                                    <div className="control">
                                        <input
                                            className="input"
                                            placeholder="email"
                                            style={{ width: '180px' }}
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            onBlur={(e) => {
                                                setFilters({
                                                    ...filters,
                                                    email: email
                                                });
                                            }}
                                        />
                                    </div>
                                    <div className="control">
                                        <input
                                            className="input"
                                            placeholder="phone"
                                            style={{ width: '150px' }}
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            onBlur={(e) => {
                                                setFilters({
                                                    ...filters,
                                                    phone: phone
                                                });
                                            }}
                                        />
                                    </div>
                                    <div className="control">
                                        <button
                                            className="button is-info "
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setFilters({
                                                    ...filters,
                                                    email: email,
                                                    phone: phone
                                                });
                                            }}
                                        >
                                            Search
                                        </button>
                                    </div>
                                </div>
                                {/* </form> */}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <hr />
            <div
                className="table-container"
                style={{ height: '60vh', overflowY: 'auto' }}
            >
                <table className="table is-striped is-hoverable" id="main-table">
                    <thead>
                        <tr>
                            {Object.entries(header).map(([key, value]) => {
                                return (
                                    <th width="7.69%" key={key}>
                                        {value}
                                    </th>
                                );
                            })}
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rowsToRender ? (
                            rowsToRender.map((row) => {
                                return (
                                    <TableRowFormatter
                                        row={row}
                                        header={header}
                                        handleactions={handleActions}
                                        key={row._id}
                                        timezone={timezone}
                                        role={props.role}
                                    />
                                );
                            })
                        ) : loading ? null : (
                            <tr>
                                <td colSpan="13" className="has-text-centered">
                                    No items found...
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {loading ? <Loading fullheight={false} /> : null}
            </div>

            <RowModal />
            {/* <ConfirmDeleteModal /> */}
        </div>
    );
};

export default Table;
