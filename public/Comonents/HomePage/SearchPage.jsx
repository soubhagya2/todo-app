import { useSearchParams } from "react-router-dom";
import axios from "axios";

export function SearchPage({ tasks = [], setTasks, userId }) {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("search") || "";

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(query.toLowerCase()) ||
      (task.description &&
        task.description.toLowerCase().includes(query.toLowerCase()))
  );

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700 border-red-200";
      case "medium":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "low":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const handleToggleComplete = async (taskId) => {
    let updatedTask;

    // Optimistically update the UI
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks); // Update the state to re-render

    // Persist the change to the backend (assuming userData.id is available)
    try {
      await axios.put(`http://localhost:3000/todos/${userId}`, {
        tasks: updatedTasks,
      });
    } catch (error) {
      console.error("Failed to update task status:", error);
      alert("Error: Could not update the task. Please try again.");
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-6">
          <div className="mb-2 sm:mb-0">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              Search Results
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Found {filteredTasks.length} tasks for "{query}"
            </p>
          </div>
        </div>

        <div className="grid gap-4">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                className={`group bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-5 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200 ${
                  task.completed ? "opacity-60" : "opacity-100"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                  <div className="flex-1 w-full">
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-medium border uppercase tracking-wide ${getPriorityColor(
                          task.priority
                        )}`}
                      >
                        {task.priority}
                      </span>
                      {task.reminder && (
                        <span className="text-blue-500 text-xs flex items-center gap-1">
                          <i className="fa-regular fa-bell"></i> Reminder
                        </span>
                      )}
                    </div>

                    <h3
                      className={`text-lg font-semibold text-gray-800 dark:text-gray-100 ${
                        task.completed
                          ? "line-through text-gray-500 dark:text-gray-500"
                          : ""
                      }`}
                    >
                      {task.title}
                    </h3>

                    {task.description && (
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 line-clamp-1">
                        {task.description}
                      </p>
                    )}
                  </div>

                  <div className="flex sm:flex-col justify-between sm:justify-start items-center sm:items-end gap-3 mt-4 sm:mt-0 sm:ml-4 w-full sm:w-auto">
                    <div className="text-left sm:text-right">
                      <p className="text-xs text-gray-400">Due Date</p>
                      <p
                        className={`text-sm font-medium ${
                          new Date(task.due_date) < new Date() &&
                          !task.completed
                            ? "text-red-500"
                            : "text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {task.due_date}
                      </p>
                    </div>

                    <button
                      onClick={() => handleToggleComplete(task.id, task)}
                      aria-label={
                        task.completed
                          ? "Mark as incomplete"
                          : "Mark as complete"
                      }
                      className="transition-transform duration-200 ease-in-out hover:scale-110"
                    >
                      {task.completed ? (
                        <span className="size-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                          <i className="fa-solid fa-check"></i>
                        </span>
                      ) : (
                        <div className="size-8 rounded-full border-2 border-gray-300 dark:border-gray-600 group-hover:border-blue-500 dark:group-hover:border-blue-400 transition-colors"></div>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
              <i className="fa-solid fa-magnifying-glass text-4xl text-gray-300 mb-3"></i>
              <p className="text-gray-500">No tasks found matching "{query}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
