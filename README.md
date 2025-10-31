# Todo App — Backend & Frontend Setup

This repository contains a **clean, minimal** To‑Do application split into two parts:

* `backend/` — Node.js + Express + MongoDB (Mongoose)
* `frontend/` — React (plain Create React App / Vite / any React setup)

This `README.md` explains how to set up and run both parts locally, which ports to open, API endpoints, and example requests.

---

## Table of contents

1. **Backend**

   * Requirements
   * Install & run
   * Environment variables
   * Ports to open
   * API endpoints (examples)
2. **Frontend**

   * Requirements
   * Install & run
   * Configure API base URL
   * Example usage
3. Notes & troubleshooting

---

# 1) Backend

**Location:** `backend/`

### Requirements

* Node.js (v16+)
* npm (or pnpm/yarn)
* MongoDB (local or Atlas)

> If you use MongoDB Atlas, create a cluster and get the connection string.

### Install

```bash
cd backend
npm install
```

### Environment variables

The backend in this guide uses a single environment variable for the MongoDB connection string.
Create a `.env` file in the `backend/` folder with:

```
MONGO_URI=mongodb://127.0.0.1:27017/todoapp
PORT=5000
```

* `MONGO_URI` — MongoDB connection string (default above uses a local MongoDB).
* `PORT` — port the Express server listens on (default `5000`).

If you don't create `.env`, the server will attempt to connect to `mongodb://127.0.0.1:27017/todoapp` and run on port `5000`.

### Run (development)

```bash
# from backend/
npm run dev
# if your package.json uses node server.js, otherwise:
node server.js
```

You should see console output like :- 

`✅ MongoDB Connected` and

 `🚀 Server running on port 5000`.

### Ports to open

* **Backend:** `5000` (HTTP API)
* **MongoDB:** if running locally, `27017` (only needed if accessed from another machine)

If you run the backend on a cloud VM, open port `5000` in your firewall/security group so the frontend (or other clients) can reach it.

### API endpoints

Base URL (local): `http://localhost:5000/api/todos`

| Method | Endpoint      | Description                     | Body (JSON)              |
| ------ | ------------- | ------------------------------- | ------------------------ |
| GET    | `/`           | Get all todos                   | —                        |
| POST   | `/`           | Create a todo                   | `{ "text": "Buy milk" }` |
| PATCH  | `/toggle/:id` | Toggle completed for todo `:id` | —                        |
| PUT    | `/:id`        | Update todo text                | `{ "text": "New text" }` |
| DELETE | `/:id`        | Delete todo                     | —                        |

#### Example requests (curl)

Get all todos:

```bash
curl http://localhost:5000/api/todos
```

Create a todo:

```bash
curl -X POST http://localhost:5000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"text":"Learn React"}'
```

Toggle completed:

```bash
curl -X PATCH http://localhost:5000/api/todos/toggle/<TODO_ID>
```

Update todo text:

```bash
curl -X PUT http://localhost:5000/api/todos/<TODO_ID> \
  -H "Content-Type: application/json" \
  -d '{"text":"Updated text"}'
```

Delete todo:

```bash
curl -X DELETE http://localhost:5000/api/todos/<TODO_ID>
```

---

# 2) Frontend

**Location:** `frontend/` (or wherever your React app lives)

### Requirements

* Node.js (v16+)
* npm / pnpm / yarn

### Install

```bash
cd frontend
npm install
```
### start  frontend
```bash
npm run start
```



### Configure API base URL

Open the file where your frontend makes API calls (for example `src/hooks/useTodos.js` or a dedicated `src/config.js`). Configure the base URL to point at the backend:

```js
// example: src/config.js
export const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000/api/todos";
```

If you use CRA, create an `.env` in `frontend/`:

```
REACT_APP_API_BASE=http://localhost:5000/api/todos
```

> If your backend runs on another host/IP (for example `http://192.168.1.100:5000`), use that address instead.

### Run (development)

```bash
# from frontend/
npm start
```

The React dev server usually runs on `http://localhost:5763`. Open that in the browser and the app will call the backend at the configured `REACT_APP_API_BASE`.

### Example: hook usage

In your `useTodos` hook you might call endpoints like:

```js
const API = API_BASE; // e.g. http://localhost:5000/api/todos

// fetch all
fetch(API).then(res => res.json())

// add
fetch(API, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ text }) })

// toggle
fetch(`${API}/toggle/${id}`, { method: 'PATCH' })

// update
fetch(`${API}/${id}`, { method: 'PUT', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ text }) })

// delete
fetch(`${API}/${id}`, { method: 'DELETE' })
```

---



* **MongoDB connection errors:**

  * Make sure MongoDB is running locally (`mongod`), or your Atlas URI is correct.
  * If using Atlas, whitelist your IP or enable access from anywhere (not recommended for production).

* **Ports conflict:** If port `5000` or `3000` is in use, change `PORT` in `.env` (backend) or the frontend dev server port.

* **Deploying:** When deploying, set `MONGO_URI` and `PORT` via your host's environment variable settings. If backend and frontend are on different domains, remember to enable CORS or proxy requests.





Happy coding 👨‍💻
