import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useTranslation } from 'react-i18next';
import '../i18n';
import { Link } from "react-router-dom";
import { getToken } from "../services/authService";

interface Project {
    id?: number;
    title: string;
    description: string;
    url: string;
}

const ManageProjects: React.FC = () => {

    const [projects, setProjects] = useState<Project[]>([]);
    const [currentProject, setCurrentProject] = useState<Project | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const { t } = useTranslation();
    const token = getToken();

    useEffect(() => {
        fetchProjects();
    }, [t]);

    const fetchProjects = async () => {
        try {
            const response = await api.get("projects");
            setProjects(response.data);
        } catch (error) {
            console.error("Error fetching projects: ", error);
        }
    };

    const handleAddProject = () => {
        setCurrentProject({ title: "", description: "", url: "" });
        setModalOpen(true);
    };

    const handleEditProject = (project: Project) => {
        setCurrentProject(project);
        setModalOpen(true);
    };

    const handleDeleteProject = async (id: number | undefined) => {
        if (!id) return;

        try {
            await api.delete(`projects/${id}`);
            setProjects(projects.filter((p) => p.id !== id));
        } catch (error) {
            console.error("Error deleting project:", error);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!currentProject) return;

        try {
            if (currentProject.id) {
                await api.put(`projects/${currentProject.id}`, currentProject);
            } else {
                const response = await api.post("/projects", currentProject);
                setProjects([...projects, response.data]);
            }
            setModalOpen(false);
            fetchProjects();
        } catch (error) {
            console.error("Error saving project:", error);
        }
    };

    return (
        token ? (

            <div className="container mt-4">
                <h2>{t("project-manager.title")}</h2>
                <button className="btn btn-success mb-3" onClick={handleAddProject}>
                    {t("project-manager.add-project-button")}
                </button>

                <table className="table">
                    <thead>
                        <tr>
                            <th>{t("headers.title")}</th>
                            <th>{t("headers.description")}</th>
                            <th>Link</th>
                            <th>{t("headers.actions")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((project) => (
                            <tr key={project.id}>
                                <td>{project.title}</td>
                                <td>{project.description}</td>
                                <td>{project.url}</td>
                                <td>
                                    <button className="btn btn-warning me-2" onClick={() => handleEditProject(project)}>
                                        {t("actions.edit")}
                                    </button>

                                    <button className="btn btn-danger" onClick={() => handleDeleteProject(project.id)}>
                                        {t("actions.delete")}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                 {modalOpen && currentProject && (
                <div className="modal show d-block" tabIndex={-1}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{currentProject.id ? "Edit Project" : "Add Project"}</h5>
                                <button type="button" className="btn-close" onClick={() => setModalOpen(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label">Title</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={currentProject.title}
                                            onChange={(e) => setCurrentProject({ ...currentProject, title: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Description</label>
                                        <textarea
                                            className="form-control"
                                            value={currentProject.description}
                                            onChange={(e) =>
                                                setCurrentProject({ ...currentProject, description: e.target.value })
                                            }
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Link</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={currentProject.url}
                                            onChange={(e) => setCurrentProject({ ...currentProject, url: e.target.value })}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary">
                                        Save
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            </div>
        ) : (
            <>
                <p className="text-danger">{t("project-manager.login-message")}</p>
                <Link className="btn btn-primary" to="/login">{t("project-manager.nav-to-login")}</Link>
            </>
        )
    )
}

export default ManageProjects;