import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AddOneRow = () => {
    return (
        <div>
            <div className="container">
                {/* <FormField label="Test" type="singleInput">
                        <input
                            className="input"
                            type="text"
                            value={test}
                            onChange={(e) => {
                                setTest(e.target.value);
                            }}
                            placeholder="Case's source"
                        />
                    </FormField> */}
                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label">Source</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <input
                                    className="input"
                                    type="text"
                                    value={test}
                                    onChange={(e) => {
                                        setTest(e.target.value);
                                    }}
                                    placeholder="Case's source"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label">Reference Number</label>
                    </div>
                    <div className="field-body">
                        <div className="field has-addons">
                            <div className="control">
                                <span className="select">
                                    <select>
                                        <option>Magento</option>
                                        <option>Amazon</option>
                                        <option>Salesforce</option>
                                        <option>Other</option>
                                    </select>
                                </span>
                            </div>
                            <p className="control">
                                <input
                                    className="input"
                                    type="text"
                                    placeholder="Number"
                                />
                            </p>
                        </div>
                    </div>
                </div>

                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label">Issue</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <textarea
                                    className="textarea"
                                    placeholder="Enter issue here"
                                    rows="1"
                                ></textarea>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label">Customer's info</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <p className="control is-expanded has-icons-left">
                                <input className="input" type="text" placeholder="Name" />
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
                                    className="input is-success"
                                    type="email"
                                    placeholder="Email"
                                />
                                <span className="icon is-small is-left">
                                    <FontAwesomeIcon
                                        icon={['fas', 'envelope']}
                                        size="1x"
                                    />
                                </span>
                                <span className="icon is-small is-right has-text-success">
                                    <FontAwesomeIcon icon={['fas', 'check']} size="1x" />
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label">Response</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <p className="control has-icons-left">
                                <input
                                    className="input"
                                    type="text"
                                    placeholder="Response Method"
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
                                ></textarea>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label">Request to CT</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <textarea
                                    className="textarea"
                                    placeholder="Enter request here"
                                    rows="1"
                                ></textarea>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label">Case status</label>
                    </div>
                    <div className="field-body">
                        <div className="field is-narrow">
                            <div className="control">
                                <div className="select is-fullwidth">
                                    <select>
                                        <option>Solved</option>
                                        <option>Pending</option>
                                        <option>Waiting for CS</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="buttons is-right mt-5">
                    <button
                        className="button is-primary mr-4"
                        onClick={handleSubmitAddOneRow}
                    >
                        Submit
                    </button>
                    <button className="button is-danger" onClick={handleCancelAddOne}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddOneRow;
