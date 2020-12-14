import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useContext } from 'react';
import postReportRows from 'apiCalls/reportRows/postReportRows';

// Context
import { RowsDataUpdateContext } from '../context/RowsDataUpdateContext';
import FormDailyReport from './FormDailyReportRow';

const CreateReportRow = () => {
    const [addOne, setAddOne] = useState(false);
    const [cancelModal, setCancelModal] = useState('');

    // Context
    const [rowsDataUpdate, setRowsDataUpdate] = useContext(RowsDataUpdateContext);

    const handlePostAddOneRow = async (row) => {
        const button = document.getElementById('submit-row-button');
        button.classList.toggle('is-loading');
        const res = await postReportRows(row);
        if (res) {
            button.classList.toggle('is-loading');
            setAddOne(false);
            alert('row entered successfully!');
            setRowsDataUpdate(rowsDataUpdate + 1);
            return true;
        }
        alert("couldn't post row request, please check your internet connection");
        return false;
    };

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
                        <FormDailyReport
                            confirmcanceladdone={confirmCancelAddOne}
                            handlepostaddonerow={handlePostAddOneRow}
                        />
                    )}
                </div>
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
