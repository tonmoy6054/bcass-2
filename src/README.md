# BCPro-2

## Project Overview

BCPro-2 is a robust backend system designed to manage a sports facility booking platform. It provides functionalities for user authentication, facility management, booking operations, and much more. This project is built using modern web technologies, with a focus on scalability, security, and performance.

**Live URL**: [https://bcpro-2.vercel.app/](#)

## Features

- **User Authentication**: Secure sign-up and login with JWT-based authentication.
- **Role-Based Access Control**: Differentiated access for users and admins.
- **Facility Management**: Admins can create, update, and delete facilities.
- **Booking Management**: Users can check availability, book facilities, and cancel bookings.
- **Global Error Handling**: Centralized error handling with custom error responses.
- **Not Found Handler**: Handles unmatched routes with a standardized response.
- **Input Validation**: Ensures data integrity using `zod` validation.

## Technologies Used

- **Backend Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/)
- **ORM**: [Mongoose](https://mongoosejs.com/)
- **Authentication**: [JWT (JSON Web Token)](https://jwt.io/)
- **Validation**: [Zod](https://github.com/colinhacks/zod)
- **Password Hashing**: [bcrypt.js](https://github.com/dcodeIO/bcrypt.js)
- **Environment Variables**: [dotenv](https://github.com/motdotla/dotenv)
- **TypeScript**: Ensuring type safety across the entire application.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: Version 14 or higher
- **MongoDB**: Ensure MongoDB is installed and running
- **npm**: Version 6 or higher

## Getting Started

Follow these instructions to set up the project on your local machine.

### 1. Clone the Repository

```bash
git clone https://github.com/tonmoy6054/bcass-2
cd bcpro-2

Install Dependencies: npm install

Set Up Environment Variables:
Create a .env file in the root of the project and add the following variables:
PORT=5000
MONGO_URI=mongodb://localhost:27017/bcpro-2
JWT_SECRET=your_jwt_secret

Build the Project: npm run build
 Run the Application
For development: npm run dev
For production: npm start
```
