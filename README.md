# Online Event Registration & Management System

## Minor Project – Individual

## 1. Project Overview

The Online Event Registration & Management System is a full-stack web application developed to simplify the process of creating, browsing, and registering for events.

The system provides separate functionalities for normal users and administrators.

### Users can

- Create an account
- Login securely
- Browse available events
- View event details
- Register for events
- View their registration history

### Administrators can

- Login through the admin interface
- Add new events
- Edit existing events
- Delete events
- View registered users

The application uses a MySQL database for storing users, events, and registration information.

---

## 2. Objectives

The main objectives of this project are:

1. To develop a basic full-stack web application.
2. To provide user registration and login functionality.
3. To allow users to browse and view events.
4. To allow authenticated users to register for events.
5. To provide users with a dashboard containing registration history.
6. To provide administrators with event management functionality.
7. To store application data in a MySQL database.
8. To implement authentication and role-based access.
9. To create a responsive and user-friendly interface.

---

## 3. Technologies Used

### Frontend

- HTML5
- CSS3
- JavaScript

### Backend

- Node.js
- Express.js

### Database

- MySQL
- MySQL Workbench

### Security

- bcrypt
- JSON Web Token (JWT)

### Other Packages

- cors
- dotenv
- mysql2
- nodemon

### Development Tools

- Visual Studio Code
- MySQL Workbench
- Web Browser
- Live Server

---

## 4. Project Structure

```text
Online_Event_management/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── eventController.js
│   │   └── registrationController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── adminMiddleware.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── eventRoutes.js
│   │   └── registrationRoutes.js
│   │
│   ├── .env
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── database/
│   └── database.sql
│
├── frontend/
│   ├── css/
│   │   └── style.css
│   │
│   ├── js/
│   │   ├── auth.js
│   │   ├── dashboard.js
│   │   ├── events.js
│   │   └── main.js
│   │
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── events.html
│   ├── event-details.html
│   ├── dashboard.html
│   ├── admin-login.html
│   ├── admin-dashboard.html
│   └── registered-users.html
│
├── documentation/
│   └── Project_Documentation.docx
│
├── screenshots/
│
├── .gitignore
└── README.md
```

---

## 5. Prerequisites

Before running the project, install the following:

### Node.js

Verify Node.js:

```bash
node --version
```

Example:

```text
v24.19.0
```

If PowerShell blocks `npm.ps1`, use:

```bash
npm.cmd --version
```

and:

```bash
npm.cmd install
```

### MySQL

Install MySQL Server and MySQL Workbench.

Make sure MySQL Server is running before starting the backend.

### Visual Studio Code

Visual Studio Code is recommended for editing the project.

The Live Server extension can be used to run the frontend.

---

## 6. Database Setup

### Step 1: Open MySQL Workbench

Open MySQL Workbench and connect to your MySQL Server.

### Step 2: Open the SQL Script

Open:

```text
database/database.sql
```

### Step 3: Execute the Script

Execute the complete SQL script.

The script creates the project database and required tables.

The main tables are:

```text
users
events
registrations
```

### Step 4: Verify the Tables

Run:

```sql
SHOW DATABASES;
```

Select the project database and run:

```sql
SHOW TABLES;
```

The required tables should be displayed.

---

## 7. Backend Installation

Open a terminal in the project directory.

Navigate to the backend:

```bash
cd backend
```

Initialize the project if required:

```bash
npm.cmd init -y
```

Install dependencies:

```bash
npm.cmd install express mysql2 bcrypt jsonwebtoken cors dotenv
```

Install nodemon:

```bash
npm.cmd install --save-dev nodemon
```

If the project already contains `package.json` and `package-lock.json`, simply run:

```bash
npm.cmd install
```

---

## 8. .env Configuration

Create:

```text
backend/.env
```

Example:

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=YOUR_MYSQL_PASSWORD
DB_NAME=online_event_management

