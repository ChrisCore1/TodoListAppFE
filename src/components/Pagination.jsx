export const Pagination = ({ currentPage, lastPage, onPageChange }) => {
    if (!lastPage || lastPage <= 1) return null;

    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(lastPage, currentPage + 2);
    const pages = [];
    for(let i = startPage; i <= endPage; i++){
        pages.push(i);
    }

    return (
        <nav aria-label="Navegación de tabla">
            <ul className="pagination justify-content-center mt-4">

                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => onPageChange(1)}>
                        &laquo; Primera
                    </button>
                </li>

                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button 
                        className="page-link" 
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Anterior
                    </button>
                </li>
                
                {pages.map(page => (
                    <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => onPageChange(page)}>
                            {page}
                        </button>
                    </li>
                ))}

                <li className={`page-item ${currentPage === lastPage ? 'disabled' : ''}`}>
                    <button 
                        className="page-link" 
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === lastPage}
                    >
                        Siguiente
                    </button>
                </li>

                <li className={`page-item ${currentPage === lastPage ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => onPageChange(lastPage)}>
                        Ultima &raquo;
                    </button>
                </li>
            </ul>
        </nav>
    );
};