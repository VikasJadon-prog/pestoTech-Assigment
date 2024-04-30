import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase';
import './TaskForm.css';
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";

const TaskForm = ({ taskToEdit, onTaskAdded, showTaskForm }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('To Do');
  const [error, setError] = useState('');

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setStatus(taskToEdit.status);
    }
  }, [taskToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!title) {
        setError('Title is required');
        return;
      }

      if (taskToEdit) {
        await updateTask(taskToEdit.id, { title, description, status });
      } else {
        await addTask({ title, description, status });
      }

      setTitle('');
      setDescription('');
      setStatus('To Do');
      setError('');

      if (typeof onTaskAdded === 'function') {
        onTaskAdded();
      }
    } catch (error) {
      console.error('Error adding/updating task:', error);
      setError('Failed to add/update task: ' + error.message);
    }
  };

  const addTask = async (taskData) => {
    await addDoc(collection(firestore, 'tasks'), taskData);
  };

  const updateTask = async (taskId, updatedData) => {
    const taskRef = doc(firestore, 'tasks', taskId);
    await updateDoc(taskRef, updatedData);
  };

  return (
    <div className={`task-form-container ${showTaskForm ? 'visible' : 'hidden'}`}>
    <h2 className="form-heading">{taskToEdit ? 'Edit Task' : 'Create New Task'}</h2>
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          className="form-control description-input" // Added description-input class
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div class="form-group custom-select">
  <select class="form-control" value={status} onChange={(e) => setStatus(e.target.value)}>
    <option value="To Do">To Do</option>
    <option value="In Progress">In Progress</option>
    <option value="Done">Done</option>
  </select>
  <div class="select-arrow"></div>
</div>

      <div className='d-flex justify-content-center'>
        <button type="submit" className="butnn">{taskToEdit ? 'Update Task' : 'Add Task'}</button>
      </div>
      {error && <p className="error-message">{error}</p>}
    </form>
  </div>
  

  );
};

export default TaskForm;
