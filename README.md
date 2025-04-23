# 📝 Electron Todo App Boilerplate

A minimal boilerplate for building cross-platform desktop applications using **Electron**, **TypeScript**, **Next.js (SSG)**, and **Mantine UI**.  
This project showcases a simple **Todo App** with IPC-based communication between the **main** and **renderer** processes.

---

## 🧱 Tech Stack

- **Electron** — Desktop application runtime
- **TypeScript** — Type-safe main process code
- **IpcMain/IpcRenderer** — Communication bridge between Electron processes
- **Next.js** — React-based renderer (Static Site Generation)
- **Mantine UI** — Modern component library for clean UI

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/DEEJ4Y/electron-todo.git
cd electron-todo
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start in development

```bash
npm run dev
```

This will:

- Launch the Electron app
- Start the Next.js development server
- Use IPC for communication between renderer and main

---

## 🛠️ Available Scripts

- `npm run dev` — Start Electron + Next.js in development
- `npm run build` — Build the app for production
- `npm run start` — Run the built app
- `npm run lint` — Lint code with ESLint
- `npm run typecheck` — Run TypeScript type checks

---

## 💬 IPC Communication

The app uses Electron’s `ipcMain` and `ipcRenderer` modules for inter-process communication:

- Renderer (Next.js) sends todo updates to the main process
- Main process can persist or manipulate data and send it back

---

## 🖼️ UI

The interface is built using **Mantine UI**, providing a modern look and responsive layout with components like:

- Inputs
- Buttons
- Lists
- Modal dialogs

---

## 📦 Packaging

You can package the app using Electron Builder or Forge (not included by default).  
Recommended: [Electron Builder](https://www.electron.build/)

---

## 📁 Project Structure

```
.
├── main/              # Electron main process (TypeScript)
├── renderer/          # Next.js app (React + Mantine)
├── public/            # Static assets
├── package.json       # Project metadata & scripts
├── tsconfig.json      # TypeScript config
```

---

## 🧪 Features

- Add / Remove / Mark todos
- Persistent state (can be extended to use file system or database)
- Cross-platform compatible
- SSG with SEO-ready structure

---

## 📄 License

MIT License. Feel free to use and customize this template for your own Electron apps.

---
