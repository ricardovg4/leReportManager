import Table from '../components/Table';
import Pagination from '../components/Pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DailyReport = (props) => {
    return (
        <section className="section py-4">
            {/* Container class to make it centered and narrow */}
            <div className="card">
                <header className="card-header">
                    <p className="card-header-title">
                        <span className="icon mr-2 ">
                            <FontAwesomeIcon icon={['fas', 'user']} size="1x" />
                        </span>
                        {
                            <span style={{ textTransform: 'capitalize' }}>
                                {props.user}
                            </span>
                        }
                        's report
                    </p>
                </header>

                <div className="card-content">
                    <Table user={props.user} />
                </div>
                <footer className="card-footer">
                    <Pagination />
                </footer>
            </div>
        </section>
    );
};

export default DailyReport;
