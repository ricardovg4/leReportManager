import Navbar from '../../components/Navbar';
import DailyReport from '../../components/DailyReport';
import Menu from '../../components/Menu';

// Context
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

import { PaginationProvider } from '../../context/PaginationContext';

const Dashboard = () => {
    const [user, setUser] = useContext(UserContext);

    return (
        <div>
            <div className="columns is-mobile is-fullheight">
                {/* hard coded widths! */}
                <div className="column is-1 pr-0 " style={{ width: '200px' }}>
                    <Menu />
                </div>
                {/* hard coded widths! */}
                <div className="column pl-0" style={{ width: 'calc(100vw - 200px)' }}>
                    <div>
                        <Navbar />
                        <PaginationProvider>
                            <DailyReport user={user} />
                        </PaginationProvider>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Dashboard;
