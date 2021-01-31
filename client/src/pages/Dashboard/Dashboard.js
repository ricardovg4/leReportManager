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
import SkuStatusCard from 'components/SkuStatusCard';
import StatisticsCard from 'components/StatisticsCard';

// const RepresentativeReport = () => {
//     const [user, setUser] = useContext(UserContext);
//     const [trackingCardRender, setTrackingCardRender] = useState(0);

//     const toggleTrackingRender = (setRender) => {
//         setTrackingCardRender((prev) => !prev);
//     };
//     return (
//         <div>
//             <div className="columns is-mobile ">
//                 {/* hard coded widths! */}
//                 <div className="column is-1 p-0" style={{ width: '170px' }}>
//                     <Menu togglerender={toggleTrackingRender} />
//                 </div>
//                 {/* hard coded widths! */}
//                 <div
//                     className="column pl-0 pb-0"
//                     style={{ width: 'calc(100vw - 170px)' }}
//                 >
//                     <div>
//                         <Navbar />
//                         {/* conditional render based on menu's links */}
//                         {trackingCardRender ? (
//                             <TrackingCard togglerender={toggleTrackingRender} />
//                         ) : null}
//                         {/* conditional render based on menu's links */}
//                         <RowsDataUpdateProvider>
//                             <CreateReportRow user={user.username} />
//                             <PaginationProvider>
//                                 <DailyReport user={user.username} />
//                             </PaginationProvider>
//                         </RowsDataUpdateProvider>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// const ReviewerDashboard = () => {
//     const [user, setUser] = useContext(UserContext);
//     const [trackingCardRender, setTrackingCardRender] = useState(0);

//     const toggleTrackingRender = (setRender) => {
//         setTrackingCardRender((prev) => !prev);
//     };

//     return (
//         <div>
//             <div className="columns is-mobile ">
//                 {/* hard coded widths! */}
//                 <div className="column is-1 p-0" style={{ width: '170px' }}>
//                     <Menu togglerender={toggleTrackingRender} />
//                 </div>
//                 {/* hard coded widths! */}
//                 <div
//                     className="column pl-0 pb-0"
//                     style={{ width: 'calc(100vw - 170px)' }}
//                 >
//                     <div>
//                         <Navbar />
//                         {/* conditional render based on menu's links */}
//                         {skuRed ? (
//                             <skuStatusCard togglerender={toggleTrackingRender} />
//                         ) : null}
//                         {trackingCardRender ? (
//                             <TrackingCard togglerender={toggleTrackingRender} />
//                         ) : null}
//                         {/* conditional render based on menu's links */}
//                         <RowsDataUpdateProvider>
//                             {/* <CreateReportRow user={user.username} /> */}
//                             <PaginationProvider>
//                                 <DailyReport user={user.username} />
//                             </PaginationProvider>
//                         </RowsDataUpdateProvider>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

const Dashboard = () => {
    const [user, setUser] = useContext(UserContext);
    const [trackingCardRender, setTrackingCardRender] = useState(0);
    const [skuCardRender, setSkuCardRender] = useState(0);
    const [statisticsCardRender, setStatisticsCardRender] = useState(0);

    const toggleTrackingRender = (setRender) => {
        setTrackingCardRender((prev) => !prev);
    };
    const toggleSkuRender = (setRender) => {
        setSkuCardRender((prev) => !prev);
    };

    const toggleStatisticsRender = (setRender) => {
        setStatisticsCardRender((prev) => !prev);
    };

    return (
        <div>
            <div className="columns is-mobile ">
                {/* hard coded widths! */}
                <div className="column is-1 p-0" style={{ width: '170px' }}>
                    <Menu
                        toggletrackingrender={toggleTrackingRender}
                        toggleskurender={toggleSkuRender}
                        togglestatisticsrender={toggleStatisticsRender}
                    />
                </div>
                {/* hard coded widths! */}
                <div
                    className="column pl-0 pb-0"
                    style={{ width: 'calc(100vw - 170px)' }}
                >
                    <div>
                        <Navbar />
                        {/* conditional render based on menu's links */}
                        {skuCardRender ? (
                            <SkuStatusCard togglerender={toggleSkuRender} />
                        ) : null}

                        {trackingCardRender ? (
                            <TrackingCard togglerender={toggleTrackingRender} />
                        ) : null}
                        {statisticsCardRender ? (
                            <StatisticsCard
                                user={user.username}
                                role={user.role}
                                userPermissions={user.reportPermissions}
                                togglerender={toggleStatisticsRender}
                            />
                        ) : null}
                        {/* conditional render based on menu's links */}
                        <RowsDataUpdateProvider>
                            {/* <CreateReportRow user={user.username} /> */}
                            {user.role === 'cs representative' ? (
                                <CreateReportRow user={user.username} />
                            ) : null}
                            <PaginationProvider>
                                <DailyReport
                                    user={user.username}
                                    role={user.role}
                                    userPermissions={user.reportPermissions}
                                />
                            </PaginationProvider>
                        </RowsDataUpdateProvider>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Dashboard;
