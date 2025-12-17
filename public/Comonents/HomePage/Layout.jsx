import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import axios from "axios";

export function Layout() {
  const [cookie] = useCookies(["userid", "useremail"]);
  const [tasks, setTasks] = useState([]);
  const [todoId, setTodoId] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (cookie.useremail) {
      async function fetchTasks() {
        try {
          const response = await axios.get(
            `http://localhost:3000/todos?user_email=${cookie.useremail}`
          );
          if (response.data.length > 0) {
            setTasks(response.data[0].tasks);
            setTodoId(response.data[0].id);
          }
        } catch (error) {}
      }
      fetchTasks();
      function fetchUser() {
        axios
          .get(`http://localhost:3000/users?email=${cookie.useremail}`)
          .then((response) => {
            setUser(response.data[0]);
          })
          .catch((err) => console.error("Error fetching user:", err));
      }
      fetchUser();
    } else {
      setTasks([]);
      setUser(null);
    }
  }, [cookie.useremail]);

  return (
    <div className="min-h-screen bg-gray-100/20 dark:bg-gray-900 transition-colors duration-300">
      <div className="flex flex-col ">
        <Header user={user} tasks={tasks} setTasks={setTasks} />
        <div className="grid grid-cols-[250px_1fr] gap-4 flex-1 h-full">
          <Sidebar tasks={tasks} />
          <main className="overflow-y-auto h-full">
            <Outlet context={{ tasks, setTasks, todoId, user }} />
          </main>
        </div>
      </div>
    </div>
  );
}
