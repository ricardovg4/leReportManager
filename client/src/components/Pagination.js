import { useContext } from 'react';

// Context
import { PaginationContext } from '../context/PaginationContext';

const Pagination = (props) => {
    // const [paginationList, setPaginationList] = useState([0, 1, 2]);

    // Context
    const [
        currentPage,
        setCurrentPage,
        lastPageAvailable,
        setLastPageAvailable,
        paginationList,
        setPaginationList
    ] = useContext(PaginationContext);

    const changePagination = (direction) => {
        switch (direction) {
            case 'previous':
                setCurrentPage(currentPage - 1);
                setPaginationList(paginationList.map((n) => Number(n) - 1));
                break;
            case 'next':
                setCurrentPage(currentPage + 1);
                setPaginationList(paginationList.map((n) => Number(n) + 1));
                break;

            default:
                break;
        }
    };

    const handlePagination = (direction) => {
        switch (direction) {
            case 'previous':
                if (currentPage === 1) {
                    return;
                }
                changePagination(direction);
                break;
            case 'next':
                if (lastPageAvailable) {
                    return;
                }
                changePagination(direction);
                break;
            default:
                break;
        }
    };

    const paginationListLimits = (number) => {
        if (!number) {
            return { visibility: 'hidden' };
        }
        if (!number) {
            return null;
        }
        if (lastPageAvailable && number === currentPage + 1) {
            return { visibility: 'hidden' };
        }
    };

    return (
        <nav
            className="pagination card-footer-item"
            role="navigation"
            aria-label="pagination"
        >
            <a
                className="pagination-previous"
                onClick={() => handlePagination('previous')}
                disabled={currentPage === 1 ? true : false}
            >
                Previous
            </a>
            <a
                className="pagination-next"
                onClick={() => handlePagination('next')}
                disabled={lastPageAvailable ? true : false}
            >
                Next page
            </a>
            <ul className="pagination-list">
                {paginationList.map((number) => {
                    return (
                        <li key={number}>
                            <a
                                style={paginationListLimits(number)}
                                className={
                                    currentPage === number
                                        ? 'pagination-link is-current'
                                        : 'pagination-link'
                                }
                                onClick={() => {
                                    if (number > currentPage) {
                                        changePagination('next');
                                    }
                                    if (number < currentPage) {
                                        changePagination('previous');
                                    }
                                }}
                            >
                                {number}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};
export default Pagination;
