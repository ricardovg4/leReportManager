import Navbar from '../../components/Navbar';
import DailyReport from '../../components/DailyReport';
import Menu from '../../components/Menu';

// Context
import { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { RowsDataUpdateProvider } from '../../context/RowsDataUpdateContext';
import { PaginationProvider } from '../../context/PaginationContext';

import CreateReportRow from 'components/CreateReportRow';
import TrackingCard from 'components/TrackingCard';

const Dashboard = () => {
    const [user, setUser] = useContext(UserContext);
    const [trackingCardRender, setTrackingCardRender] = useState(0);

    const toggleTrackingRender = (setRender) => {
        setTrackingCardRender((prev) => !prev);
    };

    return (
        <div>
            <div className="columns is-mobile ">
                {/* hard coded widths! */}
                <div className="column is-1 p-0" style={{ width: '170px' }}>
                    <Menu togglerender={toggleTrackingRender} />
                </div>
                {/* hard coded widths! */}
                <div
                    className="column pl-0 pb-0"
                    style={{ width: 'calc(100vw - 170px)' }}
                >
                    <div>
                        <Navbar />
                        {/* conditional render based on menu's links */}
                        {trackingCardRender ? (
                            <TrackingCard togglerender={toggleTrackingRender} />
                        ) : null}
                        {/* conditional render based on menu's links */}
                        <RowsDataUpdateProvider>
                            <CreateReportRow user={user} />
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
