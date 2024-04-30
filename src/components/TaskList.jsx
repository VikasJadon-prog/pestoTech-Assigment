import React, { useState, useEffect } from 'react';
import './TaskList.css';
import { firestore } from '../firebase';
import { collection, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import TaskForm from './TaskForm';
import '../App.css';
import { MdDownloadDone } from "react-icons/md";
import { GrInProgress } from "react-icons/gr";
import { RiTodoLine } from "react-icons/ri";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [filter, setFilter] = useState('All'); 

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(firestore, 'tasks'), (snapshot) => {
      const taskList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTasks(taskList);
    });
    return () => unsubscribe();
  }, []);

  const handleEditClick = (task) => {
    setSelectedTask(task);
    setShowTaskForm(true);
  };

  const handleTaskAdded = () => {
    setSelectedTask(null);
    setShowTaskForm(false);
  };

  const handleDeleteTask = async (taskId) => {
    await deleteDoc(doc(firestore, 'tasks', taskId));
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value); 
  };

  const getIcon = (status) => {
    switch (status) {
      case 'Done':
        return <MdDownloadDone style={{ color: 'green' }} />;
      case 'In Progress':
        return <GrInProgress style={{ color: 'yellow' }} />;
      case 'To Do':
        return <RiTodoLine style={{ color: 'red' }} />;
      default:
        return null;
    }
  };

  const filteredTasks = filter === 'All' ? tasks : tasks.filter(task => task.status === filter);

  return (
    <div className="app-cont">
      <div className="col-first">
        <TaskForm taskToEdit={selectedTask} onTaskAdded={handleTaskAdded} showTaskForm={showTaskForm} />
      </div>
      <div className="col-seco">
        <div className="task-list-container">
          <h2 className="list-heading">Task List</h2>
          <div className="filter-dropdown">
      
            <select
              className="form-control"
              value={filter}
              onChange={handleFilterChange} 
            >
              <option value="All">All</option>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
          <div className="task-ul-container">
         
            <div className="task-ul">
              {filteredTasks.map(task => (
                <div className="task-card" key={task.id}>
                  <div className='card-icon'>
                    {getIcon(task.status)}
                  </div>
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                  <div className='update'>
                    <p>Status: {task.status}</p>
                  </div>
                  <div className="button-group">
                    <FaEdit onClick={() => handleEditClick(task)} />
                    <AiFillDelete onClick={() => handleDeleteTask(task.id)} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
};

export default TaskList;
