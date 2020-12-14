import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useContext } from 'react';
import FormField from './FormField';
import postReportRows from 'apiCalls/reportRows/postReportRows';

// Context
import { RowsDataUpdateContext } from '../context/RowsDataUpdateContext';
import FormDailyReport from './FormDailyReportRow';

const CreateReportRow = () => {
    const [addOne, setAddOne] = useState(false);

    // Form state
    const [systemReference, setSystemReference] = useState('Amazon');
    const [referenceNumber, setReferenceNumber] = useState('');
    const [issue, setIssue] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [source, setSource] = useState('');
    const [responseMethod, setResponseMethod] = useState('');
    const [response, setResponse] = useState('');
    const [requestToCt, setRequestToCt] = useState('');
    const [caseStatus, setCaseStatus] = useState('solved');

    const [cancelModal, setCancelModal] = useState('');

    // Context
    const [rowsDataUpdate, setRowsDataUpdate] = useContext(RowsDataUpdateContext);

    // toISOstring without timezone shifting
    const toIsoString = function (dt) {
        var tzo = -dt.getTimezoneOffset(),
            dif = tzo >= 0 ? '+' : '-',
            pad = function (num) {
                var norm = Math.floor(Math.abs(num));
                return (norm < 10 ? '0' : '') + norm;
            };
        return (
            dt.getFullYear() +
            '-' +
            pad(dt.getMonth() + 1) +
            '-' +
            pad(dt.getDate()) +
            'T' +
            pad(dt.getHours()) +
            ':' +
            pad(dt.getMinutes()) +
            ':' +
            pad(dt.getSeconds()) +
            dif +
            pad(tzo / 60) +
            ':' +
            pad(tzo % 60)
        );
    };

    const row = {
        // date: toIsoString(new Date(new Date().setHours(0, 0, 0, 0))),
        date: toIsoString(new Date()),
        ...(issue && { issue }),
        ...(referenceNumber && {
            systemReferenceNumber: [{ origin: systemReference, number: referenceNumber }]
        }),
        ...(name && { customerName: name }),
        ...(phone && { customerName: phone }),
        ...(email && { customerName: email }),
        ...(source && { source }),
        ...(responseMethod && { responseMethod }),
        ...(response && { response }),
        ...(requestToCt && { requestToCt }),
        ...(caseStatus && { caseStatus })
    };

    const handleSubmitAddOneRow = async (e) => {
        e.preventDefault();
        const button = document.getElementById('submit-row-button');
        if (issue && source && caseStatus) {
            button.classList.toggle('is-loading');
            const res = await postReportRows(row);
            if (res) {
                button.classList.toggle('is-loading');
                clearState();
                setAddOne(false);
                alert('row entered successfully!');
                setRowsDataUpdate(rowsDataUpdate + 1);
                // must update current rows
                return true;
            }
            // Post row and loading submit button and success p
            return false;
            alert("couldn't post row request, please check your internet connection");
        }
    };

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

    const clearState = () => {
        setSystemReference('Amazon');
        setReferenceNumber('');
        setIssue('');
        setName('');
        setPhone('');
        setEmail('');
        setSource('');
        setResponseMethod('');
        setResponse('');
        setRequestToCt('');
        setCaseStatus('solved');
    };

    const handleCancelAddOne = (e) => {
        e.preventDefault();
        clearState();
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
                    {/* Messy solution, if an external component is used to render the form,
                     the form will be rerendered after every on change event, it has to be
                     directly placed in the main render */}
                    {!addOne ? (
                        // <AddOneButton />
                        <FormDailyReport />
                    ) : (
                        <form onSubmit={handleSubmitAddOneRow}>
                            <div className="container">
                                <FormField label="Source">
                                    <div className="field">
                                        <div className="control">
                                            <input
                                                className="input"
                                                type="text"
                                                value={source}
                                                onChange={(e) => {
                                                    setSource(e.target.value);
                                                }}
                                                placeholder="Case's source"
                                                required
                                                autoFocus
                                            />
                                        </div>
                                    </div>
                                </FormField>

                                <FormField label="Reference Number">
                                    <div className="field has-addons">
                                        <div className="control">
                                            <span className="select">
                                                <select
                                                    value={systemReference}
                                                    onChange={(e) => {
                                                        if (e.target.value === 'None') {
                                                            setReferenceNumber('');
                                                        }
                                                        setSystemReference(
                                                            e.target.value
                                                        );
                                                    }}
                                                >
                                                    <option value="Magento">
                                                        Magento
                                                    </option>
                                                    <option value="Amazon">Amazon</option>
                                                    <option value="Salesforce">
                                                        Salesforce
                                                    </option>
                                                    <option value="Other">Other</option>
                                                    <option value="None">None</option>
                                                </select>
                                            </span>
                                        </div>
                                        <p className="control">
                                            <input
                                                className="input"
                                                type="text"
                                                placeholder="Number"
                                                value={referenceNumber}
                                                onChange={(e) => {
                                                    setReferenceNumber(e.target.value);
                                                }}
                                                disabled={
                                                    systemReference === 'None'
                                                        ? true
                                                        : false
                                                }
                                            />
                                        </p>
                                    </div>
                                </FormField>

                                <FormField label="Issue">
                                    <div className="field">
                                        <div className="control">
                                            <textarea
                                                className="textarea"
                                                placeholder="Enter issue here"
                                                rows="1"
                                                value={issue}
                                                onChange={(e) => {
                                                    setIssue(e.target.value);
                                                }}
                                                required
                                            ></textarea>
                                        </div>
                                    </div>
                                </FormField>

                                <FormField label="Customer's info">
                                    <div className="field">
                                        <p className="control is-expanded has-icons-left">
                                            <input
                                                className="input"
                                                type="text"
                                                placeholder="Name"
                                                value={name}
                                                onChange={(e) => {
                                                    setName(e.target.value);
                                                }}
                                            />
                                            <span className="icon is-small is-left">
                                                <FontAwesomeIcon
                                                    icon={['fas', 'user']}
                                                    size="1x"
                                                />
                                            </span>
                                        </p>
                                    </div>
                                    <div className="field">
                                        <p className="control is-expanded has-icons-left">
                                            <input
                                                className="input"
                                                type="text"
                                                placeholder="Phone"
                                                value={phone}
                                                onChange={(e) => {
                                                    setPhone(e.target.value);
                                                }}
                                            />
                                            <span className="icon is-small is-left">
                                                <FontAwesomeIcon
                                                    icon={['fas', 'phone']}
                                                    size="1x"
                                                    flip="horizontal"
                                                />
                                            </span>
                                        </p>
                                    </div>
                                    <div className="field">
                                        <p className="control is-expanded has-icons-left has-icons-right">
                                            <input
                                                // className="input is-success"
                                                className="input"
                                                type="email"
                                                placeholder="Email"
                                                value={email}
                                                onChange={(e) => {
                                                    setEmail(e.target.value);
                                                }}
                                            />
                                            <span className="icon is-small is-left">
                                                <FontAwesomeIcon
                                                    icon={['fas', 'envelope']}
                                                    size="1x"
                                                />
                                            </span>
                                            {/* <span className="icon is-small is-right has-text-success">
                                                <FontAwesomeIcon
                                                    icon={['fas', 'check']}
                                                    size="1x"
                                                />
                                            </span> */}
                                        </p>
                                    </div>
                                </FormField>

                                <FormField label="Response">
                                    <div className="field">
                                        <p className="control has-icons-left">
                                            <input
                                                className="input"
                                                type="text"
                                                placeholder="Response Method"
                                                value={responseMethod}
                                                onChange={(e) => {
                                                    setResponseMethod(e.target.value);
                                                }}
                                            />
                                            <span className="icon is-small is-left">
                                                <FontAwesomeIcon
                                                    icon={['fas', 'user']}
                                                    size="1x"
                                                />
                                            </span>
                                        </p>
                                    </div>
                                    <div className="field">
                                        <div className="control">
                                            <textarea
                                                className="textarea"
                                                placeholder="Enter response"
                                                rows="1"
                                                value={response}
                                                onChange={(e) => {
                                                    setResponse(e.target.value);
                                                }}
                                            ></textarea>
                                        </div>
                                    </div>
                                </FormField>

                                <FormField label="Request to CT">
                                    <div className="field">
                                        <div className="control">
                                            <textarea
                                                className="textarea"
                                                placeholder="Enter request here"
                                                rows="1"
                                                value={requestToCt}
                                                onChange={(e) => {
                                                    setRequestToCt(e.target.value);
                                                }}
                                            ></textarea>
                                        </div>
                                    </div>
                                </FormField>

                                <FormField label="Case status">
                                    <div className="field is-narrow">
                                        <div className="control">
                                            <div className="select is-fullwidth">
                                                <select
                                                    value={caseStatus}
                                                    onChange={(e) => {
                                                        setCaseStatus(e.target.value);
                                                    }}
                                                    required
                                                >
                                                    <option value="solved">Solved</option>
                                                    <option value="pending">
                                                        Pending
                                                    </option>
                                                    <option value="waiting for cs answer">
                                                        Waiting for cs answer
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </FormField>

                                <div className="buttons is-right mt-5">
                                    <button
                                        className="button is-primary mr-4"
                                        id="submit-row-button"
                                    >
                                        Submit
                                    </button>
                                    <button
                                        className="button is-danger"
                                        onClick={confirmCancelAddOne}
                                    >
                                        Cancel
                                    </button>

                                    <div className={`modal ${cancelModal}`}>
                                        <div className="modal-background"></div>
                                        <div className="modal-card">
                                            <header className="modal-card-head has-background-danger">
                                                <p className="modal-card-title has-text-white">
                                                    Cancel
                                                </p>
                                                <button
                                                    className="delete"
                                                    aria-label="close"
                                                    onClick={handleCancelModal}
                                                ></button>
                                            </header>
                                            <section className="modal-card-body">
                                                <div className="content">
                                                    <p>
                                                        This action will delete all
                                                        fields, are you sure you want to
                                                        continue?
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
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
};

export default CreateReportRow;
