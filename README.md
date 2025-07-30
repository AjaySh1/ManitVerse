# ManitVerse

ManitVerse is a full-stack MERN (MongoDB, Express, React, Node.js) community platform designed for collaboration, resource sharing, and secure user interaction. The project features robust authentication, OTP-based email verification, and a modern, responsive UI.

---

## Features

- **User Registration & Login** with JWT authentication
- **OTP-based Email Verification** using nodemailer
- **Profile Management** (create, update, view)
- **Protected Routes** for authenticated users
- **RESTful API** for all core resources
- **Responsive React Frontend** with Redux state management
- **Environment Variable Support** for secure configuration

---

## Getting Started

### Prerequisites

- Node.js (v16 or later recommended)
- MongoDB (local or Atlas)
- npm

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/AjaySh1/manitverse.git
   cd manitverse
   ```

2. **Install backend dependencies:**
   ```sh
   cd server
   npm install
   ```

3. **Install frontend dependencies:**
   ```sh
   cd client
   npm install
   cd ..
   ```

4. **Set up environment variables:**

   Create a `.env` file in the root directory with the following (example):

   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   EMAIL_USER=your_email@example.com
   EMAIL_PASS=your_email_app_password
   ```

---

## Running the App

### Development

Start both backend and frontend with:

```sh
npm run dev
```

- Backend runs on [http://localhost:5000](http://localhost:5000)
- Frontend runs on [http://localhost:3000](http://localhost:3000)

### Production

Build the frontend and serve with the backend:

```sh
cd client
npm run build
cd ..
npm start
```

---

## Folder Structure

```
manitverse/
│
├── client/           # React frontend
├── config/           # Database and config files
├── models/           # Mongoose models
├── routes/           # Express routes (API)
├── middleware/       # Custom middleware
├── .env              # Environment variables (not committed)
├── server.js         # Entry point
└── README.md
```

---

## Security

- **.env** is included in `.gitignore` and should never be committed.
- Use strong secrets and app passwords for email.

---

## License

This project
