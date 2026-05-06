# Team Task Manager

A full-stack web application built for project and task management. It allows users to create projects, assign tasks, and track their status with role-based access control.

## Tech Stack
- Frontend: React.js, React Router
- Backend: Node.js, Express.js
- Database: MongoDB (via Mongoose)
- Auth: JWT & bcrypt

## Features
- **Roles**: Admin and Member access.
- **Projects**: Admins can create and manage new projects.
- **Tasks**: Admins can assign tasks. Members can update their task status (Todo, In Progress, Done).
- **Dashboard**: Track tasks and automatically highlights overdue items.

## How to Run Locally

### Backend Setup
1. Open terminal and navigate to `backend/`:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server (runs on port 5000):
   ```bash
   node server.js
   ```

### Frontend Setup
1. Open a new terminal and navigate to `frontend/`:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React app (runs on port 3000):
   ```bash
   npm start
   ```
