import { DoHeader } from "./header";
import { DoMain } from "./MainContent";
import { DoRight } from "./RightSidebar";
import { Sidebar } from "./Sidebar";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import axios from "axios";

export function Home() {
  const [cookies] = useCookies(["userid", "useremail"]);
  const [user, setUser] = useState(null);
  const [todoId, setTodoId] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (cookies.userid) {
      axios
        .get(`https://todo-api-bkdr.onrender.com/users/${cookies.userid}`)
        .then((response) => {
          setUser(response.data);
          axios
            .get(
              `https://todo-api-bkdr.onrender.com/todos?id=${response.data.email}`
            )
            .then((todoResponse) => {
              if (todoResponse.data.length > 0) {
                setTodoId(todoResponse.data[0].id);
              } else {
                axios
                  .post("https://todo-api-bkdr.onrender.com/todos", {
                    id: response.data.email,
                    tasks: [],
                  })
                  .then((res) => {
                    setTodoId(res.data.id);
                  });
              }
            });
        });
    }
  }, [cookies.userid]);

  useEffect(() => {
    if (todoId) {
      axios
        .get(`https://todo-api-bkdr.onrender.com/todos/${todoId}`)
        .then((res) => setTasks(res.data.tasks || []));
    }
  }, [todoId]);

  return (
    <div className="h-screen supports-[height:100dvh]:h-dvh flex flex-col bg-gray-100 dark:bg-gray-900 overflow-hidden">
      <DoHeader
        user={user}
        todoId={todoId}
        setTodoId={setTodoId}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div className="flex flex-col md:flex-row flex-1 gap-4 mx-auto w-full overflow-hidden">
        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar - Drawer on Mobile, Sticky on Desktop */}
        <div
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-[#0F172A] transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:w-[250px] md:shrink-0 md:bg-transparent ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar
            tasks={tasks}
            user={user}
            onClose={() => setIsSidebarOpen(false)}
          />
        </div>

        <main className="flex-1 w-full min-w-0 min-h-0">
          <DoMain
            todoId={todoId}
            user={user}
            tasks={tasks}
            setTasks={setTasks}
          />
        </main>

        <div className="hidden lg:block w-[300px] shrink-0">
          <DoRight tasks={tasks} />
        </div>
      </div>
    </div>
  );
}
