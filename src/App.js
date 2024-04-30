import React from 'react';
import TaskList from './components/TaskList';
import './App.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <div className='App'>
      <TaskList />
    </div>
  );
};

export default App;