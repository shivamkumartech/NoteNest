# NoteNest 📝

NoteNest is a modern, responsive, full-stack note-taking application built with the **MERN stack** (MongoDB, Express, React 19, Node.js). Engineered with clean architecture and security best practices, it features a sleek dark-mode React frontend powered by Tailwind CSS v4 and React Context, and a robust Express REST API with bcrypt-hashed refresh token rotation, JWT authentication, and user-scoped data isolation.

---

## 🚀 Key Features

- **🔐 Dual-Token Authentication with Rotation:** Short-lived JWT Access Tokens (15m) paired with HttpOnly, SameSite Refresh Token cookies (7d).
- **🛡️ Refresh Token Hashing & Rotation:** Refresh tokens are hashed with `bcryptjs` before storage in MongoDB, and rotated upon every refresh request to prevent replay attacks.
- **👤 User-Scoped Data Privacy:** Notes are strictly bound to their creator (`owner: ObjectId -> User`). Users can only query, create, edit, and delete their own notes.
- **⚡ Reactive Global State:** Context API (`NoteContext`) provides clean, lightweight state management without external store overhead.
- **🔄 Auto Token Interceptors:** Axios request interceptor attaches the bearer token, while the response interceptor automatically handles 401s by requesting a token refresh and transparently retrying failed requests.
- **🍞 Rich Toast Feedback:** Integrated `react-hot-toast` for real-time validation, authentication, and mutation notifications.
- **🎨 Modern Dark Theme UI:** Built with React 19, Tailwind CSS v4, and Lucide React icons.
- **🩺 API Health Check:** Dedicated `/api/v1/health` endpoint for uptime monitoring.
- **⚡ High-Performance DX:** Fast builds and HMR via Vite, powered by Oxlint for static analysis.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 19
- **Routing:** React Router DOM v7
- **Styling:** Tailwind CSS v4 (native Vite integration)
- **HTTP Client:** Axios (configured with request/response interceptors)
- **Notifications:** React Hot Toast
- **Icons:** Lucide React
- **Build Tool:** Vite v8
- **Linter:** Oxlint

### Backend
- **Runtime:** Node.js (`>=20`)
- **Framework:** Express.js (v5)
- **Database / ODM:** MongoDB & Mongoose
- **Authentication & Security:** JSON Web Tokens (`jsonwebtoken`), Password & Token Hashing (`bcryptjs`), Cookie Parser (`cookie-parser`), CORS
- **Dev Tooling:** Nodemon
- **Environment:** Dotenv

---

## 📐 System Architecture

### Authentication & Token Rotation Flow

```mermaid
sequenceDiagram
    autonumber
    actor User as Client (React)
    participant API as Express API (/api/v1)
    participant DB as MongoDB

    Note over User,DB: User Login / Registration
    User->>API: POST /auth/login (email, password)
    API->>DB: Verify credentials & find user
    DB-->>API: User record
    API->>API: Generate Access Token (15m) & Refresh Token (7d)
    API->>DB: Save hashed Refresh Token (bcrypt)
    API-->>User: Return Access Token + set HttpOnly Refresh Cookie

    Note over User,DB: Protected API Request
    User->>API: GET /notes (Bearer Access Token)
    API->>API: Verify Access Token (protect middleware)
    API->>DB: Query notes where owner = req.userId
    DB-->>API: User's notes
    API-->>User: 200 OK + Notes data

    Note over User,DB: Token Refresh & Rotation (On 401)
    User->>API: POST /auth/refresh-token (HttpOnly Cookie)
    API->>DB: Compare hashed Refresh Token
    API->>API: Generate new Access Token + new Refresh Token
    API->>DB: Update with new hashed Refresh Token
    API-->>User: New Access Token + updated HttpOnly Cookie
```

---

## 📡 API Reference

