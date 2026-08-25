import { useState } from "react";
import { useCategories } from "../hooks/useCategories";
import { Modal } from "../components/Modal";

export const CategoryManagement = () => {
    const { categories, loading, addCategory, editCategory, removeCategory, getCategoryDetails } = useCategories();
    const [modalState, setModalState] = useState({ isOpen: false, type: 'none' });
    const [formData, setFormData] = useState({ name_category: '' });
    const [editingId, setEditingId] = useState(null);
    const [detailCategory, setDetailCategory] = useState(null);

    const openFormModal = (category = null) => {
        if(category) {
            setEditingId(category.category_id);
            setFormData({ name_category: category.name_category });
        }else{
            setEditingId(null);
            setFormData({ name_category: '' });
        }
        setModalState({ isOpen: true, type: 'form' });
    };

    const openDetailModal = async (id) => {
        try{
            const details = await getCategoryDetails(id);
            setDetailCategory(details);
            setModalState({ isOpen: true, type: 'detail' });
        }catch(e){
            alert('No se logro cargar la informacion de la categoria');
            console.error(e);
        }
    };

    const closeModal = () => {
        setModalState({ isOpen: false, type: 'none' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!formData.name_category.trim()) return alert('El nombre de la categoria es obligatorio');

        try{
            if(editingId){
                await editCategory(editingId, formData);
            }else{
                await addCategory(formData);
            }
        }catch (e){
            alert('Error al guardar la categoria');
        }
        closeModal();
    };

    const handleDelete = async (id) => {
        if(window.confirm('Esta usted seguro de eliminar esta categoria?')){
            try{
                await removeCategory(id);
            }catch (e){
                alert('Ocurrio un error al eliminar esta categoria');
                console.error(e);
            }
        }
    };
    
    if(loading) return <div className="text-center mt-5"><div className="spinner-border text-primary" /></div>;

    return (
        <div className="container mt-5">
            <div className="row justify-content-center mb-4">
                <div className="col-md-10 d-flex justify-content-between align-items-center">
                    <h2 className="mb-0">Lista de Categorias</h2>
                        <button className="btn btn-primary" onClick={() => openFormModal()}>
                        + Nueva Categoría
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
                                {categories.map(category => (
                                    <tr key={category.category_id}>
                                        <td className="align-middle fw-medium">{category.name_category}</td>
                                        <td className="text-end px-4">
                                            <button className="btn btn-sm btn-outline-info me-2" onClick={() => openDetailModal(category.category_id)}><i className="bi bi-eye-fill"></i> Ver</button>
                                            <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => openFormModal(category)}><i className="bi bi-pen-fill"></i> Editar</button>
                                            <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(category.category_id)}><i className="bi bi-trash3-fill"></i> Eliminar</button>
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
                title={editingId ? 'Editar Categoria' : 'Crear Categoría'} 
                onClose={closeModal}
            >
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Nombre</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={formData.name_category}
                            onChange={(e) => setFormData({ name_category: e.target.value })} 
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
                title="Informacion de la Categoria" 
                onClose={closeModal}
            >
                {detailCategory ? (
                    <div>
                        <p><i class="bi bi-pin-fill"></i><strong> ID:</strong> {detailCategory.category_id}</p>
                        <p><i class="bi bi-bookmark-star-fill"></i><strong> Nombre:</strong> {detailCategory.name_category}</p>
                    </div>
                ) : (
                    <div className="text-center"><div className="spinner-border spinner-border-sm" /></div>
                )}
            </Modal>
        </div>
    );
};
