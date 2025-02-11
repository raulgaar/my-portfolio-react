import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Project {
    id: number;
    title: string;
    description: string;
    url: string;
}

const Projects: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios.get('https://localhost:5000/api/projects')
            .then(response => {
                setProjects(response.data);
            })
            .catch(error => {
                setError('Failed to load projects. Try again later')
            });
    }, []);
    return (
        <div className='container'>
            <h1 className='text-center my-4 text-primary'>My projects</h1>

            {error && <div className='alert alert-danger'>{error}</div>}
            <div className='row'>
                {projects.map(project => (
                    <div key={project.id} className='col-md-4'>
                        <div className='card mb-4 shadow-sm'>
                            <div className='card-body'>
                                <h5 className='card-title'>{project.title}</h5>
                                <p className='card-text'>{project.description}</p>
                                <a href={project.url} className='btn btn-primary' target='_blank' rel="noopener noreferrer">View Project</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Projects