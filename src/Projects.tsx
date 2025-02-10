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

    useEffect(() => {
        axios.get('https://localhost:5000/api/projects')
            .then(response => {
                setProjects(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the projects!', error);
            });
    }, []);
    return (
        <div>
            <h1>Projects</h1>
            <ul>
                {projects.map(project => (
                    <li key={project.id}>
                        <h2>{project.title}</h2>
                        <p>{project.description}</p>
                        <a href={project.url} target='_blank' rel="noopener noreferrer">Visit Project</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Projects