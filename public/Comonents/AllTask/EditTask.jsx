import React, { useState, useEffect } from "react";
import { Modal, Box } from "@mui/material";

export function EditTask({ open, onClose, task, onUpdateTask }) {
  const [taskTitle, setTaskTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");
  const [reminder, setReminder] = useState(false);

  useEffect(() => {
    if (task) {
      setTaskTitle(task.title || "");
      setDescription(task.description || "");
      setDueDate(task.due_date || "");
      setPriority(task.priority || "medium");
      setReminder(task.reminder || false);
    }
  }, [task]);

  const handleUpdate = () => {
    if (!taskTitle.trim()) {
      alert("Please enter a task title");
      return;
    }

    const updatedTask = {
      ...task,
      title: taskTitle,
      description,
      due_date: dueDate,
      priority,
      reminder,
    };

    onUpdateTask(updatedTask);
    onClose();
  };

  if (!task) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="fixed top-1/2 left-1/2 w-[420px] -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Edit Task
          </h2>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-900 dark:hover:text-white"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="task-title-edit"
              className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
            >
              Task Title
            </label>
            <input
              type="text"
              id="task-title-edit"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md text-sm shadow-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
            />
          </div>
          <div>
            <label
              htmlFor="description-edit"
              className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
            >
              Description
            </label>
            <textarea
              id="description-edit"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
              className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md text-sm shadow-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="due-date-edit"
              className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
            >
              Due Date
            </label>
            <input
              type="date"
              id="due-date-edit"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md text-sm shadow-sm dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Priority
            </label>
            <div className="flex gap-2">
              {["low", "medium", "high"].map((p) => (
                <button
                  key={p}
                  onClick={() => setPriority(p)}
                  className={`flex-1 py-2 text-sm rounded-md transition-colors ${
                    priority === p
                      ? "bg-blue-600 text-white"
                      : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600"
                  }`}
                >
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between rounded-lg bg-slate-100 dark:bg-slate-700/50 p-3">
              <div className="flex items-center gap-3">
                <i className="fa-solid fa-bell text-slate-500 dark:text-slate-400"></i>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Set Reminder
                </span>
              </div>
              <button
                type="button"
                onClick={() => setReminder(!reminder)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 ${
                  reminder ? "bg-blue-600" : "bg-slate-200 dark:bg-slate-600"
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    reminder ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold"
          >
            Update Task
          </button>
        </div>
      </Box>
    </Modal>
  );
}
