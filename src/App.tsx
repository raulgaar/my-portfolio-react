import React from 'react';
import './App.css';
import Projects from './Projects';

const App: React.FC = () => {
  return (
    <div className="App">
            <h1>My Portfolio</h1>
            <Projects />
        </div>
  );
}

export default App;
