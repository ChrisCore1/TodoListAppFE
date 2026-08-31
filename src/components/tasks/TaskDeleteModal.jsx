import { Modal } from "../Modal";

export const TaskDeleteModal = ({
    isOpen,
    task,
    onClose,
    onConfirm
}) => {
    return(
        <Modal
            isOpen={isOpen}
            title="Atencion!"
            onClose={onClose}
        >
            {task && (
                <div>
                    <div className="alert alert-danger shadow-sm">
                        <p className="mb-0">
                            Esta usted seguro de eliminar esta tarea? 
                            <br /> <strong>"{task.title}"</strong>
                        </p>
                    </div>
                    
                    <div className="d-flex justify-content-end">
                        <button type="button" className="btn btn-secondary me-2" onClick={onClose}>Cancelar</button>
                        <button type="button" className="btn btn-danger" onClick={onConfirm}>Sí, Eliminar</button>
                    </div>
                </div>
            )}
        </Modal>
    );
};
