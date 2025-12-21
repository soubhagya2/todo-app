import { useState } from "react";
import axios from "axios";

export function DoMain({ todoId, user, tasks, setTasks }) {
  const [addValue, setAddValue] = useState("");

  function handleCheckboxClick(index) {
    const updatedTasks = [...tasks];
    updatedTasks[index] = {
      ...updatedTasks[index],
      completed: !updatedTasks[index].completed,
    };
    axios
      .patch(`https://todo-api-bkdr.onrender.com/todos/${todoId}`, {
        tasks: updatedTasks,
      })
      .then(() => setTasks(updatedTasks));
  }

  function handleAddTask() {
    if (!addValue.trim() || !todoId) return;

    const newTask = {
      id: `t${Date.now()}`,
      title: addValue,
      completed: false,
      description: "",
      due_date: new Date().toISOString().split("T")[0],
      priority: "medium",
      reminder: false,
    };

    const updatedTasks = [...tasks, newTask];
    axios
      .patch(`https://todo-api-bkdr.onrender.com/todos/${todoId}`, {
        tasks: updatedTasks,
      })
      .then(() => {
        setTasks(updatedTasks);
        setAddValue("");
      });
  }

  return (
    <div className="h-full flex flex-col p-2 md:p-6 text-gray-900 dark:text-white">
      {user ? (
        <>
          <div className="shrink-0">
            <h1 className="text-2xl md:text-3xl font-bold">Today's Tasks</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Good morning,{" "}
              <b className="font-semibold text-gray-900 dark:text-cyan-600">
                {user.name}
              </b>
              . You have {tasks.length} tasks for today.
            </p>
          </div>
          <div className="mt-6 flex items-center gap-2 shrink-0">
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
          <div
            className="mt-6 space-y-2 overflow-y-auto flex-1 min-h-0"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {tasks.map((task, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 md:p-4 rounded-lg bg-gray-100 dark:bg-gray-800/50 border border-transparent hover:border-gray-300 dark:hover:border-gray-700 cursor-pointer transition-all"
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleCheckboxClick(index)}
                  className="size-5 rounded border-gray-300 dark:border-gray-600 text-blue-500 focus:ring-blue-500 bg-transparent"
                />
                <span
                  className={`flex-1 wrap-break-words ${
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
        <div className="text-center mt-10 md:mt-20 px-4">
          <h1 className="text-2xl md:text-3xl font-bold">
            Welcome to TaskFlow
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Please log in to manage your tasks.
          </p>
        </div>
      )}
    </div>
  );
}
