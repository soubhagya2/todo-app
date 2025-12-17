import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTasks,
  addNewTask,
  updateTask,
} from "../../slicers/task-slicer";

export function DoMain({ todoId, user }) {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const taskStatus = useSelector((state) => state.tasks.status);

  const [addValue, setAddValue] = useState("");

  useEffect(() => {
    if (taskStatus === "idle" && todoId) {
      dispatch(fetchTasks(todoId));
    }
  }, [taskStatus, dispatch, todoId]);

  function handleCheckboxClick(index) {
    const updatedTasks = [...tasks];
    updatedTasks[index] = {
      ...updatedTasks[index],
      completed: !updatedTasks[index].completed,
    };
    dispatch(updateTask({ todoId, tasks: updatedTasks }));
  }

  function handleAddTask() {
    if (!addValue.trim() || !todoId) return;

    const newTask = {
      id: `t${String(Math.floor(10 + Math.random() * 90))}`,
      title: addValue,
      completed: false,
      description: "",
      due_date: new Date().toISOString().split("T")[0],
      priority: "medium",
      reminder: false,
    };

    dispatch(addNewTask({ todoId, task: [...tasks, newTask] }));
    setAddValue("");
  }

  return (
    <div className="p-6 text-gray-900 dark:text-white">
      {user ? (
        <>
          <div>
            <h1 className="text-3xl font-bold">Today's Tasks</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Good morning,{" "}
              <b className="font-semibold text-gray-900 dark:text-cyan-600">
                {user.name}
              </b>
              . You have {tasks.length} tasks for today.
            </p>
          </div>
          <div className="mt-6 flex items-center gap-2">
            <input
              type="text"
              value={addValue}
              onChange={(e) => setAddValue(e.target.value)}
              placeholder="Add a new task... e.g., Finish design mockups by 5pm"
              className="w-full bg-gray-100 dark:bg-gray-800 rounded-lg h-12 px-4 focus:outline-none focus:ring-2 ring-blue-500 transition-all placeholder-gray-500 dark:placeholder-gray-400"
            />
            <button
              className="size-12 shrink-0 bg-blue-500 text-white rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
              onClick={handleAddTask}
            >
              <i className="fa-solid fa-plus text-xl"></i>
            </button>
          </div>
          <div className="mt-6 space-y-2">
            {tasks.map((task, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 rounded-lg bg-gray-100 dark:bg-gray-800/50 border border-transparent hover:border-gray-300 dark:hover:border-gray-700 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleCheckboxClick(index)}
                  className="size-5 rounded border-gray-300 dark:border-gray-600 text-blue-500 focus:ring-blue-500 bg-transparent"
                />
                <span
                  className={`${
                    task.completed
                      ? "line-through text-gray-500 dark:text-gray-400"
                      : ""
                  }`}
                >
                  {task.title}
                </span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center mt-20">
          <h1 className="text-3xl font-bold">Welcome to TaskFlow</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Please log in to manage your tasks.
          </p>
        </div>
      )}
    </div>
  );
}

       