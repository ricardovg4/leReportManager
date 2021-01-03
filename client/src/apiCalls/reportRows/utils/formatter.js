import header from './reportHeader';

const { FontAwesomeIcon } = require('@fortawesome/react-fontawesome');

const ButtonIcon = (props) => {
    return (
        <button
            className={`button is-small is-outlined  ${props.classColor}`}
            style={props.style}
            onClick={(e) => {
                editID = props.id;
            }}
        >
            <span className="icon">
                <FontAwesomeIcon icon={['fas', props.icon]} size="1x" />
            </span>
        </button>
    );
};

let editID = null;

const formatter = (rowsData) => {
    const res = rowsData.map((row) => {
        let keyNumber = 0;
        return (
            <tr key={row._id}>
                {Object.entries(header).map(([key, value]) => {
                    // number for each cell for key attr required by react
                    ++keyNumber;
                    let keyTdProp = row._id + keyNumber;
                    if (key in row) {
                        let cell;

                        // check if object to format system reference number
                        switch (typeof row[key]) {
                            case 'object':
                                cell = Object.entries(row[key]).map(([key, value]) => {
                                    let spacer = key == 0 ? '' : ', ';
                                    return String(
                                        `${spacer}${value.origin}: ${value.number}`
                                    );
                                });
                                break;
                            case 'string':
                                const date = new Date(row[key]);
                                const formatedDate = row[key].slice(0, 10);
                                cell =
                                    date == 'Invalid Date' ? (
                                        row[key]
                                    ) : (
                                        <span style={{ color: '#7a7a7a' }}>
                                            {formatedDate}
                                        </span>
                                    );
                                // cell = row[key];
                                break;
                            default:
                                cell = String(row[key]);
                                break;
                        }

                        // Check for Case Status to format as tag
                        switch (row[key]) {
                            case 'pending':
                                cell = <span className="tag is-danger">{row[key]}</span>;
                                break;
                            case 'solved':
                                cell = <span className="tag">{row[key]}</span>;
                                break;
                            case 'waiting for cs answer':
                                cell = <span className="tag is-warning">{row[key]}</span>;
                                break;

                            default:
                                cell = <span style={{ fontSize: '14px' }}>{cell}</span>;
                                break;
                        }
                        return (
                            <td
                                style={{
                                    width: 'calc(100% / 13)',
                                    wordBreak: 'break-word'
                                }}
                                key={keyTdProp}
                            >
                                {cell}
                            </td>
                        );
                    } else {
                        return (
                            <td
                                style={{
                                    width: 'calc(100% / 14)',
                                    wordBreak: 'break-word'
                                }}
                                key={keyTdProp}
                            ></td>
                        );
                    }
                })}
                <td style={{ width: 'calc(100% / 14)' }}>
                    <div className="field is-horizontal">
                        <ButtonIcon
                            icon="edit"
                            classColor="is-primary"
                            style={{ marginRight: '6px' }}
                            id={row._id}
                        />
                        <ButtonIcon icon="trash" classColor="is-danger" />
                    </div>
                </td>
            </tr>
        );
    });
    return res;
};

let lastPage = false;

const rows = (rowsData, numberOfRows, currentPage, filters) => {
    let allRows = formatter(rowsData);
    const start = numberOfRows * (currentPage - 1);
    const last = numberOfRows * currentPage;
    lastPage = allRows.length >= start && allRows.length <= last ? true : false;
    return allRows.slice(start, last);
};

export { header, rows, lastPage, editID };