### 🩺 System Endpoints

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/v1/health` | Service uptime and health check | No |

---

### 🔐 Auth Endpoints (`/api/v1/auth`)

| Method | Endpoint | Description | Request Body | Response |
| :--- | :--- | :--- | :--- | :--- |
| **POST** | `/register` | Register a new account | `{ "name": "...", "email": "...", "password": "..." }` | `accessToken`, `user` object, sets `refreshToken` cookie |
| **POST** | `/login` | Authenticate user & issue tokens | `{ "email": "...", "password": "..." }` | `accessToken`, `user` object, sets `refreshToken` cookie |
| **POST** | `/refresh-token` | Rotate & issue new access token | *HttpOnly Cookie* | `{ "accessToken": "..." }` + new cookie |
| **POST** | `/logout` | Clear DB refresh token & cookie | *HttpOnly Cookie* | `{ "message": "User logged out successfully" }` |

---

### 📝 Notes Endpoints (`/api/v1/notes`) — *Protected & User-Scoped*

> 🔒 **Header Required:** `Authorization: Bearer <accessToken>`

| Method | Endpoint | Description | Request Body |
| :--- | :--- | :--- | :--- |
| **GET** | `/` | Retrieve all notes owned by authenticated user | *None* |
| **POST** | `/` | Create a new note bound to authenticated user | `{ "title": "String", "content": "String" }` |
| **PUT** | `/:id` | Update an existing note by ID (owner only) | `{ "title": "String", "content": "String" }` |
| **DELETE** | `/:id` | Delete a note by ID (owner only) | *None* |

---

## 📂 Project Structure

```text
NoteNest/
├── backend/
│   ├── src/
│   │   ├── config/             # Database connection setup (Mongoose)
│   │   │   └── db.js
│   │   ├── controllers/        # Business logic handlers
│   │   │   ├── auth.controller.js
│   │   │   └── note.controller.js
│   │   ├── middlewares/        # Express middlewares (JWT Auth protection)
│   │   │   └── auth.middleware.js
│   │   ├── models/             # Mongoose schemas (User with token hash & Note with owner ref)
│   │   │   ├── note.model.js
│   │   │   └── user.model.js
│   │   ├── routes/             # RESTful route definitions
│   │   │   ├── auth.route.js
│   │   │   └── note.route.js
│   │   ├── utils/              # Token generation, bcrypt hashing & cookie helpers
│   │   │   ├── cookieOptions.js
│   │   │   ├── hashToken.js
│   │   │   └── token.js
│   │   └── app.js              # Express app, middleware pipeline & route mounts
│   ├── server.js               # Async server bootstrap & DB listener
│   ├── package.json
│   ├── .env.example
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── api/                # Axios instance with request/response auto-refresh interceptors
    │   │   └── url.js
    │   ├── components/         # Reusable UI components
    │   │   ├── Footer.jsx
    │   │   ├── Navbar.jsx
    │   │   ├── NoteCard.jsx
    │   │   ├── NoteForm.jsx
    │   │   └── ProtectedRoute.jsx
    │   ├── context/            # React Context providers
    │   │   ├── AuthContext.jsx
    │   │   └── NoteContext.jsx
    │   ├── pages/              # Application views & pages
    │   │   ├── Createnote.jsx
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   └── Signup.jsx
    │   ├── index.css           # Global stylesheet & Tailwind CSS imports
    │   ├── Layout.jsx          # App shell wrapper (Navbar, Main, Footer)
    │   └── main.jsx            # Application entry, router & Toaster provider
    ├── index.html
    ├── vite.config.js
    ├── .env.example
    ├── .env
    └── package.json
```

---

## ⚙️ Getting Started

### Prerequisites
- **Node.js** (`v20.x` or higher recommended)
- **npm** (`v10.x` or higher)
- **MongoDB** (Local instance or MongoDB Atlas Cloud cluster)

---

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/NoteNest.git
cd NoteNest
```

---

### Step 2: Configure Environment Variables

#### Backend (`backend/.env`):
```env
PORT=4001
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.example.mongodb.net/notenest
FRONTEND_URL=http://localhost:5173
JWT_ACCESS_SECRET=your_super_secret_access_key
JWT_REFRESH_SECRET=your_super_secret_refresh_key
NODE_ENV=development
```

#### Frontend (`frontend/.env`):
```env
VITE_API_URL=http://localhost:4001
```

---

### Step 3: Install & Run

#### 1. Start the Backend API:
```bash
cd backend
npm install
npm run dev
```
*Backend runs on `http://localhost:4001`.*

#### 2. Start the Frontend Application:
```bash
cd ../frontend
npm install
npm run dev
```
*Frontend runs on `http://localhost:5173`.*

---

## 🔒 Security & Architecture Highlights

1. **Hashed Refresh Token Rotation:** Refresh tokens stored in the database are hashed with `bcryptjs`. During each `/refresh-token` invocation, the old token is invalidated and a newly generated pair is issued.
2. **Environment-Aware Cookies:** Refresh tokens are delivered via `httpOnly` cookies with `secure: true` and `sameSite: "none"` in production, defending against Cross-Site Scripting (XSS) and CSRF attacks.
3. **User Isolation Enforcement:** Every note creation, retrieval, modification, or deletion query strictly verifies `owner: req.userId`, preventing unauthorized cross-user access.
4. **Resilient Interceptor Pipeline:** The frontend Axios client intercepts expired access tokens, requests a silent background refresh, and transparently retries original requests without disrupting the user session.
5. **Clean Separation of Concerns:** Business logic, route handlers, middleware guards, and database schemas are completely decoupled across modular directories.

---

## 📄 License

This project is licensed under the **ISC License**.
