import Navbar from '../../components/Navbar';
import DailyReport from '../../components/DailyReport';
import Menu from '../../components/Menu';

// Context
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { RowsDataUpdateProvider } from '../../context/RowsDataUpdateContext';

import { PaginationProvider } from '../../context/PaginationContext';
import CreateReportRow from 'components/CreateReportRow';

const Dashboard = () => {
    const [user, setUser] = useContext(UserContext);

    return (
        <div>
            <div className="columns is-mobile ">
                {/* hard coded widths! */}
                <div className="column is-1 p-0" style={{ width: '170px' }}>
                    <Menu />
                </div>
                {/* hard coded widths! */}
                <div
                    className="column pl-0 pb-0"
                    style={{ width: 'calc(100vw - 170px)' }}
                >
                    <div>
                        <Navbar />
                        <RowsDataUpdateProvider>
                            <CreateReportRow />
                            <PaginationProvider>
                                <DailyReport user={user} />
                            </PaginationProvider>
                        </RowsDataUpdateProvider>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Dashboard;
