# Install React with Vite inside a folder
> npm create vite@latest . -- --template react


## Install Tailwindcss for vite
> npm install tailwindcss @tailwindcss/vite

### Then go to vite.config.js and add
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss(),],
  
})

### Then add  to index.css file
> @import "tailwindcss";

### To make dark mode work add to index.css file
> @custom-variant dark (&:where(.dark, .dark *));

## Install fontawsome icons 
> npm install @fortawesome/fontawesome-free
### Then add to index.css file
> @import '@fortawesome/fontawesome-free/css/all.css';

## React Router DOM installation
> npm install react-router-dom

### Add to main.jsx
> import { BrowserRouter } from "react-router-dom";

  <BrowserRouter>
    <App />
  </BrowserRouter>

### Add to App.jsx
> import { Routes, Route, Link } from "react-router-dom";

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>

## Install calender library to make calender simpler
> npm install react-calendar

## Install Material UI (MUI) in a React project
 > npm install @mui/material @emotion/react @emotion/styled

## Install Axios library
> npm install axios

## Install Formik for form validation
> npm install formik

## Install yup for form validation
>npm install yup


## Install React cookies library
> npm install react-cookie

## To use Calender
> npm install react-day-picker

## Install redux toolkit
>npm install @reduxjs/toolkit react-redux
# todo-app
Simple todo app to create, organize, and track daily tasks
