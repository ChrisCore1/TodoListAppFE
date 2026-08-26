import { useState } from "react";
import { useTags } from "../hooks/useTags";

export const TagManagement = () => {
    const { tags, loading } = useTags();

    if(loading) return <div className="text-center mt-5"><div className="spinner-border text-primary" /></div>;

    return (
        <div className="container mt-5">
            <div className="row justify-content-center mb-4">
                <div className="col-md-10 d-flex justify-content-between align-items-center">
                    <h2 className="mb-0">Lista de Etiquetas</h2>
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
                                        <td className="align-middle fw-medium">{tag.name_tag}</td>
                                        <td className="text-end px-4">
                                            <button className="btn btn-sm btn-outline-info me-2"><i className="bi bi-eye-fill"></i> Ver</button>
                                            <button className="btn btn-sm btn-outline-secondary me-2"><i className="bi bi-pen-fill"></i> Editar</button>
                                            <button className="btn btn-sm btn-outline-danger"><i className="bi bi-trash3-fill"></i> Eliminar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};
