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
                                break;
                            default:
                                cell = String(row[key]);
                                break;
                        }
                        cell = <span style={{ fontSize: '14px' }}>{cell}</span>;
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
                                    width: 'calc(100% / 13)',
                                    wordBreak: 'break-word'
                                }}
                                key={keyTdProp}
                            ></td>
                        );
                    }
                })}
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

export { header, rows, lastPage };
