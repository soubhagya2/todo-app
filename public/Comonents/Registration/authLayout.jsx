import { Outlet } from "react-router-dom";
import { Header } from "../HomePage/Header";

export function AuthLayout({ tasks, setTasks, user, todoId }) {
  return (
    <div className="min-h-screen bg-gray-100/20 dark:bg-gray-900">
      <Header />
      <main className="  w-full">
        <Outlet context={{ tasks, setTasks, user, todoId }} />
      </main>
    </div>
  );
}
