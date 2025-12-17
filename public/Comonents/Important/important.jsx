import { useOutletContext } from "react-router-dom";

export default function ImportantTasks() {
  const { tasks, onTaskToggle } = useOutletContext();

  const importantTasks = tasks.filter((task) => task.priority === "high");

  return (
    <section className="flex flex-col gap-8 p-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Important Tasks</h1>
        <p className="text-gray-400">Here are your high-priority tasks.</p>
      </div>

      {importantTasks.length > 0 ? (
        <section className="flex flex-col gap-4">
          <div className="bg-background-light dark:bg-gray-800/50 p-4 rounded-xl border border-gray-200 dark:border-gray-800">
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {importantTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between gap-4 py-4"
                >
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => onTaskToggle(task.id)}
                    className="h-5 w-5 rounded border-gray-300 dark:border-gray-600
                  text-primary focus:ring-primary/50 focus:ring-2"
                  />

                  <div className="flex flex-row flex-1 min-w-0 items-center gap-3">
                    <p
                      className={`text-base font-medium truncate ${
                        task.completed
                          ? "text-gray-500 dark:text-gray-400 line-through"
                          : "text-slate-800 dark:text-white"
                      }`}
                    >
                      {task.title}
                    </p>
                  </div>

                  {task.due_date && (
                    <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                      {task.due_date}
                    </span>
                  )}

                  <span
                    className={`inline-flex items-center justify-center rounded-full px-2 py-1 text-xs font-medium whitespace-nowrap
                    bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-300`}
                  >
                    {task.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <div className="bg-background-light dark:bg-gray-800/50 p-4 rounded-xl border border-gray-200 dark:border-gray-800">
          <p className="text-gray-500 dark:text-gray-400 text-sm py-3">
            No important tasks found.
          </p>
        </div>
      )}
    </section>
  );
}
