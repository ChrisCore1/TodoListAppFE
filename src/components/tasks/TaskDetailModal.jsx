import { Modal } from "../Modal";

export const TaskDetailModal = ({
    isOpen,
    task,
    categories,
    onClose
}) => {
    return(
        <Modal
            isOpen={isOpen}
            title="Informacion de la Tarea"
            onClose={onClose}
        >
            {task && (
                <div>
                    <h4 className="fw-bold mb-3">{task.title}</h4>
                    
                    <div className="mb-3">
                        <h6 className="fw-bold text-muted mb-1">Descripción:</h6>
                        <p className="border p-2 rounded bg-light">
                            {task.description || <span className="text-muted fst-italic">Sin descripción detallada.</span>}
                        </p>
                    </div>
                    
                    <div className="row mb-3">
                        <div className="col-6">
                            <h6 className="fw-bold text-muted mb-1">Categoria:</h6>
                            <span className="badge bg-primary">
                                <i className="bi bi-bookmark-star-fill"> </i>
                                {categories.find(c => c.category_id == task.category_id)?.name_category || 'Ninguna'}
                            </span>
                        </div>
                        <div className="col-6">
                            <h6 className="fw-bold text-muted mb-1">Estado:</h6>
                            <span className={`badge ${task.status ? 'bg-success' : 'bg-warning text-dark'}`}>
                                {task.status ? 'Realizada' : 'Pendiente'}
                            </span>
                        </div>
                    </div>

                    <div className="mb-3">
                        <h6 className="fw-bold text-muted mb-1">Etiquetas:</h6>
                        <div className="d-flex flex-wrap gap-1">
                            {task.tags && task.tags.length > 0 ? (
                                task.tags.map(tag => (
                                    <span key={tag.tag_id} className="badge bg-secondary"><i className="bi bi-tags-fill"> </i>{tag.name_tag}</span>
                                ))
                            ) : (
                                <span className="text-muted small">Ninguna etiqueta asociada</span>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </Modal>
    );
};