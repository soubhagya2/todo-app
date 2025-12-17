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


## Push to git hub
> Step : 1  Check the github version 
 #### git --version
 >Step : 2 check folder name
 #### pwd
 >Step : 3 what upload to git hub
 #### ls
 >Step : 4 Update gitignore file
 #### touch .gitignore
 #### notepad .gitignore
 Copy from notepad and paste to .gitignore
>Step : 4 git add 
#### git add .
>Step : 5 check git file
#### it status
>Step : 6 Initialize git repo
#### git commit -m "Initial commit"
>Step : 7 Add remote file
#### git remote add origin https://github.com/soubhagya2/todo-app.git
#### git remote -v
#### git pull origin main --no-rebase
#### git stash
#### git pull origin main --allow-unrelated-histories
#### git stash pop
#### git push -u origin main


