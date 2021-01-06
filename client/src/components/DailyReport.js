import Table from '../components/Table';
import Pagination from '../components/Pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

// Context

const DailyReport = (props) => {
    // console.log(props);
    const [currentUserReport, setCurrentUserReport] = useState('');

    useEffect(() => {
        if (props.userPermissions) {
            setCurrentUserReport(props.userPermissions[0]);
        }
        // console.log(props);
    }, []);

    return (
        <section className="section py-4" id="daily-report">
            {/* Container class to make it centered and narrow */}
            <div className="card">
                <header className="card-header">
                    <p className="card-header-title">
                        <span className="icon mr-2 ">
                            <FontAwesomeIcon icon={['fas', 'user']} size="1x" />
                        </span>
                        <span style={{ textTransform: 'capitalize' }}>
                            {currentUserReport ? currentUserReport : props.user}
                        </span>
                        's report
                    </p>
                    {!props.userPermissions ? null : (
                        <div className="card-header-icon">
                            <p className="has-text-weight-semibold mr-2">
                                CS Representative
                            </p>
                            <div className="field ">
                                <div className="control">
                                    <div className="select">
                                        <select
                                            value={currentUserReport}
                                            onChange={(e) => {
                                                setCurrentUserReport(e.target.value);
                                            }}
                                        >
                                            {props.userPermissions.map((user) => {
                                                return (
                                                    <option value={user} key={user}>
                                                        {user}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </header>

                <div className="card-content">
                    {props.role === 'ct reviewer' ? (
                        currentUserReport ? (
                            <Table
                                user={currentUserReport}
                                role={props.role}
                                reviewerUsername={props.user}
                            />
                        ) : null
                    ) : (
                        <Table user={props.user} role={props.role} />
                    )}
                </div>
                <footer className="card-footer">
                    <Pagination />
                </footer>
            </div>
        </section>
    );
};

export default DailyReport;
