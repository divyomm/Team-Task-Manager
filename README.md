# Team Task Manager

A full-stack web application for managing projects, assigning tasks, and tracking progress. 

## Tech Stack
- **Frontend:** React.js, HTML, CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Auth:** JWT (JSON Web Tokens)

## Features
- User Authentication (Login/Signup)
- Role-based access (Admin vs Member)
- Admins can create projects and assign tasks to members
- Members can update their task status (Todo -> In Progress -> Done)
- Dashboard showing all assigned tasks

## Setup Instructions

### 1. Start the Backend
```bash
cd backend
npm install
node server.js
```

### 2. Start the Frontend
Open a new terminal window:
```bash
cd frontend
npm install
npm start
```

## Environment Variables
Create a `.env` file in the backend folder (if running locally):
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```
