export const Pagination = ({ currentPage, lastPage, onPageChange }) => {
    if (!lastPage || lastPage <= 1) return null;

    return (
        <nav aria-label="Navegación de tabla">
            <ul className="pagination justify-content-center mt-4">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button 
                        className="page-link" 
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Anterior
                    </button>
                </li>
                
                {[...Array(lastPage)].map((_, index) => {
                    const page = index + 1;
                    return (
                        <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => onPageChange(page)}>
                                {page}
                            </button>
                        </li>
                    );
                })}

                <li className={`page-item ${currentPage === lastPage ? 'disabled' : ''}`}>
                    <button 
                        className="page-link" 
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === lastPage}
                    >
                        Siguiente
                    </button>
                </li>
            </ul>
        </nav>
    );
};