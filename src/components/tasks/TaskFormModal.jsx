import { Modal } from "../Modal";

export const TaskFormModal = ({
    isOpen,
    onClose,
    onSubmit,
    formData,
    setFormData,
    categories,
    tags,
    handleTagSelect
}) => {
    return(
        <Modal 
            isOpen={isOpen} 
            title={'Crear Tarea'} 
            onClose={onClose}
        >
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label className="form-label">Titulo</label>
                    <input 
                        type="text"
                        className="form-control"
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                </div>
                
                <div className="mb-3">
                    <label className="form-label">Descripcion</label>
                    <textarea 
                        className="form-control" 
                        rows="3"
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
                    />
                </div>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <label className="form-label">Seleccione una Categoria</label>
                        <select 
                            className="form-select" 
                            onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                        >
                            <option value="">Ninguna</option>
                            {categories.map(cat => (
                                <option key={cat.category_id} value={cat.category_id}>
                                    {cat.name_category}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-md-6">
                        <label className="form-label d-block">Etiquetas</label>
                        <div 
                            className="border rounded p-2 bg-white" 
                            style={{ maxHeight: '130px', overflowY: 'auto' }}
                        >
                            {tags.length === 0 ? (
                                <small className="text-muted">No hay etiquetas disponibles</small>
                            ) : (
                                tags.map(tag => (
                                    <div key={tag.tag_id} className="form-check">
                                        <input 
                                            className="form-check-input" 
                                            type="checkbox" 
                                            id={`tag-${tag.tag_id}`} 
                                            checked={formData.tags.includes(tag.tag_id.toString())}
                                            onChange={() => handleTagSelect(tag.tag_id)}
                                            style={{ cursor: 'pointer' }}
                                        />
                                        <label 
                                            className="form-check-label w-100" 
                                            htmlFor={`tag-${tag.tag_id}`}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            {tag.name_tag}
                                        </label>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                <div className="d-flex justify-content-end">
                    <button type="button" className="btn btn-secondary me-2" onClick={onClose}>Cancelar</button>
                    <button type="submit" className="btn btn-primary">Guardar</button>
                </div>
            </form>
        </Modal>
    );
};
