import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FormField from './FormField';
import { useEffect, useState } from 'react';

const FormDailyReport = (props) => {
    // Form state
    const [country, setCountry] = useState('us');
    const [systemReference, setSystemReference] = useState('Amazon');
    const [referenceNumber, setReferenceNumber] = useState('');
    const [showReference2, setShowReference2] = useState(false);
    const [referenceNumber2, setReferenceNumber2] = useState('');
    const [systemReference2, setSystemReference2] = useState('Amazon');
    const [issue, setIssue] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [source, setSource] = useState('');
    // const [responseMethod, setResponseMethod] = useState('');
    const [response, setResponse] = useState('');
    const [requestToCt, setRequestToCt] = useState('');
    const [caseStatus, setCaseStatus] = useState('solved');
    const [follower, setFollower] = useState('');
    const [solution, setSolution] = useState('');

    // useEffect
    useEffect(() => {
        const rowData = props.rowData;
        console.log(rowData);
        if (rowData) {
            if (
                rowData.systemReferenceNumber &&
                Object.entries(rowData.systemReferenceNumber).length > 0
            ) {
                setReferenceNumber(rowData.systemReferenceNumber[0].number);
                // const rowOrigin = rowData.systemReferenceNumber[0].origin;
                // if (rowOrigin === 'any') {
                //     rowData.systemReferenceNumber[0].origin = 'Other';
                // }
                setSystemReference(rowData.systemReferenceNumber[0].origin);
                if (!!rowData.systemReferenceNumber[1]) {
                    setShowReference2(true);
                    setReferenceNumber2(rowData.systemReferenceNumber[1].number);
                    setSystemReference2(rowData.systemReferenceNumber[1].origin);
                }
            }
            if (rowData.issue) {
                setIssue(rowData.issue);
            }
            if (rowData.country) {
                setCountry(rowData.country);
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
            // if (rowData.responseMethod) {
            //     setResponseMethod(rowData.responseMethod);
            // }
            if (rowData.response) {
                setResponse(rowData.response);
            }
            if (rowData.requestToCt) {
                setRequestToCt(rowData.requestToCt);
            }
            if (rowData.caseStatus) {
                setCaseStatus(rowData.caseStatus);
            }
            if (props.role === 'ct reviewer') {
                const reviewerUsername =
                    props.reviewerUsername.charAt(0).toUpperCase() +
                    props.reviewerUsername.slice(1);
                setFollower(reviewerUsername);
            }
            if (rowData.follower) {
                setFollower(rowData.follower);
            }
            if (rowData.solution) {
                setSolution(rowData.solution);
            }
        }
    }, []);

    // // toISOstring without timezone shifting
    // const toIsoString = function (dt) {
    //     var tzo = -dt.getTimezoneOffset(),
    //         dif = tzo >= 0 ? '+' : '-',
    //         pad = function (num) {
    //             var norm = Math.floor(Math.abs(num));
    //             return (norm < 10 ? '0' : '') + norm;
    //         };
    //     return (
    //         dt.getFullYear() +
    //         '-' +
    //         pad(dt.getMonth() + 1) +
    //         '-' +
    //         pad(dt.getDate()) +
    //         'T' +
    //         pad(dt.getHours()) +
    //         ':' +
    //         pad(dt.getMinutes()) +
    //         ':' +
    //         pad(dt.getSeconds()) +
    //         dif +
    //         pad(tzo / 60) +
    //         ':' +
    //         pad(tzo % 60)
    //     );
    // };

    // const referenceArray = [];
    // useEffect(() => {
    //     if (referenceNumber) {
    //         referenceArray.push({
    //             origin: systemReference,
    //             number: referenceNumber.trim()
    //         });
    //     }
    //     if (referenceNumber2) {
    //         referenceArray.push({
    //             origin: systemReference2,
    //             number: referenceNumber2.trim()
    //         });
    //     }
    //     console.log(referenceArray);
    //     console.log(row);
    // }, [referenceNumber, referenceNumber2]);

    const row = {
        // date: toIsoString(new Date()),
        date: new Date(),
        ...(country && { country }),
        ...(issue && { issue: issue.trim() }),
        ...((referenceNumber || referenceNumber2) && {
            // systemReferenceNumber: [referenceArray]
            systemReferenceNumber: [
                // { origin: systemReference, number: referenceNumber.trim() },
                // { origin: systemReference2, number: referenceNumber2.trim() }
                systemReference !== 'None' && referenceNumber !== ''
                    ? { origin: systemReference, number: referenceNumber.trim() }
                    : undefined,
                systemReference2 !== 'None' && referenceNumber2 !== ''
                    ? // systemReference2 !== 'None'
                      { origin: systemReference2, number: referenceNumber2.trim() }
                    : undefined
            ].filter((ele) => ele !== undefined)
        }),
        ...(name && { customerName: name.trim() }),
        ...(phone && { customerPhone: phone.trim() }),
        ...(email && { customerEmail: email.trim() }),
        ...(source && { source: source.trim() }),
        // ...(responseMethod && { responseMethod }),
        ...(response && { response: response.trim() }),
        ...(requestToCt && { requestToCt: requestToCt.trim() }),
        ...(caseStatus && { caseStatus }),
        ...(follower && { follower: follower.trim().toLowerCase() }),
        ...(solution && { solution: solution.trim() })
    };

    const handleSubmitAddOneRow = async (e) => {
        e.preventDefault();
        if (issue && source && caseStatus) {
            //     // clearState();
            // console.log(row.date);
            // console.log(new Date());
            // console.log(row);
            console.log(row);
            props.handleonerow(row, props.rowData ? props.rowData._id : null);
        }
    };

    const handleAddReferenceNumber = (e) => {
        e.preventDefault();
        setShowReference2(true);
    };

    return (
        <form onSubmit={handleSubmitAddOneRow}>
            <div className="container">
                <FormField label="Country">
                    <div className="field is-narrow">
                        <div className="control">
                            <div className="select is-fullwidth">
                                <select
                                    value={country}
                                    onChange={(e) => {
                                        setCountry(e.target.value);
                                    }}
                                    disabled={props.role === 'ct reviewer'}
                                    required
                                    autoFocus
                                >
                                    <option value="us">US</option>
                                    <option value="ca">CA</option>
                                    <option value="uk">UK</option>
                                    <option value="de">DE</option>
                                    {/* <option value=""></option> */}
                                </select>
                            </div>
                        </div>
                    </div>
                </FormField>

                <FormField label="Source">
                    <div className="field">
                        <div className="control">
                            <div className="select">
                                <select
                                    value={source}
                                    onChange={(e) => {
                                        setSource(e.target.value);
                                    }}
                                    disabled={props.role === 'ct reviewer'}
                                    required
                                >
                                    <option value="phone">phone</option>
                                    <option value="lost calls">lost calls</option>
                                    <option value="facebook">facebook</option>
                                    <option value="amazon">amazon</option>
                                    <option value="salesforce">salesforce</option>
                                    <option value="ct request">CT request</option>
                                    {/* needed to check for values that aren't of the above, adds them to option */}
                                    {row.source &&
                                    ![
                                        'phone',
                                        'lost calls',
                                        'facebook',
                                        'amazon',
                                        'salesforce',
                                        'ct request'
                                    ].includes(row.source) ? (
                                        <option value={row.source}>{row.source}</option>
                                    ) : null}
                                </select>
                            </div>
                            {/* <input
                                className="input"
                                type="text"
                                value={source}
                                onChange={(e) => {
                                    setSource(e.target.value);
                                }}
                                placeholder="Case's source"
                                required
                                // autoFocus
                                disabled={props.role === 'ct reviewer'}
                            /> */}
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
                                    disabled={props.role === 'ct reviewer'}
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
                                disabled={
                                    systemReference === 'None'
                                        ? true
                                        : false || props.role === 'ct reviewer'
                                }
                                onBlur={() =>
                                    props.handleonblur
                                        ? props.handleonblur({ referenceNumber })
                                        : null
                                }
                            />
                        </p>
                        <button
                            className="button is-primary is-outlined"
                            onClick={handleAddReferenceNumber}
                            type="button"
                            disabled={
                                systemReference === 'None'
                                    ? true
                                    : false || props.role === 'ct reviewer'
                            }
                        >
                            <span className="icon">
                                <FontAwesomeIcon
                                    icon={['fas', 'plus-circle']}
                                    size="1x"
                                />
                            </span>
                        </button>
                    </div>
                </FormField>

                {/* 2nd Reference Number */}
                {!showReference2 ? null : (
                    <FormField label="">
                        <div className="field has-addons">
                            <div className="control">
                                <span className="select">
                                    <select
                                        value={systemReference2}
                                        onChange={(e) => {
                                            if (e.target.value === 'None') {
                                                setReferenceNumber2('');
                                            }
                                            setSystemReference2(e.target.value);
                                        }}
                                        disabled={props.role === 'ct reviewer'}
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
                                    value={referenceNumber2}
                                    onChange={(e) => {
                                        setReferenceNumber2(e.target.value);
                                    }}
                                    disabled={
                                        systemReference2 === 'None'
                                            ? true
                                            : false || props.role === 'ct reviewer'
                                    }
                                    onBlur={() =>
                                        props.handleonblur
                                            ? props.handleonblur({ referenceNumber2 })
                                            : null
                                    }
                                />
                            </p>
                        </div>
                    </FormField>
                )}

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
                                disabled={props.role === 'ct reviewer'}
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
                                disabled={props.role === 'ct reviewer'}
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
                                disabled={props.role === 'ct reviewer'}
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
                                disabled={props.role === 'ct reviewer'}
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
                    {/* <div className="field">
                        <p className="control has-icons-left">
                            <input
                                className="input"
                                type="text"
                                placeholder="Response Method"
                                value={responseMethod}
                                onChange={(e) => {
                                    setResponseMethod(e.target.value);
                                }}
                                disabled={props.role === 'ct reviewer'}
                            />
                            <span className="icon is-small is-left">
                                <FontAwesomeIcon icon={['fas', 'user']} size="1x" />
                            </span>
                        </p>
                    </div> */}
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
                                disabled={props.role === 'ct reviewer'}
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
                                disabled={props.role === 'ct reviewer'}
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
                                    autoFocus={
                                        props.role === 'ct reviewer' ? true : false
                                    }
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

                {props.role !== 'ct reviewer' ? null : (
                    <FormField label="Follower">
                        <div className="field">
                            <div className="control">
                                <div className="select is-fullwidth">
                                    <select
                                        value={follower}
                                        onChange={(e) => {
                                            setFollower(e.target.value);
                                        }}
                                    >
                                        <option value="Sabrina">Sabrina</option>
                                        <option value="Candy">Candy</option>
                                        <option value="Bella">Bella</option>
                                        <option value="Steven">Steven</option>
                                        <option value="Ricardo">Ricardo</option>
                                        <option value="Sam">Sam</option>
                                        <option value="Francis">Francis</option>
                                        <option value="Camillo">Camillo</option>
                                    </select>
                                </div>
                                {/* <input
                                    className="input"
                                    placeholder="Follower"
                                    value={follower}
                                    onChange={(e) => {
                                        setFollower(e.target.value);
                                    }}
                                ></input> */}
                            </div>
                        </div>
                    </FormField>
                )}

                {props.role !== 'ct reviewer' ? null : (
                    <FormField label="Solution">
                        <div className="field">
                            <div className="control">
                                <input
                                    className="input"
                                    placeholder="Solution"
                                    value={solution}
                                    onChange={(e) => {
                                        setSolution(e.target.value);
                                    }}
                                ></input>
                            </div>
                        </div>
                    </FormField>
                )}

                <div className="buttons is-right mt-5">
                    <button
                        className="button is-primary mr-4"
                        id="submit-row-button"
                        type="submit"
                    >
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
