import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
const { FontAwesomeIcon } = require('@fortawesome/react-fontawesome');

// Dayjs initialization for plugins
dayjs.extend(utc);
dayjs.extend(timezone);

const ButtonIcon = (props) => {
    return (
        <button
            className={`button is-small is-outlined  ${props.classColor}`}
            style={props.style}
            onClick={props.onclick}
        >
            <span className="icon">
                <FontAwesomeIcon icon={['fas', props.icon]} size="1x" />
            </span>
        </button>
    );
};

const TableRowFormatter = (props) => {
    // console.log(props);
    const row = props.row;
    let keyNumber = 0;
    return (
        <tr key={row._id}>
            {Object.entries(props.header).map(([key, value]) => {
                // number for each cell for key attr required by react
                ++keyNumber;
                let keyTdProp = row._id + keyNumber;
                if (key in row) {
                    let cell;

                    // check if object to format system reference number
                    switch (key) {
                        case 'systemReferenceNumber':
                            cell = Object.entries(row[key]).map(([key, value]) => {
                                let spacer = key == 0 ? '' : ', ';
                                return String(
                                    `${spacer}${value.origin}: ${value.number}`
                                );
                            });
                            // cell = <pre>{JSON.stringify(row[key])}</pre>;
                            break;

                        case 'date':
                            const formatedDate = dayjs(row[key])
                                .tz(props.timezone ? props.timezone : 'Etc/UTC')
                                .format('DD-MM-YYYY');
                            cell = !dayjs(row[key]).isValid() ? (
                                row[key]
                            ) : (
                                <span style={{ color: '#7a7a7a' }}>{formatedDate}</span>
                            );

                            break;

                        // Check for Case Status to format as tag
                        case 'caseStatus':
                            switch (row[key]) {
                                case 'pending':
                                    cell = (
                                        <span className="tag is-danger">{row[key]}</span>
                                    );
                                    break;
                                case 'solved':
                                    cell = <span className="tag">{row[key]}</span>;
                                    break;
                                case 'waiting for cs answer':
                                    cell = (
                                        <span className="tag is-warning">{row[key]}</span>
                                    );
                                    break;

                                default:
                                    break;
                            }
                            // }
                            break;

                        case 'country':
                            cell = String(row[key]).toUpperCase();
                            break;
                        case 'follower':
                            const str = String(row[key]);
                            const followerUsername =
                                str.charAt(0).toUpperCase() + str.slice(1);
                            cell = followerUsername;
                            break;

                        // Default as string
                        default:
                            cell = String(row[key]);
                            break;
                    }

                    return (
                        <td
                            style={{
                                // width: 'calc(100% / 13)',
                                wordBreak: 'break-word'
                            }}
                            key={keyTdProp}
                        >
                            <span style={{ fontSize: '13px' }}>{cell}</span>
                        </td>
                    );
                } else {
                    return (
                        <td
                            style={{
                                // width: 'calc(100% / 13)',
                                wordBreak: 'break-word'
                            }}
                            key={keyTdProp}
                        ></td>
                    );
                }
            })}
            {!props.handleactions ? null : (
                // <td style={{ width: 'calc(100% / 14)' }}>
                <td>
                    <div className="field is-horizontal">
                        <ButtonIcon
                            icon="edit"
                            classColor="is-primary"
                            // style={{ marginRight: '6px' }}
                            style={{ margin: 'auto' }}
                            onclick={() => props.handleactions(row._id, 'edit')}
                        />
                        {/* {props.role === 'ct reviewer' ? null : (
                            <ButtonIcon
                                icon="trash"
                                classColor="is-danger"
                                onclick={() => props.handleactions(row._id, 'delete')}
                            />
                        )} */}
                    </div>
                </td>
            )}
        </tr>
    );
};

export default TableRowFormatter;
