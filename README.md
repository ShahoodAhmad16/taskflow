# TaskFlow

A full-stack task management application built with React and Django REST Framework.

TaskFlow allows users to create, view, complete, mark incomplete, filter, and delete tasks through a clean and responsive web interface.

## Features

- Create new tasks
- View all tasks
- Mark tasks as completed
- Mark completed tasks as incomplete
- Filter tasks by All, Active, and Completed
- Delete tasks with confirmation
- Real-time task status updates
- Loading and error handling
- Responsive design for desktop and mobile devices
- REST API powered by Django

## Technologies Used

### Frontend
- React
- JavaScript
- CSS
- Vite

### Backend
- Python
- Django
- Django REST Framework

### Database
- SQLite

### Development Tools
- Git
- GitHub
- Visual Studio Code

## Project Structure

```text
task-manager/
├── backend/
│   ├── config/
│   ├── tasks/
│   ├── manage.py
│   └── ...
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── Task.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── ...
│
├── .gitignore
└── README.md


## Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/ShahoodAhmad16/taskflow.git
cd taskflow

### 2. Set Up the Django Backend

cd backend
python -m venv venv
venv\Scripts\activate
pip install django djangorestframework django-cors-headers
python manage.py migrate
python manage.py runserver

The backend will run at:
http://127.0.0.1:8000/

### 3. Set Up the React Frontend
cd frontend
npm install
npm run dev

The frontend will run at:
http://localhost:5173/

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/tasks/` | Retrieve all tasks |
| POST | `/api/tasks/` | Create a new task |
| PATCH | `/api/tasks/<id>/update/` | Update task completion status |
| DELETE | `/api/tasks/<id>/` | Delete a task |

## Future Improvements

- User authentication and registration
- Edit existing tasks
- Add task due dates and priorities
- Add task categories and tags
- Deploy the application to a cloud platform

## License

This project currently does not have a license.