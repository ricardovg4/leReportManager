import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useContext, useEffect } from 'react';
import postReportRows from 'apiCalls/reportRows/postReportRows';
import getReportRows from 'apiCalls/reportRows/getReportRows';

// Context
import { RowsDataUpdateContext } from '../context/RowsDataUpdateContext';
import FormDailyReportRow from './FormDailyReportRow';
import TableRowFormatter from './TableRowFormatter';
import header from '../apiCalls/reportRows/utils/reportHeader';

const CreateReportRow = (props) => {
    const [addOne, setAddOne] = useState(false);
    const [cancelModal, setCancelModal] = useState('');
    const [query, setQuery] = useState({
        email: null,
        phone: null,
        referenceNumber: null,
        referenceNumber2: null
    });
    const [rowsMatch, setRowsMatch] = useState(null);

    const resetQuery = {
        email: null,
        phone: null,
        referenceNumber: null,
        referenceNumber2: null
    };

    // Context
    const [rowsDataUpdate, setRowsDataUpdate] = useContext(RowsDataUpdateContext);

    const handlePostAddOneRow = async (row) => {
        const button = document.getElementById('submit-row-button');
        button.classList.toggle('is-loading');
        const res = await postReportRows(props.user, row);
        if (res) {
            button.classList.toggle('is-loading');
            setAddOne(false);
            alert('row entered successfully!');
            setRowsDataUpdate(rowsDataUpdate + 1);
            // reset rows match state
            setRowsMatch(null);
            setQuery(resetQuery);
            return true;
        }
        if (!res) {
            alert(
                "couldn't post row request, check your internet connection or save your work and re-login"
            );
            return false;
        }
    };

    // Must check for: phone, email, reference numbers
    // blur handler for form
    const handleOnBlur = (queryFromForm) => {
        // console.log(queryFromForm);
        const key = Object.keys(queryFromForm)[0];
        if (queryFromForm[key] && query[key] !== queryFromForm[key]) {
            setQuery({ ...query, ...queryFromForm });
        }
        // set state to null if it's not already when the returned data is empty
        // if (query[key] !== null && queryFromForm[key] === '') {
        if (queryFromForm[key] === '') {
            queryFromForm[key] = null;
            setQuery({ ...query, ...queryFromForm });
        }
    };
    useEffect(() => {
        // console.log(query);
        if (
            query.email ||
            query.phone ||
            query.referenceNumber ||
            query.referenceNumber2
        ) {
            const getPostFiltered = async () => {
                const rowsMatching = await getReportRows(props.user, query);
                setRowsMatch(rowsMatching);
            };
            getPostFiltered();
        }
        if (!query.email && !query.phone && !query.referenceNumber) {
            setRowsMatch(null);
        }
    }, [query]);

    // Modal helpers
    const handleAddOne = (e) => {
        e.preventDefault();
        setAddOne(true);
    };

    const handleCancelModal = (e) => {
        e.preventDefault();
        setCancelModal('');
    };

    const confirmCancelAddOne = (e) => {
        e.preventDefault();
        setCancelModal('is-active');
    };

    const handleCancelAddOne = (e) => {
        e.preventDefault();
        // clearState();
        setAddOne(false);
        setCancelModal('');
        // clear row lookup state
        setRowsMatch(null);
        setQuery(resetQuery);
    };

    const AddOneButton = () => {
        return (
            <div className="buttons is-centered">
                <button className="button is-primary" onClick={handleAddOne}>
                    <span className="icon">
                        <FontAwesomeIcon icon={['fas', 'plus-circle']} size="1x" />
                    </span>
                    <span>Add one!</span>
                </button>
            </div>
        );
    };

    return (
        <section className="section pt-4 pb-2">
            <div className="card">
                <header className="card-header">
                    <p className="card-header-title">Add a new row</p>
                </header>
                <div className="card-content">
                    {!addOne ? (
                        <AddOneButton />
                    ) : (
                        <FormDailyReportRow
                            confirmcancelone={confirmCancelAddOne}
                            handleonerow={handlePostAddOneRow}
                            handleonblur={handleOnBlur}
                        >
                            <div className="content">
                                <p className="help has-text-info">
                                    If any row contains the fields: Reference Number (just
                                    the number), phone or email, the rows will show up
                                    below.
                                </p>
                            </div>
                        </FormDailyReportRow>
                    )}
                </div>
                {!rowsMatch ? null : (
                    <div>
                        <div className="notification is-warning mb-0 py-2">
                            {/* <button class="delete"></button> */}
                            <h6 className="title is-6 has-text-centered">
                                Previous request(s) found with same data...
                            </h6>
                        </div>
                        <footer className="card-footer">
                            <div className="card-footer-item">
                                <div
                                    className="table-container"
                                    style={{ overflowY: 'auto' }}
                                >
                                    <table
                                        className="table is-striped is-hoverable"
                                        id="main-table"
                                    >
                                        <thead>
                                            <tr>
                                                {Object.entries(header).map(
                                                    ([key, value]) => {
                                                        return <th key={key}>{value}</th>;
                                                    }
                                                )}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {rowsMatch.map((row) => {
                                                return (
                                                    <TableRowFormatter
                                                        row={row}
                                                        header={header}
                                                        key={row._id + 'createRerportRow'}
                                                        style={{ height: '100%' }}
                                                    />
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </footer>
                    </div>
                )}
                {/* // Modal */}
                <div className={`modal ${cancelModal}`}>
                    <div className="modal-background"></div>
                    <div className="modal-card">
                        <header className="modal-card-head has-background-danger">
                            <p className="modal-card-title has-text-white">Cancel</p>
                            <button
                                className="delete"
                                aria-label="close"
                                onClick={handleCancelModal}
                            ></button>
                        </header>
                        <section className="modal-card-body">
                            <div className="content">
                                <p>
                                    This action will delete all fields, are you sure you
                                    want to continue?
                                </p>
                            </div>
                        </section>
                        <footer className="modal-card-foot">
                            <button
                                className="button is-danger"
                                onClick={handleCancelAddOne}
                            >
                                Discard changes
                            </button>
                            <button
                                className="button is-success"
                                onClick={handleCancelModal}
                            >
                                Go back
                            </button>
                        </footer>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CreateReportRow;
