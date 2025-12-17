import { Link, Outlet, useOutletContext } from "react-router-dom";
import axios from "axios";
import { useState, useMemo, useCallback } from "react";
import { FilterDropdown } from "./FilterDropdown";
import { AddTask } from "./AddTask";
import { EditTask } from "./EditTask";

export function AllTasks() {
  const { tasks = [], setTasks, todoId } = useOutletContext() || {};

  const [statusFilter, setStatusFilter] = useState("All");
  const [isAddTaskModalOpen, setAddTaskModalOpen] = useState(false);
  const [isEditTaskModalOpen, setEditTaskModalOpen] = useState(false);
  const [currentTaskToEdit, setCurrentTaskToEdit] = useState(null);
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [sortDirection, setSortDirection] = useState("asc");

  const handleToggleComplete = async (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);

    try {
      await axios.put(`http://localhost:3000/todos/${todoId}`, {
        tasks: updatedTasks,
      });
    } catch (error) {
      console.error("Failed to update task status:", error);
      alert("Error: Could not update the task. Please try again.");
    }
  };

  const filteredTasks = useMemo(() => {
    let sortedTasks = [...tasks]
      .filter((task) => {
        if (statusFilter === "All") return true;
        if (statusFilter === "Completed") return task.completed;
        if (statusFilter === "Incomplete") return !task.completed;
        return true;
      })
      .filter((task) => {
        if (priorityFilter === "All") return true;
        return task.priority.toLowerCase() === priorityFilter.toLowerCase();
      });

    sortedTasks.sort((a, b) => {
      const dateA = new Date(a.due_date);
      const dateB = new Date(b.due_date);
      if (sortDirection === "asc") {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });

    return sortedTasks;
  }, [tasks, statusFilter, priorityFilter, sortDirection]);

  const clearFilters = () => {
    setStatusFilter("All");
    setPriorityFilter("All");
  };

  const handleSort = () => {
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const handleDeleteAllTasks = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete all tasks? This action cannot be undone."
      )
    ) {
      setTasks([]);
      try {
        await axios.put(`http://localhost:3000/todos/${todoId}`, {
          tasks: [],
        });
      } catch (error) {
        console.error("Failed to delete all tasks:", error);
        alert("Error: Could not delete all tasks. Please try again.");
      }
    }
  };

  function handleDeleteTask(taskId) {
    if (window.confirm("Are you sure you want to delete this task?")) {
      const updatedTasks = tasks.filter(function (task) {
        return task.id !== taskId;
      });
      setTasks(updatedTasks);

      try {
        axios.put(`http://localhost:3000/todos/${todoId}`, {
          tasks: updatedTasks,
        });
      } catch (error) {
        console.error("Failed to delete task:", error);
        alert("Error: Could not delete the task. Please try again.");
      }
    }
  }

  const handleAddTask = useCallback(
    async (newTask) => {
      const taskWithId = { ...newTask, id: `t-${Date.now()}` };
      const updatedTasks = [...tasks, taskWithId];
      setTasks(updatedTasks);

      try {
        const response = await axios.get(
          `http://localhost:3000/todos/${todoId}`
        );
        const currentTodo = response.data;

        await axios.put(`http://localhost:3000/todos/${todoId}`, {
          ...currentTodo,
          tasks: updatedTasks,
        });
      } catch (error) {
        console.error("Failed to add task:", error);
        alert("Error: Could not add the task. Please try again.");
        setTasks(tasks);
      }
    },
    [tasks, setTasks, todoId]
  );

  const handleOpenEditModal = (task) => {
    setCurrentTaskToEdit(task);
    setEditTaskModalOpen(true);
  };

  const handleUpdateTask = useCallback(
    async (updatedTask) => {
      const updatedTasks = tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      );
      setTasks(updatedTasks);

      try {
        const response = await axios.get(
          `http://localhost:3000/todos/${todoId}`
        );
        const currentTodo = response.data;

        await axios.put(`http://localhost:3000/todos/${todoId}`, {
          ...currentTodo,
          tasks: updatedTasks,
        });
      } catch (error) {
        console.error("Failed to update task:", error);
        alert("Error: Could not update the task. Please try again.");
        // Optionally revert state
        setTasks(tasks);
      }
    },
    [tasks, setTasks, todoId]
  );

  return (
    <div className=" gap-4 flex-1">
      <main className="overflow-y-auto">
        <div className="p-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-col gap-1">
                <h1 className="text-slate-900 dark:text-white text-3xl font-bold leading-tight tracking-tight">
                  All Tasks
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal">
                  View and manage all your tasks in one place.
                </p>
              </div>

              <button
                onClick={() => setAddTaskModalOpen(true)}
                className="flex min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-10 px-4 bg-blue-600 text-white text-sm font-bold leading-normal tracking-wide hover:bg-blue-500 transition-colors"
              >
                <i className="fa-solid fa-plus"></i>
                <span className="truncate">Add New Task</span>
              </button>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-y border-slate-200 dark:border-slate-800 py-3">
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Filter by:
                </p>

                <FilterDropdown
                  label="Status"
                  options={["All", "Completed", "Incomplete"]}
                  selectedValue={statusFilter}
                  onSelect={setStatusFilter}
                />
                <FilterDropdown
                  label="Priority"
                  options={["All", "High", "Medium", "Low"]}
                  selectedValue={priorityFilter}
                  onSelect={setPriorityFilter}
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleSort}
                  className="flex h-8 items-center justify-center gap-2 rounded-lg bg-slate-100 dark:bg-slate-800/50 px-3 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                >
                  <i
                    className={`fa-solid ${
                      sortDirection === "asc"
                        ? "fa-arrow-up-wide-short"
                        : "fa-arrow-down-wide-short"
                    }`}
                  ></i>
                  <p className="text-sm font-medium leading-normal">
                    Sort by Date
                  </p>
                </button>
                <button
                  onClick={handleDeleteAllTasks}
                  className="flex h-8 items-center justify-center gap-2 rounded-lg px-3 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
                >
                  <i className="fa-solid fa-xmark"></i>
                  <p className="text-sm font-medium leading-normal">
                    Clear All
                  </p>
                </button>
              </div>
            </div>

            <div className="mt-6 overflow-x-auto">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800">
                  <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
                    <thead className="bg-slate-50 dark:bg-slate-800/50">
                      <tr>
                        <th className="relativ text-left px-6 py-3.5">
                          <span className="text-sm  font-semibold text-slate-900 dark:text-white ">
                            Select
                          </span>
                        </th>
                        <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-slate-900 dark:text-white">
                          Task Title
                        </th>
                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900 dark:text-white">
                          Description
                        </th>
                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900 dark:text-white">
                          Due Date
                        </th>
                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900 dark:text-white">
                          Priority
                        </th>
                        <th className="relative py-3.5 pl-3 pr-4">
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900/40">
                      {filteredTasks.map((task) => (
                        <tr key={task.id}>
                          <td className="relative px-6 py-4">
                            <input
                              checked={task.completed}
                              onChange={() => handleToggleComplete(task.id)}
                              type="checkbox"
                              className="h-4 w-4 rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500"
                            />
                          </td>
                          <td
                            className={`whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium ${
                              task.completed
                                ? "text-slate-500 dark:text-slate-400 line-through"
                                : "text-slate-900 dark:text-white"
                            }`}
                          >
                            {task.title}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500 dark:text-slate-400">
                            {task.description}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500 dark:text-slate-400">
                            {task.due_date}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm">
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                task.priority === "high"
                                  ? "bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-300"
                                  : task.priority === "medium"
                                  ? "bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-300"
                                  : "bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300"
                              }`}
                            >
                              {task.priority}
                            </span>
                          </td>
                          <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium">
                            <div className="flex items-center justify-end gap-x-4">
                              <button
                                onClick={() => handleOpenEditModal(task)}
                                className="text-slate-500 hover:text-blue-600 cursor-pointer dark:text-slate-400 dark:hover:text-blue-400 transition-colors"
                              >
                                <i className="fa-solid fa-pencil"></i>
                              </button>
                              <button
                                onClick={() => handleDeleteTask(task.id)}
                                className="text-slate-500 hover:text-red-600 cursor-pointer dark:text-slate-400 dark:hover:text-red-400 transition-colors"
                              >
                                <i className="fa-solid fa-trash"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <AddTask
        open={isAddTaskModalOpen}
        onClose={() => setAddTaskModalOpen(false)}
        onAddTask={handleAddTask}
      />
      <EditTask
        open={isEditTaskModalOpen}
        onClose={() => setEditTaskModalOpen(false)}
        task={currentTaskToEdit}
        onUpdateTask={handleUpdateTask}
      />
      <Outlet />
    </div>
  );
}
