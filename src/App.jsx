import { Routes, Route } from "react-router-dom";
import { Index } from "./Comonents/HomePage/index.jsx";
import UserRegistration from "./Comonents/Registration/Register.jsx";
import Login from "./Comonents/Registration/Login.jsx";
import { SearchPage } from "./Comonents/HomePage/SearchPage.jsx";
import { AllTasks } from "./Comonents/AllTask/AllTask.jsx";
import { Layout } from "./Comonents/HomePage/Layout.jsx";
import { AuthLayout } from "./Comonents/Registration/authLayout.jsx";
import UpcomingTasks from "./Comonents/UpcomingTask/upcoming.jsx";
import ImportantTasks from "./Comonents/Important/important.jsx";
import CompletedTasks from "./Comonents/completed/complete.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Index />} />
        <Route path="all-tasks" element={<AllTasks />} />
          <Route path="upcoming-tasks" element={<UpcomingTasks />} />
          <Route path="important" element={<ImportantTasks />} />
          <Route path="completed" element={<CompletedTasks />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="search" element={<SearchPage />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<UserRegistration />} />
      </Route>
    </Routes>
  );
}

export default App;
