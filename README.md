# 📝 Electron Todo App Boilerplate

A modular boilerplate for building cross-platform desktop apps using **Electron**, **Next.js (SSG)**, **Mantine UI**, and **SQLite + Prisma**.  
This project implements a basic **Todo App** with structured inter-process communication and persistent storage.

---

## 🧱 Tech Stack

- **Electron + TypeScript** — Main process (native desktop container)
- **Next.js (SSG)** — Renderer process (UI layer)
- **Mantine UI** — Beautiful and responsive component library
- **IPC (IpcMain/IpcRenderer)** — Communication between main and renderer
- **SQLite** — Embedded local database
- **Prisma ORM** — Type-safe database client

---

## 📁 Project Structure

```
electron-todo/
├─ browser/         # Next.js renderer with Mantine
│  ├─ components/   # UI components
│  ├─ pages/        # Next.js routes (SSG)
│  ├─ public/       # Static assets
│  ├─ styles/       # Global styles
│  ├─ types/        # Shared types (preload, todo)
│  └─ ...           # Configs and package setup
│
├─ main/            # Electron main process
│  ├─ src/          # Source code (controllers, events, utils)
│  ├─ prisma/       # DB schema, migrations, SQLite file
│  └─ dist/         # Built files
│
├─ forge.config.js  # Electron Forge config
├─ package.json     # Root-level scripts
└─ README.md
```

---

## 🚀 Getting Started

### 1. Clone and install dependencies

```bash
git clone https://github.com/DEEJ4Y/electron-todo.git
cd electron-todo
npm install
```

### 2. Set up the database (Prisma + SQLite)

```bash
cd main
npx prisma generate
npx prisma migrate dev --name init
```

> This creates the local `dev.db` file and prepares Prisma client.

### 3. Run the app

In separate terminals or via a process manager:

```bash
# Terminal 1 - Renderer
cd browser
npm install
npm run dev

# Terminal 2 - Main process
cd main
npm install
npm run dev

# Terminal 3 - Launch Electron
npm start
```

> The Electron app will launch using the latest built Next.js and main process code.

---

## 🛠️ Available Scripts

### Root
- `npm start` — Launch Electron app using latest browser & main
- `npm run make` — Package the app (via Electron Forge)

### `browser/` (Next.js)
- `npm run dev` — Start Next.js dev server
- `npm run build` — Build static site
- `npm run lint` — Run ESLint

### `main/` (Electron)
- `npm run dev` — Start main process (watch mode)
- `npx prisma` — Run Prisma CLI

---

## 🧠 Features

- 📋 Add, check, and delete todos and todo lists
- ⚡ Seamless IPC communication (Electron ↔ Next.js)
- 💾 Persistent local storage via SQLite
- 🧩 Modular controllers for maintainability
- 🎨 Responsive UI with Mantine components

---

## 🔐 Database Schema (Prisma)

Located in `main/prisma/schema.prisma`:
- `TodoList` model
- `Todo` model with `checked` status

---

## 📦 Packaging

You can build the app using:

```bash
npm run make
```

> The output will be located in the `out/` directory.

---

## 📄 License

MIT — use this boilerplate freely for your own projects.
