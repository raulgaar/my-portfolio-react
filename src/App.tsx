import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Projects from './Projects';
import './App.css';
import { useTranslation } from 'react-i18next';
import './i18n';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {

  const { t, i18n } = useTranslation();

  

  return (
    <Router>
      <Navbar />
      <div className='container mt-4'>
        
        <Routes>
          <Route path="/" element={<div><h1>{t('welcome')}</h1><p>{t('description')}</p></div>} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
