import React from "react";
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTranslation } from 'react-i18next';
import '../i18n';

const Navbar: React.FC = () => {

    const { t, i18n } = useTranslation();

    const changeLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
        i18n.changeLanguage(event.target.value);
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">Raul Garcia</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle='collapse' data-bs-target='#navbarNav' aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse flex-end" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">{t('navbar.home')}</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/projects">{t('navbar.projects')}</Link>
                        </li>
                    </ul>
                        <label htmlFor='language-select' className='me-2'>
                            {t('selectLanguage')}
                        </label>
                        <select
                            id="language-select"
                            className='form-select w-auto'
                            onChange={changeLanguage}
                            value={i18n.language}
                        >
                            <option value='en'>English</option>
                            <option value='es'>Español</option>
                        </select>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;