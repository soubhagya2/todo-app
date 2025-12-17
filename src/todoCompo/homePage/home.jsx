import { DoHeader } from "./header";
import { DoMain } from "./MainContent";
import { DoRight } from "./RightSidebar";
import { Sidebar } from "./Sidebar";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export function Home() {
  const [cookies] = useCookies(["userid", "useremail"]);
  const [user, setUser] = useState(null);
  const [todoId, setTodoId] = useState(null);
  const tasks = useSelector((state) => state.tasks.tasks);

  useEffect(() => {
    if (cookies.userid) {
      axios
        .get(`http://localhost:3000/users/${cookies.userid}`)
        .then((response) => {
          setUser(response.data);
          axios
            .get(`http://localhost:3000/todos?user_email=${response.data.email}`)
            .then((todoResponse) => {
              if (todoResponse.data.length > 0) {
                setTodoId(todoResponse.data[0].id);
              }
            });
        });
    }
  }, [cookies.userid]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      <DoHeader user={user} todoId={todoId} setTodoId={setTodoId}  />

      <div className="flex flex-1 gap-4 ">
        <aside className="w-[250px] shrink-0">
          <Sidebar tasks={tasks} />
        </aside>

        <main className="flex-1">
          <DoMain todoId={todoId} user={user} />
        </main>

        <aside className="w-[300px] shrink-0">
          <DoRight tasks={tasks} />
        </aside>
      </div>
    </div>
  );
}
