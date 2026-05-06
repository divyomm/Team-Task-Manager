import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  
  const [taskTitle, setTaskTitle] = useState('');
  const [taskProject, setTaskProject] = useState('');
  const [taskAssignee, setTaskAssignee] = useState('');
  const [taskDueDate, setTaskDueDate] = useState('');
  
  const [projectName, setProjectName] = useState('');

  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchTasks();
    if (user?.role === 'admin') {
      fetchProjects();
      fetchUsers();
    }
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/tasks`, config);
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/projects`, config);
      setProjects(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/auth/users`, config);
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/projects`, { name: projectName }, config);
      setProjectName('');
      fetchProjects();
    } catch (err) {
      console.log(err);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/tasks`, {
        title: taskTitle,
        project: taskProject,
        assignedTo: taskAssignee,
        dueDate: taskDueDate
      }, config);
      
      setTaskTitle('');
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  const updateTaskStatus = async (taskId, status) => {
    try {
      await axios.put(`${API_URL}/api/tasks/${taskId}`, { status }, config);
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  const isOverdue = (date) => {
    if (!date) return false;
    return new Date(date) < new Date();
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  return (
    <div className="page-container">
      
      <div className="profile-header">
        <div className="avatar">
          <span className="avatar-text">{getInitials(user?.name)}</span>
        </div>
        <div className="profile-info">
          <h1>{user?.name}</h1>
          <p>{user?.email}</p>
        </div>
      </div>

      {user?.role === 'admin' && (
        <>
          <div className="section-header">
            <h2 className="section-title">Admin Controls</h2>
          </div>
          
          <div className="outlier-card">
            <div className="card-header">
              <h3 className="card-title" style={{color: 'white', marginBottom: '16px'}}>Create Project</h3>
            </div>
            <form onSubmit={handleCreateProject} style={{ display: 'flex', gap: '16px' }}>
              <input 
                type="text" 
                className="custom-input" 
                placeholder="Project Name" 
                value={projectName} 
                onChange={e => setProjectName(e.target.value)} 
                required 
                style={{ marginBottom: 0 }}
              />
              <button type="submit" className="btn-primary" style={{ whiteSpace: 'nowrap' }}>Add Project</button>
            </form>
          </div>

          <div className="outlier-card">
            <div className="card-header">
              <h3 className="card-title" style={{color: 'white', marginBottom: '16px'}}>Create Task</h3>
            </div>
            <form onSubmit={handleCreateTask}>
              <input 
                type="text" 
                className="custom-input" 
                placeholder="Task Title" 
                value={taskTitle} 
                onChange={e => setTaskTitle(e.target.value)} 
                required 
              />
              <select className="custom-input" value={taskProject} onChange={e => setTaskProject(e.target.value)} required>
                <option value="">Select Project</option>
                {projects.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
              </select>
              <select className="custom-input" value={taskAssignee} onChange={e => setTaskAssignee(e.target.value)}>
                <option value="">Assign To...</option>
                {users.map(u => <option key={u._id} value={u._id}>{u.name}</option>)}
              </select>
              <input 
                type="date" 
                className="custom-input" 
                value={taskDueDate} 
                onChange={e => setTaskDueDate(e.target.value)} 
              />
              <button type="submit" className="btn-primary">Add Task</button>
            </form>
          </div>
        </>
      )}

      <div className="section-header">
        <h2 className="section-title">Current Tasks {tasks.length > 0 && `${tasks.length} in Queue`}</h2>
        <a href="#" className="section-link">Task Queue &gt;</a>
      </div>

      {tasks.length === 0 && (
        <div className="outlier-card">
          <p style={{ color: 'var(--text-muted)' }}>You've finished all your tasks!</p>
        </div>
      )}

      {tasks.map(task => {
        const overdue = task.status !== 'Done' && isOverdue(task.dueDate);
        return (
          <div className="outlier-card" key={task._id}>
            <div className="card-header">
              <h3 className={`card-title ${overdue ? 'overdue' : ''}`}>{task.title}</h3>
              <span style={{ marginLeft: 'auto', color: 'var(--text-muted)', fontSize: '1.2rem', cursor: 'pointer' }}>×</span>
            </div>
            
            <div className="card-body">
              <p style={{ margin: '0 0 16px 0' }}>
                Project: {task.project?.name} <br/>
                Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}
              </p>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <select 
                  className="custom-input" 
                  value={task.status} 
                  onChange={(e) => updateTaskStatus(task._id, e.target.value)}
                  style={{ width: 'auto', marginBottom: 0, padding: '8px 12px' }}
                >
                  <option value="Todo">Todo</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Dashboard;
