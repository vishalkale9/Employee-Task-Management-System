# Employee Task Management System

A comprehensive Full Stack Task Management System designed to streamline task assignments, track progress, and manage employee roles efficiently. Built with modern web technologies, this application demonstrates robust capabilities in frontend design, backend architecture, database modeling, and authentication.

## 🚀 Features

### 1. Authentication & Authorization
- **Role-Based Access Control**: Differentiates between `ADMIN` and `EMPLOYEE` roles.
- **Secure Login**: JWT-based authentication with bcrypt password hashing.
- **Form Validation**: Strict password requirements (uppercase, lowercase, number, min 8 chars).
- **Session Management**: "Remember Me" functionality and secure logout.

### 2. Interactive Dashboard
- **Admin View**: Holistic overview including Total Employees, Total Tasks, Completed Tasks, In Progress Tasks, and Pending Tasks.
- **Employee View**: Personalized statistics including My Tasks, Completed, Pending, and Overdue tasks.
- **Data Export**: Admins can export a comprehensive CSV report of all tasks directly from the dashboard.

### 3. Employee Management (Admin Only)
- **CRUD Operations**: Add, Edit, and Delete employee records.
- **Advanced Data Handling**: Search, sort, and paginate through the employee directory.
- **Role Assignment**: Assign roles (Admin/Employee) during user creation.

### 4. Task Management
- **Task Creation**: Admins can create tasks with titles, descriptions, priorities (Low, Medium, High), and deadlines.
- **Task Assignment**: Admins assign tasks to specific employees.
- **File Attachments**: Upload and attach files (PDF, JPG, PNG) up to 5MB to tasks.
- **Status Tracking**: Employees can update their task status via an intuitive inline dropdown (Pending, In Progress, Completed).
- **Edit/Delete**: Admins retain full control to edit or delete existing tasks.

### 5. Asynchronous Processing
- **RabbitMQ Integration**: Utilizes a message broker for handling asynchronous tasks, such as sending background notifications when tasks are assigned or updated.

---

## 🛠️ Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Lucide React (Icons), React Hot Toast, Axios, React Router.
- **Backend**: Node.js, Express, TypeScript, Prisma ORM, PostgreSQL.
- **Authentication**: JSON Web Tokens (JWT), bcrypt.
- **File Uploads**: Multer.
- **Message Broker**: RabbitMQ (amqplib).

---

## ⚙️ Local Setup Guide

Follow these steps to run the application locally on your machine.

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [PostgreSQL](https://www.postgresql.org/)
- [RabbitMQ](https://www.rabbitmq.com/) (or run via Docker)
- [Git](https://git-scm.com/)

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd Employee-Task-Management-System
```

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Environment Configuration:
   Create a `.env` file in the `backend` directory and add the following variables:
   ```env
   PORT=3000
   DATABASE_URL="postgresql://<username>:<password>@localhost:5432/task_management?schema=public"
   JWT_SECRET="your_super_secret_jwt_key"
   RABBITMQ_URL="amqp://localhost"
   ```
4. Database Setup (Prisma):
   Run the following commands to initialize the database schema:
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```
5. Start the Backend Server:
   ```bash
   npm run dev
   ```
   *The backend will run on `http://localhost:3000`.*

### 3. Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Environment Configuration:
   Create a `.env` file in the `frontend` directory if required, or ensure Axios is pointing to `http://localhost:3000/api`.
4. Start the Frontend Server:
   ```bash
   npm run dev
   ```
   *The frontend will run on `http://localhost:5173` (or port specified by Vite/CRA).*

---

## 🐳 Docker Setup (Optional)

To run the backing services (PostgreSQL and RabbitMQ) using Docker, you can use the following commands.

### Run PostgreSQL via Docker
```bash
docker run --name postgres-db -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=password -e POSTGRES_DB=task_management -p 5432:5432 -d postgres
```
*(Update your `DATABASE_URL` in the `.env` file to match these credentials).*

### Run RabbitMQ via Docker
```bash
docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
```
*(The management plugin is available at `http://localhost:15672` using `guest` / `guest`).*

---

## 📝 Usage Guide
1. **Initial Login**: Since the database is empty initially, you can register a new user from the frontend.
2. **Admin Privileges**: Register your first user. You may need to manually update the database role for the first user to `ADMIN` using a database tool (like pgAdmin or DBeaver) or Prisma Studio (`npx prisma studio`), so you can access Admin features.
3. **Managing Tasks**: Log in as the Admin to create employees and assign tasks. Log in as an Employee to update task statuses.
