# School Management Mini System

A professional full-stack web application for managing basic school operations including students and tasks. Built with modern technologies and clean architecture.

## ✨ Features

### 🔐 Authentication
- Admin login/register with JWT-based authentication
- Secure password hashing with bcryptjs
- Token-based API protection

### 👨‍🎓 Student Management
- Add new students (Name, Class, Roll Number)
- Edit student details
- Delete students
- View all students in a table format
- Search and filter functionality

### 📚 Task Management
- Assign tasks/homework to students
- Mark tasks as completed/pending
- View all assigned tasks
- Filter tasks by status (All, Pending, Completed)
- Task descriptions and due date tracking

### 📊 Dashboard
- Overview statistics (Total Students, Total Tasks, Completed, Pending)
- Interactive charts and analytics
- Recent activities
- Visual task status tracking
- Performance metrics

### 🎨 UI/UX Design
- Modern and clean interface with gradient colors
- Sidebar navigation (Dashboard, Students, Tasks, Logout)
- Responsive design (mobile + desktop compatible)
- Cards, badges, and proper spacing
- Loading indicators and success/error messages
- Professional typography and color scheme

## 🛠️ Tech Stack

- **Frontend:**
  - React.js 18.x with Hooks
  - Axios for API calls
  - Recharts for analytics and charts
  - React Icons for UI icons
  - CSS3 with responsive design

- **Backend:**
  - Node.js + Express.js
  - MongoDB + Mongoose ODM
  - JWT for authentication
  - bcryptjs for password hashing

- **Database:**
  - MongoDB (Local or Atlas)

## 📦 Installation

### Prerequisites

- Node.js v14+ and npm installed
- MongoDB installed and running locally (or MongoDB Atlas account)
- Git installed

### Step 1: Clone or Extract the Project

```bash
# If you have git
git clone <repository-url>
cd task_prj

# Or extract the provided zip file
cd task_prj
```

### Step 2: Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file (if not exists) - copy from .env.example
# Edit .env with your configuration
# Example .env content:
# MONGO_URI=mongodb://localhost:27017/schoolmanagement
# JWT_SECRET=your_secure_jwt_secret_key_here
# PORT=5000

# Start the backend server
npm start
# The server will run on http://localhost:5000
```

### Step 3: Frontend Setup

Open a new terminal window:

```bash
cd frontend

# Install dependencies
npm install

# Start the frontend development server
npm start
# The app will automatically open at http://localhost:3000
```

## 🚀 Usage

1. **Start MongoDB** (if using local installation):
   ```bash
   mongod
   ```

2. **Start Backend Server** (Terminal 1):
   ```bash
   cd backend
   npm start
   ```

3. **Start Frontend Application** (Terminal 2):
   ```bash
   cd frontend
   npm start
   ```

4. **Access the Application**:
   - Open browser and go to `http://localhost:3000`
   - Register a new admin account or login

### First Time Setup

1. Click on "Register" button
2. Enter a username and password (min 6 characters)
3. Click "Register"
4. Now login with your credentials
5. You'll be redirected to the dashboard

## 📁 Project Structure

