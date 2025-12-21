# 📝 Todo App

A modern **Todo Application** built using **React + Vite**, styled with **Tailwind CSS**, and powered by a simple JSON backend for learning and practice purposes.

This project helps you understand **CRUD operations**, component-based UI, and a complete **frontend development + GitHub workflow**.

---

## 🚀 Features

* ✅ Add new todos
* ✏️ Edit existing todos
* 🗑️ Delete todos
* 📋 View all todos
* 🎨 Clean and responsive UI with Tailwind CSS
* 🌙 Optional Dark Mode support

---

## 🛠️ Tech Stack

* **Frontend:** React (Vite)
* **Styling:** Tailwind CSS
* **State Management:** React Hooks / Redux Toolkit
* **Routing:** React Router DOM
* **HTTP Client:** Axios
* **Forms & Validation:** Formik + Yup
* **UI Libraries:** Font Awesome, Material UI
* **Calendar:** react-calendar / react-day-picker
* **Backend (Mock):** JSON Server (`db.json`)
* **Package Manager:** npm

---

## 📂 Project Structure

```
todo-app/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── store/          # redux store (if used)
│   ├── App.jsx
│   └── main.jsx
├── db.json
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── .gitignore
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/soubhagya2/todo-app.git
cd todo-app
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Start the development server

```bash
npm run dev
```

Open in browser:

```
http://localhost:5173
```

---

## 🧪 Backend Setup (Optional – JSON Server)

If using `db.json` as a mock backend:

```bash
npx json-server --watch db.json --port 3000
```

API runs at:

```
http://localhost:3000
```

---

## 🎨 Tailwind CSS Setup (Vite)

### Install Tailwind

```bash
npm install tailwindcss @tailwindcss/vite
```

### Update `vite.config.js`

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

### Add to `index.css`

```css
@import "tailwindcss";

/* Dark mode support */
@custom-variant dark (&:where(.dark, .dark *));
```

---

## 📦 Additional Libraries Installed

```bash
# Icons
npm install @fortawesome/fontawesome-free

# Routing
npm install react-router-dom

# HTTP Client
npm install axios

# Forms & Validation
npm install formik yup

# Calendar
npm install react-calendar react-day-picker

# UI Library
npm install @mui/material @emotion/react @emotion/styled

# Cookies
npm install react-cookie

# Redux Toolkit
npm install @reduxjs/toolkit react-redux

# install toast
npm install react-toastify

```

---

## 📦 Build for Production

```bash
npm run build
```

---

## 🧹 Git Ignore

Ignored files:

* `node_modules/`
* `dist/`
* `.env`

---

## 📌 Learning Goals

* React fundamentals
* Component-based architecture
* CRUD operations
* State management
* Routing
* Git & GitHub workflow

---

## 🚀 Push Project to GitHub (Correct Steps)

```bash
# 1. Check Git version
git --version

# 2. Verify project folder
pwd
ls

# 3. Initialize Git (only once)
git init

# 4. Add files
git add .

# 5. Check status
git status

# 6. Commit changes
git commit -m "Initial commit"

# 7. Add remote repository
git remote add origin https://github.com/soubhagya2/todo-app.git
git remote -v

# 8. Pull remote history safely
git stash
git pull origin main --allow-unrelated-histories
git stash pop

# 9. Push to GitHub
git push -u origin main
```

---

## 👤 Author

**Soubhagya Rout**
GitHub: [@soubhagya2](https://github.com/soubhagya2)

---

## 📄 License

This project is for **learning and educational purposes only**.

⭐ If you find this project helpful, please **star the repository**!
