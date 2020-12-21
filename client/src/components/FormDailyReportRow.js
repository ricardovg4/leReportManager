import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FormField from './FormField';
import { useEffect, useState } from 'react';

const FormDailyReport = (props) => {
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

    // useEffect
    useEffect(() => {
        const rowData = props.rowData;
        if (rowData) {
            if (
                rowData.systemReferenceNumber &&
                Object.entries(rowData.systemReferenceNumber).length > 0
            ) {
                setReferenceNumber(rowData.systemReferenceNumber[0].number);
                const rowOrigin = rowData.systemReferenceNumber[0].origin;
                if (rowOrigin === 'any') {
                    rowData.systemReferenceNumber[0].origin = 'Other';
                }
                setSystemReference(rowData.systemReferenceNumber[0].origin);
            }
            if (rowData.issue) {
                setIssue(rowData.issue);
            }
            if (rowData.customerName) {
                setName(rowData.customerName);
            }
            if (rowData.customerPhone) {
                setPhone(rowData.customerPhone);
            }
            if (rowData.customerEmail) {
                setEmail(rowData.customerEmail);
            }
            if (rowData.source) {
                setSource(rowData.source);
            }
            if (rowData.responseMethod) {
                setResponseMethod(rowData.responseMethod);
            }
            if (rowData.response) {
                setResponse(rowData.response);
            }
            if (rowData.requestToCt) {
                setRequestToCt(rowData.requestToCt);
            }
            if (rowData.caseStatus) {
                setCaseStatus(rowData.caseStatus);
            }
        }
    }, []);

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
        // date: toIsoString(new Date()),
        date: new Date(),
        ...(issue && { issue }),
        ...(referenceNumber && {
            systemReferenceNumber: [{ origin: systemReference, number: referenceNumber }]
        }),
        ...(name && { customerName: name }),
        ...(phone && { customerPhone: phone }),
        ...(email && { customerEmail: email }),
        ...(source && { source }),
        ...(responseMethod && { responseMethod }),
        ...(response && { response }),
        ...(requestToCt && { requestToCt }),
        ...(caseStatus && { caseStatus })
    };

    const handleSubmitAddOneRow = async (e) => {
        e.preventDefault();
        if (issue && source && caseStatus) {
            //     // clearState();
            console.log(row.date);
            console.log(new Date());
            props.handleonerow(row, props.rowData ? props.rowData._id : null);
        }
    };

    return (
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
                                        setSystemReference(e.target.value);
                                    }}
                                    // onBlur={() =>
                                    //     props.handleonblur
                                    //         ? props.handleonblur({ systemReference })
                                    //         : null
                                    // }
                                >
                                    <option value="Magento">Magento</option>
                                    <option value="Amazon">Amazon</option>
                                    <option value="Salesforce">Salesforce</option>
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
                                disabled={systemReference === 'None' ? true : false}
                                onBlur={() =>
                                    props.handleonblur
                                        ? props.handleonblur({ referenceNumber })
                                        : null
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
                                <FontAwesomeIcon icon={['fas', 'user']} size="1x" />
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
                                onBlur={() =>
                                    props.handleonblur
                                        ? props.handleonblur({ phone })
                                        : null
                                }
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
                                onBlur={() =>
                                    props.handleonblur
                                        ? props.handleonblur({ email })
                                        : null
                                }
                            />
                            <span className="icon is-small is-left">
                                <FontAwesomeIcon icon={['fas', 'envelope']} size="1x" />
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
                                <FontAwesomeIcon icon={['fas', 'user']} size="1x" />
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
                                    <option value="pending">Pending</option>
                                    <option value="waiting for cs answer">
                                        Waiting for cs answer
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                </FormField>

                <div className="buttons is-right mt-5">
                    <button className="button is-primary mr-4" id="submit-row-button">
                        {props.submitButtonName || 'Submit'}
                    </button>
                    <button className="button is-danger" onClick={props.confirmcancelone}>
                        Cancel
                    </button>
                </div>
                {props.children}
            </div>
        </form>
    );
};

export default FormDailyReport;