```
task_prj/
├── backend/          # Node.js + Express server
│   ├── models/       # MongoDB schemas
│   │   ├── User.js
│   │   ├── Student.js
│   │   └── Task.js
│   ├── routes/       # API endpoints
│   │   ├── auth.js
│   │   ├── students.js
│   │   └── tasks.js
│   ├── middleware/   # Custom middleware
│   │   └── auth.js   # JWT verification
│   ├── server.js     # Express app setup
│   ├── package.json
│   ├── .env          # Environment variables
│   └── .env.example  # Example env file
│
└── frontend/         # React application
    ├── src/
    │   ├── components/
    │   │   ├── Login.js
    │   │   ├── Dashboard.js
    │   │   ├── StudentList.js
    │   │   └── TaskList.js
    │   ├── App.js
    │   ├── App.css   # Main styling
    │   └── index.js
    ├── public/
    │   └── index.html
    └── package.json
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new admin user
- `POST /api/auth/login` - Login admin user

### Students
- `GET /api/students` - Get all students
- `POST /api/students` - Create new student
- `PUT /api/students/:id` - Update student details
- `DELETE /api/students/:id` - Delete student

### Tasks
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task (mark complete/pending)
- `DELETE /api/tasks/:id` - Delete task

## 🔒 Authentication

All API endpoints (except login/register) require:
- Header: `Authorization: Bearer <token>`
- Token is received after successful login
- Tokens are stored in browser localStorage

## 📸 Screenshots

### Login & Registration Page
Modern authentication interface with email and password fields.
```
Register → Enter Username & Password → Submit
```

### Dashboard
Overview with statistics cards, charts, and recent activities.
- Total Students: 2
- Total Tasks: 1
- Completed: 0
- Pending: 1
- Interactive Bar Chart & Pie Chart
- Recent Tasks Section

### Student Management
Complete student CRUD operations with search functionality.
- Add New Student form (Name, Class, Roll Number)
- Search by name or roll number
- Table view with student data
- Edit and Delete actions for each student
- Real-time student count

**Sample Data:**
```
Karthika - Class 10-B - Roll: 1
Pradeepa - Class 11-A - Roll: 2
```

### Task Management
Assign and manage homework/tasks for students.
- Assign New Task form (Title, Description, Student selection)
- Filter by status: All, Pending, Completed
- Task cards with student assignment
- Mark Complete/Pending toggle
- Delete task option
- Success notifications

**Sample Task:**
```
Title: Basic Mathematics Problem Solving
Description: Students are required to solve basic math problems...
Assigned to: Karthika (10-B)
Status: Pending
```

### Database Collections
MongoDB stores data in three main collections:

**Students Collection:**
```json
{
  "_id": "69d7a6d3102ab48e8420a3cd",
  "name": "Karthika",
  "class": "10-B",
  "rollNumber": "1"
}
```

**Tasks Collection:**
```json
{
  "_id": "69d7a6d3102ab48e8420a3cd",
  "title": "Basic Mathematics Problem Solving",
  "description": "Task Description: Students are required to solve...",
  "student": "69d7a207102ab48e8420a3c6",
  "completed": false,
  "assignedDate": "2026-04-09T13:17:07.382+00:00"
}
```

**Users Collection:**
```json
{
  "_id": "admin_id",
  "username": "admin",
  "password": "hashed_password"
}
```

## 🎨 UI Features

✨ **Modern Design:**
- Purple gradient background (#667eea → #764ba2)
- Responsive sidebar navigation
- Color-coded status badges (Green for Completed, Orange for Pending)
- Smooth animations and transitions
- Professional typography

🎯 **Interactive Elements:**
- Hover effects on buttons and cards
- Loading spinners
- Success/Error notifications
- Inline editing for students
- Task status filtering buttons
- Charts with tooltips

📱 **Responsive Layout:**
- Mobile-friendly design
- Tablet optimization
- Desktop full view
- Flexible grid system
- Touch-friendly buttons

## 🚨 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod`
- Check MONGO_URI in backend/.env
- For MongoDB Atlas, use connection string with credentials

### Port Already in Use
```bash
# Windows - Kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:5000 | xargs kill -9
```

### CORS Error
- Ensure backend is running on port 5000
- Check frontend API URL matches backend address

### JWT Token Errors
- Ensure JWT_SECRET is set in .env
- Clear localStorage and login again
- Check token expiration (set to 24h)

## 📝 Environment Variables

### Backend (.env)
```
MONGO_URI=mongodb://localhost:27017/schoolmanagement
JWT_SECRET=your_secure_secret_key_minimum_32_characters
PORT=5000
NODE_ENV=development
```

### Frontend
Uses `http://localhost:5000` as API base URL (hardcoded in components)

To change in production, update API endpoints in:
- `frontend/src/components/Login.js`
- `frontend/src/components/Dashboard.js`
- `frontend/src/components/StudentList.js`
- `frontend/src/components/TaskList.js`

## 🌐 Deployment

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
# Deploy the 'build' folder
```

### Backend (Heroku/Railway)
```bash
# Set environment variables on hosting platform
# Push code to hosting service
git push heroku main
```

## 📊 Database Schema

### User Collection
```javascript
{
  username: String (unique, required),
  password: String (hashed, required)
}
```

### Student Collection
```javascript
{
  name: String (required),
  class: String (required),
  rollNumber: String (unique, required)
}
```

### Task Collection
```javascript
{
  title: String (required),
  description: String,
  student: ObjectId (ref: 'Student', required),
  completed: Boolean (default: false),
  assignedDate: Date (default: now)
}
```

## 🎓 Learning Outcomes

This project demonstrates:
- Full-stack MERN development
- RESTful API design
- JWT authentication
- MongoDB schema design
- React Hooks and functional components
- Component state management
- Responsive CSS design
- Error handling and validation
- Charts and data visualization

## 📄 License

This project is created for educational purposes.

## 👤 Author

Created as a technical assessment project.

## 🤝 Support

For issues or questions:
1. Check the troubleshooting section
2. Verify all environment variables are set correctly
3. Ensure MongoDB is running
4. Check browser console for errors
5. Review backend server logs

---

**Happy Learning! 🚀**

Last Updated: April 2026
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the React app:
   ```
   npm start
   ```

### Database

Ensure MongoDB is running on localhost:27017.

### Usage

1. Register an admin user by calling the register endpoint or manually in MongoDB.
2. Login with admin credentials.
3. Access the dashboard to manage students and tasks.

## Deployment

(Optional) Deploy to platforms like Heroku for backend and Netlify for frontend.