JWT_SECRET=your_secret_key
```

Replace `YOUR_MYSQL_PASSWORD` with your actual MySQL password.

Do not share or commit the `.env` file to a public repository.

---

## 9. How to Start the Backend

Navigate to:

```bash
cd backend
```

Start the server:

```bash
node server.js
```

A successful startup should display:

```text
Server running on http://localhost:5000
MySQL database connected successfully!
```

The backend API is available at:

```text
http://localhost:5000
```

Keep this terminal running while using the frontend.

---

## 10. How to Start the Frontend

Open the `frontend` folder in Visual Studio Code.

Open:

```text
frontend/index.html
```

Right-click the file and select:

```text
Open with Live Server
```

The application will open in the browser.

The Live Server port may vary depending on your configuration.

---

## 11. System Architecture

```text
+---------------------------+
|         Frontend          |
|      HTML / CSS / JS      |
+-------------+-------------+
              |
              | HTTP / REST API
              |
              v
+---------------------------+
|          Backend          |
|   Node.js + Express.js    |
+-------------+-------------+
              |
              | SQL Queries
              |
              v
+---------------------------+
|         Database          |
|           MySQL           |
+---------------------------+
```

The frontend sends HTTP requests to the Express.js backend.

The backend processes requests, performs authentication and authorization, and communicates with MySQL.

---

## 12. API Endpoints

### Authentication

#### Register

```http
POST /api/auth/register
```

Example request:

```json
{
  "name": "Test User",
  "email": "testuser@gmail.com",
  "password": "Test@123"
}
```

#### Login

```http
POST /api/auth/login
```

Example request:

```json
{
  "email": "testuser@gmail.com",
  "password": "Test@123"
}
```

---

### Events

#### Get All Events

```http
GET /api/events
```

#### Get Event by ID

```http
GET /api/events/:id
```

#### Add Event

```http
POST /api/events
```

Requires administrator authorization.

#### Update Event

```http
PUT /api/events/:id
```

Requires administrator authorization.

#### Delete Event

```http
DELETE /api/events/:id
```

Requires administrator authorization.

---

### Registrations

#### Register for an Event

```http
POST /api/registrations
```

Requires user authentication.

Example:

```json
{
  "event_id": 1
}
```

#### View My Registrations

```http
GET /api/registrations/my
```

Requires user authentication.

#### View All Registrations

```http
GET /api/registrations
```

Requires administrator authorization.

---

## 13. User Workflow

```text
User Registration
       |
       v
User Login
       |
       v
Browse Events
       |
       v
View Event Details
       |
       v
Register for Event
       |
       v
User Dashboard
       |
       v
Registration History
       |
       v
Logout
```

---

## 14. Admin Workflow

```text
Admin Login
     |
     v
Admin Dashboard
     |
     +------------------+
     |        |         |
     v        v         v
   Add      Edit      Delete
  Event     Event      Event
     |        |         |
     +--------+---------+
              |
              v
    View Registered Users
              |
              v
            Logout
```

---

## 15. Authentication and Authorization

The application uses JWT-based authentication.

The authentication process is:

```text
User Login
    |
    v
Verify Email and Password
    |
    v
Generate JWT Token
    |
    v
Store Token on Frontend
    |
    v
Send Token with Protected Requests
    |
    v
Backend Verifies Token
    |
    v
