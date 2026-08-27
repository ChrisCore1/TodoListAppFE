import { use, useState } from "react";
import { useTags } from "../hooks/useTags";
import { Modal } from "../components/Modal";

export const TagManagement = () => {
    const { tags, loading, addTag, getTagDetails, editTag } = useTags();
    const [modalState, setModalState] = useState({ isOpen: false, type: 'none' });
    const [formData, setFormData] = useState({ name_tag: '' });
    const [detailTag, setDetailTag] = useState(null);
    const [editingId, setEditingId] = useState(null);

    const openFormModal = (tag = null) => {
        if(tag){
            setEditingId(tag.tag_id);
            setFormData({ name_tag: tag.name_tag });
        }else{
            setEditingId(null);
            setFormData({ name_tag: '' });
        }
        setModalState({ isOpen: true, type: 'form' });
    };

    const openDetailModal = async (id) => {
        try{
            const details = await getTagDetails(id);
            setDetailTag(details);
            setModalState({ isOpen: true, type: 'detail' });
        }catch{
            alert('No se logro cargar la informacion de la etiqueta');
        }
    };

    const closeModal = () => {
        setModalState({ isOpen: false, type: 'none' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!formData.name_tag.trim()) return alert('El nombre de la etiqueta es obligatorio');

        try{
            if(editingId){
                await editTag(editingId, formData);
            }else{
                await addTag(formData);
            }
        }catch{
            alert('Error al guardar la etiqueta');
        }
        closeModal();
    };

    if(loading) return <div className="text-center mt-5"><div className="spinner-border text-primary" /></div>;

    return (
        <div className="container mt-5">
            <div className="row justify-content-center mb-4">
                <div className="col-md-10 d-flex justify-content-between align-items-center">
                    <h2 className="mb-0">Lista de Etiquetas</h2>
                    <button className="btn btn-primary" onClick={() => openFormModal()}>
                        + Nueva Etiqueta
                    </button>
                </div>
            </div>

            <div className="row justify-content-center">
                <div className="col-md-10">
                    <div className="card shadow-sm">
                        <table className="table table-hover mb-0">
                            <thead className="table-dark">
                                <tr>
                                    <th>Nombre</th>
                                    <th className="text-end px-4">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tags.map(tag => (
                                    <tr key={tag.tag_id}>
                                        <td className="align-middle fw-medium"><i className="bi bi-tags-fill"></i> {tag.name_tag}</td>
                                        <td className="text-end px-4">
                                            <button className="btn btn-sm btn-outline-info me-2" onClick={() => openDetailModal(tag.tag_id)}><i className="bi bi-eye-fill"></i> Ver</button>
                                            <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => openFormModal(tag)}><i className="bi bi-pen-fill"></i> Editar</button>
                                            <button className="btn btn-sm btn-outline-danger"><i className="bi bi-trash3-fill"></i> Eliminar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Modal 
                isOpen={modalState.isOpen && modalState.type === 'form'} 
                title={editingId ? 'Editar Categoria' : 'Crear Etiqueta'} 
                onClose={closeModal}
            >
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Nombre</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={formData.name_tag}
                            onChange={(e) => setFormData({ name_tag: e.target.value })} 
                            autoFocus
                        />
                    </div>
                    <div className="d-flex justify-content-end">
                        <button type="button" className="btn btn-secondary me-2" onClick={closeModal}>Cancelar</button>
                        <button type="submit" className="btn btn-primary">Guardar</button>
                    </div>
                </form>
            </Modal>

            <Modal 
                isOpen={modalState.isOpen && modalState.type === 'detail'} 
                title="Informacion de la Etiqueta" 
                onClose={closeModal}
            >
                {detailTag ? (
                    <div>
                        <p><i className="bi bi-pin-fill"></i><strong> ID:</strong> {detailTag.tag_id}</p>
                        <p><i className="bi bi-tags-fill"></i><strong> Nombre:</strong> {detailTag.name_tag}</p>
                    </div>
                ) : (
                    <div className="text-center"><div className="spinner-border spinner-border-sm" /></div>
                )}
            </Modal>
        </div>
    );
};
