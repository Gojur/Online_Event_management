# Online Event Registration & Management System

A full-stack web application for managing online events and user registrations. The system allows users to create accounts, log in securely, browse available events, view event details, register for events, and manage their registrations. Administrators can manage events and view registered users.

## Project Overview

The Online Event Registration & Management System is an internship mini project developed using HTML, CSS, JavaScript, Node.js, Express.js, and MySQL.

The application provides separate functionalities for normal users and administrators. Users can register and log in, browse events, register for available events, view their registration history, and recover their account password when required. Administrators can securely log in, add new events, edit existing events, delete events, and view users registered for events.

## Objectives

- Provide a simple online platform for event registration.
- Allow users to create accounts and securely log in.
- Display available events with relevant details.
- Allow authenticated users to register for events.
- Provide a user dashboard and registration history.
- Provide secure password recovery and password reset functionality.
- Allow administrators to manage events.
- Allow administrators to view registered users.
- Store application data using a MySQL database.
- Provide a responsive and user-friendly interface.

## Technologies Used

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend
- Node.js
- Express.js

### Database
- MySQL

### Security
- bcrypt
- JSON Web Token (JWT)

### Other Packages
- mysql2
- cors
- dotenv
- nodemon

## Main Features

### User Features

- User Registration
- User Login
- Secure Password Hashing
- Event Listing
- Event Details
- Event Registration
- User Dashboard
- Registration History
- Forgot Password
- Reset Password
- JWT-based Authentication

### Admin Features

- Admin Login
- Add Events
- Edit Events
- Delete Events
- View Registered Users
- Manage Event Information

## Password Recovery

The system provides a password recovery mechanism for users who forget their password.

The password recovery process includes:

1. User selects **Forgot Password**.
2. User enters the registered email address.
3. The backend verifies the account.
4. A password reset token is generated.
5. The user uses the reset token to access the password reset process.
6. The new password is securely hashed using bcrypt.
7. The updated password is stored in the MySQL database.
8. The user can log in using the new password.

## Project Structure

```text
Online_Event_management/
├── README.md
├── database/
│   └── database.sql
├── backend/
│   ├── config/db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── eventController.js
│   │   └── registrationController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── adminMiddleware.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── eventRoutes.js
│   │   └── registrationRoutes.js
│   ├── .env
│   ├── package.json
│   └── server.js
└── frontend/
    ├── css/style.css
    ├── js/
    │   ├── auth.js
    │   ├── dashboard.js
    │   ├── events.js
    │   └── main.js
    ├── index.html
    ├── login.html
    ├── register.html
    ├── events.html
    ├── event-details.html
    ├── dashboard.html
    ├── admin-login.html
    ├── admin-dashboard.html
    └── registered-users.html
```

## Prerequisites

- Node.js
- npm
- MySQL
- Git
- Web browser

## Database Setup

1. Open MySQL.
2. Create the project database.
3. Execute the SQL commands available in `database/database.sql`.

The database contains tables required for:

- Users
- Events
- Registrations

## Backend Installation

Navigate to the backend directory:

```bash
cd backend
```

Install the required dependencies:

```bash
npm install
```

## Environment Configuration

Create a `.env` file inside the `backend` directory.

Example:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=event_management
JWT_SECRET=your_secret_key
```

**Do not upload `.env` to GitHub.**

## Start the Backend

Run:

```bash
npm start
```

or, if nodemon is configured:

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:5000
```

## Start the Frontend

Open the frontend HTML files using a browser or a local development server.

The main page is:

```text
frontend/index.html
```

## API Endpoints

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
POST /api/auth/forgot-password
POST /api/auth/reset-password
```

### Events

```text
GET    /api/events
GET    /api/events/:id
POST   /api/events
PUT    /api/events/:id
DELETE /api/events/:id
```

### Registrations

```text
POST /api/registrations
GET  /api/registrations
```

## User Workflow

```text
User Registration
       ↓
User Login
       ↓
Browse Events
       ↓
View Event Details
       ↓
Register for Event
       ↓
User Dashboard
       ↓
View Registration History
```

### Password Recovery Workflow

```text
Forgot Password
       ↓
Enter Registered Email
       ↓
Generate Reset Token
       ↓
Password Reset
       ↓
Hash New Password
       ↓
Update Database
       ↓
Login with New Password
```

## Admin Workflow

```text
Admin Login
     ↓
Admin Dashboard
     ↓
Manage Events
     ├── Add Event
     ├── Edit Event
     └── Delete Event

     ↓
View Registered Users
```

## Authentication and Security

The system implements basic security mechanisms including:

- Password hashing using bcrypt.
- JWT-based authentication.
- Protected backend routes.
- Separate administrator authorization.
- Environment variables for sensitive configuration.
- Password reset functionality using reset tokens.

## Testing

The following functionalities can be tested:

- User registration
- User login
- Invalid login handling
- Event listing
- Event details
- Event registration
- User dashboard
- Registration history
- Forgot password
- Reset password
- Admin login
- Add event
- Edit event
- Delete event
- View registered users

## Common Errors

### Invalid Email or Password

Verify that the email and password correspond to a registered account.

### Email Already Registered

Check whether the email already exists in the `users` table.

### Backend Connection Error

Verify that:

- MySQL is running.
- Database credentials are correct.
- The backend server is running.
- The `.env` configuration is correct.

### Password Reset Error

Verify that:

- The email belongs to a registered user.
- A valid reset token is being used.
- The backend server is running.

## Future Enhancements

Possible future improvements include:

- Email-based password reset links.
- Event search and filtering.
- Event categories.
- Event capacity management.
- Email notifications.
- Online payment integration.
- QR-code-based event tickets.
- Advanced admin analytics.
- Cloud deployment.
- Role-based access control.

## Project Deliverables

The project includes:

- Frontend source code
- Backend source code
- MySQL database script
- README documentation
- Internship project documentation
- Project screenshots

The detailed internship project report and screenshots are maintained separately from the GitHub source-code repository.

## Conclusion

The Online Event Registration & Management System demonstrates the development of a full-stack web application using frontend technologies, a Node.js and Express.js backend, and a MySQL database. The system provides essential event management and registration functionality along with authentication, authorization, and password recovery features.

The project provides practical experience in full-stack development, database integration, REST API development, authentication, security, and responsive web application design.

## Author

**Gojuru Meghana**

### Internship Mini Project

**Online Event Registration & Management System**
