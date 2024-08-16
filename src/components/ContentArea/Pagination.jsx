
import PropTypes from 'prop-types';

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;

    return (
        <div className="pagination mt-4 flex justify-center items-center gap-2">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={isFirstPage}
                className={`p-2 border rounded-lg ${isFirstPage ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
                title={isFirstPage ? 'No previous page' : ''}
            >
                Previous
            </button>
            {[...Array(totalPages).keys()].map((page) => (
                <button
                    key={page + 1}
                    onClick={() => handlePageChange(page + 1)}
                    className={`p-2 border rounded-lg ${currentPage === page + 1 ? 'bg-blue-500 text-white' : 'bg-white'}`}
                >
                    {page + 1}
                </button>
            ))}
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={isLastPage}
                className={`p-2 border rounded-lg ${isLastPage ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
                title={isLastPage ? 'No next page' : ''}
            >
                Next
            </button>
        </div>
    );
};

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    handlePageChange: PropTypes.func.isRequired,
};

export default Pagination;
