# Daykeep

> **Keep the things worth remembering.**

Daykeep is a minimal, distraction-free notes app built with the MERN stack.

**v1.0** focuses on one thing: giving your notes a simple place to live.

## Features

- Create, edit, and delete notes
- Add a title, content, or both
- Notes ordered by most recently updated
- Auto-expanding note title
- Character limits for titles and content
- Unsaved changes protection
- Responsive interface
- Secure authentication with access and refresh tokens
- Silent token refresh
- User-scoped notes
- Authentication rate limiting
- Security headers and request size limits
- Vite stale-chunk recovery
- Responsive mobile navigation

## Roadmap

- **v1.0** — Distraction-free note-taking
- **v2.0** — Todo checklists & reminders
- **v3.0** — Focus / Pomodoro
- **v4.0** — Sharing & collaboration

## Tech Stack

### Frontend

- React 19
- React Router DOM
- Vite
- Tailwind CSS v4
- Axios
- React Context
- Sonner
- Lucide React
- Oxlint
- Vercel

### Backend

- Node.js 20+
- Express 5
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Helmet
- express-rate-limit
- compression
- cookie-parser
- CORS
- Nodemon
- Render

## Architecture

Daykeep uses a separate React frontend and Express API.

```text
Browser
   |
   v
React + Vite
   |
   | /api/v1
   v
Express API
   |
   v
MongoDB
```

Authentication uses:

- Short-lived JWT access tokens stored in memory
- HttpOnly refresh-token cookies
- HMAC-SHA256 hashing for stored refresh tokens
- Refresh-token rotation
- User-scoped note queries and mutations

## API

Base path:

```text
/api/v1
```

### System

| Method | Endpoint | Description |
|---|---|---|
| GET | `/health` | API health check |

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/register` | Create an account |
| POST | `/auth/login` | Sign in |
| POST | `/auth/refresh-token` | Refresh access token |
| POST | `/auth/logout` | Log out |

`/register` and `/login` are rate limited.

### Notes

All note endpoints require authentication.

| Method | Endpoint | Description |
|---|---|---|
| GET | `/notes` | Get the user's notes |
| POST | `/notes` | Create a note |
| PUT | `/notes/:id` | Update a note |
| DELETE | `/notes/:id` | Delete a note |

A note can contain:

- title only
- content only
- title and content

At least one of them is required.

## Project Structure

```text
Daykeep/
├── backend/
│   └── src/
│       ├── config/
│       ├── controllers/
│       ├── middlewares/
│       ├── models/
│       ├── routes/
│       ├── utils/
│       └── app.js
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── config/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   └── utils/
│   ├── index.html
│   ├── package.json
│   ├── vercel.json
│   └── vite.config.js
│
├── IMPROVEMENTS.md
└── README.md
```

## Getting Started

### Requirements

- Node.js 20+
- npm 10+
- MongoDB or MongoDB Atlas

### 1. Clone

```bash
git clone https://github.com/shivamkumartech/Daykeep.git
cd Daykeep
```

### 2. Backend

Create `backend/.env`:

```env
PORT=4001
MONGO_URI=your_mongodb_connection_string
FRONTEND_URL=http://localhost:5173
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
NODE_ENV=development
```

Then:

```bash
cd backend
npm install
npm run dev
```

The API runs on:

```text
http://localhost:4001
```

### 3. Frontend

Create `frontend/.env`:

```env
VITE_API_URL=/api/v1
```

Then:

```bash
cd ../frontend
npm install
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```

## Security

Daykeep includes:

- Password hashing with bcryptjs
- JWT-based authentication
- HttpOnly refresh-token cookies
- Refresh-token rotation
- HMAC-SHA256 refresh-token hashing
- Timing-safe token comparison
- User-scoped database queries
- Authentication rate limiting
- Helmet security headers
- 50 KB JSON request limit
- CORS configuration
- Secure production cookie settings

## Scripts

### Backend

```bash
npm run dev
npm start
```

### Frontend

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## License

This project is licensed under the **ISC License**.
