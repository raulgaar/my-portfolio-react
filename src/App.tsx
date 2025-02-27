import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Projects from './Pages/Projects';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import ManageProjects from "./components/ManageProjects";
import './App.css';
import { useTranslation } from 'react-i18next';
import './i18n';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {

  const { t } = useTranslation();

  

  return (
    <Router>
      <Navbar />
      <div className='container mt-4'>
        
        <Routes>
          <Route path="/" element={<div><h1>{t('welcome')}</h1><p>{t('description')}</p></div>} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/login" element={<Login />} />
          {/*Protected routes: only authenticated users can access */}
          <Route path='/manage-projects' element={<ProtectedRoute element={<ManageProjects />} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
