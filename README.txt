Team Task Manager

What I Made

- A frontend using React for the main interface.
- A backend with Node.js and Express for the API.
- MongoDB with Mongoose to store users, projects, and tasks.
- Authentication using JWT to keep sessions safe.

Main Features

- User roles: Admins can create projects and assign tasks. Members can update their own task status.
- Project management: Add new projects and view project details.
- Task management: Create tasks, assign them to team members, and change task status.
- Task tracking: There is a dashboard to see assigned tasks and notice overdue work.

How to Run the Project

Backend

1. Go to the backend folder:
   cd backend
2. Install packages:
   npm install
3. Start the backend server:
   node server.js

Frontend

1. Open a new terminal and go to the frontend folder:
   cd frontend
2. Install packages:
   npm install
3. Start the frontend app:
   npm start

Notes

- The API runs on http://localhost:5000 by default.
- The React app runs on http://localhost:3000.
- You need to have MongoDB running locally or connected to a database for the backend to save data.