import React, { useState } from "react";
import { login } from "../services/login";
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import '../i18n';
import { saveToken } from "../services/authService";

const Login: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const { t } = useTranslation();
    const navigate = useNavigate();

    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        
        try{
            const data = await login(username, password);
            saveToken(data.token);
            // alert(t('login.successful'));
            navigate("/manage-projects");
        } catch (err) {
            setError(t('login.invalid'))
        }
    };

    return (
        <div className="container mt-5">
            <h2>{t('login.title')}</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">{t("login.username")}</label>
                    <input
                        type="text"
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">{t('login.password')}</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">{t('login.button')}</button>
            </form>
        </div>
    );
};

export default Login;