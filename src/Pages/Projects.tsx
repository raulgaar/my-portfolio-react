import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import '../i18n';

interface Project {
    id: number;
    title: string;
    description: string;
    url: string;
}
const API_URL = process.env.REACT_APP_API_URL;

const Projects: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [error, setError] = useState<string | null>(null);
    const { t } = useTranslation();

    useEffect(() => {
        axios.get(`${API_URL}projects`)
            .then(response => {
                setProjects(response.data);
                console.log(response.data);
            })
            .catch(error => {
                setError(t('projects.error'))
            });
    }, [t]);

    const getProjectUrl = (url: string) => {
        if (!url)
        {
            return "#";
        }
        return url.startsWith("http") ? url : `https://${url}`;
    };

    return (
        <div className='container'>
            <h1 className='text-center my-4 text-primary'>{t('projects.title')}</h1>

            {error && <div className='alert alert-danger'>{error}</div>}
            <div className='row'>
                {projects.map(project => (
                    <div key={project.id} className='col-md-4'>
                        <div className='card mb-4 shadow-sm'>
                            <div className='card-body'>
                                <h5 className='card-title'>{project.title}</h5>
                                <p className='card-text'>{project.description}</p>
                                <a href={getProjectUrl(project.url)} className='btn btn-primary' target='' rel="noopener noreferrer">{t('projects.link')}</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Projects