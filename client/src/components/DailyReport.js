import Table from '../components/Table';
import Pagination from '../components/Pagination';

const DailyReport = (props) => {
    return (
        <section className="section pt-4">
            <div className="card container">
                <header className="card-header">
                    <p className="card-header-title">{props.user}'s report</p>
                </header>
                <div className="card-content">
                    <Table />
                </div>
                <footer className="card-footer">
                    <Pagination />
                </footer>
            </div>
        </section>
    );
};

export default DailyReport;
