import { useState } from "react";
import { useTasks } from "../hooks/useTasks";
import { useCategories } from "../hooks/useCategories";
import { useTags } from "../hooks/useTags";
import { TaskFormModal } from "../components/tasks/TaskFormModal";

export const TaskManagement = () => {
    const { tasks, loading, addTask } = useTasks();
    const { categories } = useCategories();
    const { tags } = useTags();

    const [modalState, setModalState] = useState({ isOpen: false, type: 'none' });

    const initialFormState = {
        title: '',
        description: '',
        category_id: '',
        tags: [],
        status: false
    };
    const [formData, setFormData] = useState(initialFormState);

    const openFormModal = (task = null) => {
        if(task){
            setFormData({
                title: task.title,
                description: task.description || '',
                category_id: task.category_id || '',
                tags: task.tags ? task.tags.map(tag => tag.tag_id.toString()) : [],
                status: task.status === 1 || task.status === true
            });
        }else{
            setFormData(initialFormState);
        }
        setModalState({ isOpen: true, type: 'form' });
    };

    const closeModal = () => {
        setModalState({ isOpen: false, type: 'none' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!formData.title.trim()) return alert('El titulo de la tarea es obligatorio');

        try{
            await addTask(formData);
            closeModal();
        }catch(e){
            alert('Error al guardar la tarea');
        }
    };

    const handleTagSelect = (tagId) => {
        const tagIdString = tagId.toString();
        const isSelect = formData.tags.includes(tagIdString);
        const updatedTags = isSelect ? formData.tags.filter(id => id !== tagIdString) : [...formData.tags, tagIdString];

        setFormData({ ...formData, tags: updatedTags });
    };

    if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary" /></div>;

    return(
        <div className="container mt-5">
            <div className="row justify-content-center mb-4">
                <div className="col-md-10 d-flex justify-content-between align-items-center">
                    <h2 className="mb-0">Listado de Tareas</h2>
                    <button className="btn btn-primary" onClick={() => openFormModal()}>
                        + Nueva Tarea
                    </button>
                </div>
            </div>

            <div className="row justify-content-center">
                <div className="col-md-10">
                    <div className="card shadow-sm">
                        <table className="table table-hover mb-0">
                            <thead className="table-dark">
                                <tr>
                                    <th>Titulo</th>
                                    <th>Estado</th>
                                    <th className="text-end px-4">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tasks.length === 0 ? (
                                    <tr><td colSpan="4" className="text-center py-4 text-muted">No hay tareas registradas</td></tr>
                                ) : (
                                    tasks.map(task => (
                                        <tr key={task.task_id}>
                                            <td className="align-middle fw-medium">
                                                <span style={{ textDecoration: task.status ? 'line-through' : 'none' }}>
                                                    {task.title}
                                                </span>
                                            </td>
                                            <td className="align-middle">
                                                <span className={`badge ${task.status ? 'bg-success' : 'bg-warning text-dark'}`}>
                                                    {task.status ? 'Realizada' : 'Pendiente'}
                                                </span>
                                            </td>
                                            <td className="text-end px-4">
                                                <button className="btn btn-sm btn-outline-info me-2"><i className="bi bi-eye-fill"></i> Ver</button>
                                                <button className="btn btn-sm btn-outline-secondary me-2"><i className="bi bi-pen-fill"></i> Editar</button>
                                                <button className="btn btn-sm btn-outline-danger"><i className="bi bi-trash3-fill"></i> Eliminar</button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <TaskFormModal
                isOpen={modalState.isOpen && modalState.type === 'form'}
                onClose={closeModal}
                onSubmit={handleSubmit}
                formData={formData}
                setFormData={setFormData}
                categories={categories}
                tags={tags}
                handleTagSelect={handleTagSelect}
            />
        </div>
    );
};
