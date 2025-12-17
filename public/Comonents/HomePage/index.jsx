import { MainContent } from "./MainContent";
import { useOutletContext } from "react-router-dom";
import { RightSidebar } from "./RightSidebar";

export function Index() {
  const { tasks, setTasks, todoId, user } = useOutletContext();

  return (
    <div className="flex gap-4 w-full h-full">
      <div className="flex-1">
        <MainContent tasks={tasks} setTasks={setTasks} todoId={todoId} user={user} />
      </div>
      <div className="w-[350px] shrink-0">
        <RightSidebar tasks={tasks} />
      </div>
    </div>
  );
}
