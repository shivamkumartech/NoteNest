# NoteNest - Express Backend REST API ⚙️

This directory contains the Node.js & Express backend API for **NoteNest**, using MongoDB (with Mongoose ODM) for data persistence.

For full setup instructions, system architecture, API schemas, and details on how to run the entire application, please refer to the main **[Root README.md](../README.md)**.

## 🛠️ Tech Stack & Highlights

- **Express.js (v5):** Robust routing and routing middleware handlers.
- **Mongoose & MongoDB:** Trimmed field validation schemas and automated audit timestamps (`createdAt`, `updatedAt`).
- **ES Modules (ESM):** Native JavaScript modules (`import`/`export`) support.
- **Nodemon:** Hot reload development watcher.

## 📡 Endpoints

The API is mounted at `/api/v1/notesapp/`.

- `POST /create-note` - Create a new note.
- `GET /get-AllNotes` - Retrieve all notes (sorted newest first).
- `PUT /update-note/:id` - Update an existing note's title and content.
- `DELETE /delete-note/:id` - Delete a note.

## 🚀 Commands

Inside this directory, you can run:

```bash
# Install dependencies
npm install

# Start the server with hot-reloading (nodemon)
npm start
```