Allow Request
```

Passwords are securely hashed using bcrypt.

The application uses two roles:

```text
user
admin
```

Normal users can browse and register for events.

Administrators can manage events and view registered users.

---

## 16. Testing / Basic Usage

### Test 1: User Registration

Open:

```text
register.html
```

Enter a name, email and password.

Expected result:

```text
User registered successfully
```

### Test 2: User Login

Open:

```text
login.html
```

Enter valid credentials.

Expected result:

```text
Login successful
```

### Test 3: Event Listing

Open:

```text
events.html
```

Verify that events are displayed.

### Test 4: Event Details

Select an event and view its details.

### Test 5: Event Registration

Login as a normal user and register for an event.

Expected result:

```text
Event registration successful
```

### Test 6: User Dashboard

Open:

```text
dashboard.html
```

Verify that registered events are displayed.

### Test 7: Admin Login

Open:

```text
admin-login.html
```

Login with valid administrator credentials.

### Test 8: Add Event

Use the admin dashboard to add an event.

Verify that it appears in the event list.

### Test 9: Edit Event

Edit an existing event and verify the changes.

### Test 10: Delete Event

Delete an event and verify that it is removed.

### Test 11: View Registered Users

Open:

```text
registered-users.html
```

Verify that registered user information is displayed.

---

## 17. Detailed Development Steps

### Step 1: Create the Project Folder

Create:

```text
Online_Event_management
```

Create the following folders:

```text
backend
frontend
database
documentation
screenshots
```

### Step 2: Create the Backend

Navigate to:

```bash
cd backend
```

Initialize Node.js:

```bash
npm.cmd init -y
```

Install required packages:

```bash
npm.cmd install express mysql2 bcrypt jsonwebtoken cors dotenv
```

Install nodemon:

```bash
npm.cmd install --save-dev nodemon
```

### Step 3: Create Backend Components

Create:

```text
config/
controllers/
middleware/
routes/
```

Create the required JavaScript files for database connection, controllers, middleware and routes.

### Step 4: Create Database

Create:

```text
database/database.sql
```

Add the SQL required for the project database and tables.

Execute the script in MySQL Workbench.

### Step 5: Configure Environment Variables

Create:

```text
backend/.env
```

Add the MySQL connection details and JWT secret.

### Step 6: Implement Authentication

Implement:

- User registration
- Password hashing
- User login
- JWT generation
- JWT verification
- Role-based authorization

### Step 7: Implement Event Management

Implement:

- Create event
- Read events
- View event details
- Update event
- Delete event

### Step 8: Implement Registration

Implement:

- Event registration
- User registration history
- Admin access to registered users

### Step 9: Create Frontend

Create HTML pages for:

- Home
- Registration
- Login
- Events
- Event details
- User dashboard
- Admin login
- Admin dashboard
- Registered users

### Step 10: Add JavaScript

Create frontend JavaScript files to communicate with the backend APIs.

### Step 11: Add CSS

Create the main stylesheet and implement responsive layouts.

### Step 12: Run Backend

```bash
cd backend
node server.js
```

Verify:

```text
Server running on http://localhost:5000
MySQL database connected successfully!
```

### Step 13: Run Frontend

Open `frontend/index.html` using Live Server.

### Step 14: Test the Application

Test:

- Registration
- Login
- Event listing
- Event details
- Event registration
- Dashboard
- Admin login
- Add event
- Edit event
- Delete event
- Registered users

### Step 15: Capture Screenshots

Save application screenshots in:

```text
screenshots/
```

### Step 16: Prepare Documentation

Create the academic project report in:

```text
documentation/Project_Documentation.docx
```

### Step 17: Final Verification

Before submission, verify:

- Backend starts successfully.
- MySQL connection works.
- User registration works.
- User login works.
- Events are displayed.
- Event registration works.
- User dashboard works.
- Admin login works.
- Admin can add events.
- Admin can edit events.
- Admin can delete events.
- Admin can view registered users.
- Database script is included.
- Screenshots are included.
- Documentation is included.
- README is included.

---

## 18. Common Errors and Solutions

### Error: npm.ps1 Cannot Be Loaded

If PowerShell displays an execution-policy error when using `npm`, use:

```bash
npm.cmd --version
```

and:

```bash
npm.cmd install
```

### Error: ECONNREFUSED 127.0.0.1:5000

This usually means the backend is not running.

Start:

```bash
cd backend
node server.js
```

### Error: Cannot POST /api/auth/login

Check:

1. Backend server is running.
2. Login route is defined.
3. Authentication routes are loaded in `server.js`.
4. Frontend is using the correct API URL.

### Error: MySQL Connection Failed

Check:

- MySQL Server is running.
- Database name is correct.
- MySQL username is correct.
- MySQL password is correct.
- `.env` values are correct.
- Required database tables exist.

### Error: Invalid Email or Password

Check:

- The user exists.
- The email is correct.
- The original password is being used.
- The password was stored using bcrypt.

Do not compare a plain-text password directly with a bcrypt hash.

### Error: Cannot Find Module

Check:

- File name
- Folder name
- Relative `require()` path
- File extension
- Whether the required file exists

Then restart the backend:

```bash
node server.js
```

---

## 19. Screenshots

Store application screenshots in:

```text
screenshots/
```

Recommended screenshots:

```text
01-home-page.png
02-user-registration.png
03-user-login.png
04-events-list.png
05-event-details.png
06-event-registration.png
07-user-dashboard.png
08-admin-login.png
09-admin-dashboard.png
10-add-event.png
11-edit-event.png
12-registered-users.png
13-database-users.png
14-database-events.png
15-database-registrations.png
```

---

## 20. Project Documentation Structure

The detailed academic documentation should contain:

### Chapter 1 – Introduction

- Introduction
- Background
- Problem Statement
- Objectives
- Scope

### Chapter 2 – System Study

- Existing System
- Limitations of Existing System
- Proposed System
- Advantages of Proposed System

### Chapter 3 – Requirements

- Functional Requirements
- Non-Functional Requirements
- Hardware Requirements
- Software Requirements

### Chapter 4 – System Design

- System Architecture
- Use Case Diagram
- Data Flow Diagram
- Activity Diagram
- Sequence Diagram

### Chapter 5 – Database Design

- Database Overview
- Users Table
- Events Table
- Registrations Table
- ER Diagram
- Database Relationships

### Chapter 6 – Implementation

- Frontend Implementation
- Backend Implementation
- Authentication
- Authorization
- Event Management
- Event Registration
- User Dashboard
- Admin Dashboard

### Chapter 7 – Testing

- Testing Methodology
- Test Cases
- Test Results

### Chapter 8 – Results

- Application Screenshots
- User Interface
- Admin Interface
- Database Results

### Chapter 9 – Advantages and Limitations

- Advantages
- Limitations

### Chapter 10 – Future Enhancements

### Chapter 11 – Conclusion

### References

---

## 21. Project Deliverables

The final project submission should contain:

```text
Online_Event_management/
│
├── README.md
│
├── database/
│   └── database.sql
│
├── backend/
│
├── frontend/
│
├── documentation/
│   └── Project_Documentation.docx
│
└── screenshots/
```

The deliverables are:

1. Complete source code
2. Database SQL script
3. Application screenshots
4. Project documentation
5. README file

---

## 22. Advantages

- Easy online event registration
- Centralized event management
- Secure password storage
- Role-based access
- MySQL database integration
- Registration history
- Easy administration
- Reduced manual registration work
- Browser-based access
- Responsive user interface

---

## 23. Limitations

- Online payment is not implemented.
- Email notifications are not implemented.
- Advanced event search is not included.
- Advanced analytics are not included.
- The current version is primarily designed for academic purposes.

---

## 24. Future Enhancements

Future versions can include:

- Email notifications
- Online payment integration
- Event search
- Event filtering
- Event categories
- Event image upload
- QR-code registration
- QR-code attendance
- Password reset
- Email verification
- Admin analytics dashboard
- Automatic capacity management
- Mobile application

---

## 25. Conclusion

The Online Event Registration & Management System demonstrates the development of a full-stack web application using HTML, CSS, JavaScript, Node.js, Express.js and MySQL.

The system provides user registration, authentication, event browsing, event registration, user dashboards, administrator authentication, event management and registered-user management.

The project demonstrates important full-stack development concepts including REST APIs, database integration, password hashing, JWT authentication, role-based authorization and CRUD operations.

The application can be further enhanced with online payment, email notifications, QR-code attendance, advanced search and analytics.

---

## 26. Author

**Project Title:** Online Event Registration & Management System

**Project Type:** Minor Project – Individual

**Author:** ______________________________

**Roll Number:** __________________________

**Department:** ___________________________

**College:** ______________________________

**Academic Year:** 2026–2027
