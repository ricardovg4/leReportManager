import { useEffect, useState, useContext } from 'react';
import getReportRows from '../apiCalls/reportRows/getReportRows';
import { header, lastPage, rows } from '../apiCalls/reportRows/utils/formatter';
import Loading from '../pages/Loading/Loading';

// Context
import { PaginationContext } from '../context/PaginationContext';

const Table = (props) => {
    const [rowsData, setRowsData] = useState();
    const [numberOfRows, setNumberOfRows] = useState(10);

    // Context
    const [
        currentPage,
        setCurrentPage,
        lastPageAvailable,
        setLastPageAvailable
    ] = useContext(PaginationContext);

    useEffect(() => {
        const getRows = async () => {
            const result = await getReportRows();
            return result;
        };
        getRows().then((data) => setRowsData(data));
    }, []);

    useEffect(() => {
        setLastPageAvailable(lastPage);
    }, [lastPage]);

    return (
        // add box for style
        <div className="table-container" style={{ height: '75vh', overflowY: 'auto' }}>
            <table className="table is-striped is-hoverable">
                <thead>
                    <tr>
                        {Object.entries(header).map(([key, value]) => {
                            return <th key={key}>{value}</th>;
                        })}
                    </tr>
                </thead>
                <tbody>
                    {rowsData ? rows(rowsData, numberOfRows, currentPage) : null}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
