import { useOutletContext } from "react-router-dom";

export default function UpcomingTasks() {
  const { tasks, onTaskToggle } = useOutletContext();

  const today = new Date();

  // Convert date string → Date object (ignore timezone issue)
  const normalize = (dateStr) => {
    const [y, m, d] = dateStr.split("-");
    return new Date(y, m - 1, d);
  };

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  // Helper function
  const isSameDay = (date1, date2) =>
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate();

  const getWeekNumber = (date) => {
    const firstDay = new Date(date.getFullYear(), 0, 1);
    const diff =
      (date -
        firstDay +
        (firstDay.getTimezoneOffset() - date.getTimezoneOffset()) * 60000) /
      86400000;
    return Math.floor(diff / 7);
  };

  const currentWeek = getWeekNumber(today);

  // Groups
  const tomorrowTasks = tasks.filter((task) => {
    if (!task.due_date) return false;
    return isSameDay(normalize(task.due_date), tomorrow);
  });

  const thisWeekTasks = tasks.filter((task) => {
    if (!task.due_date) return false;
    const due = normalize(task.due_date);
    return (
      getWeekNumber(due) === currentWeek && due > tomorrow // not tomorrow
    );
  });

  const nextWeekTasks = tasks.filter((task) => {
    if (!task.due_date) return false;
    const due = normalize(task.due_date);
    return getWeekNumber(due) === currentWeek + 1;
  });

  // Section UI helper
  const TaskSection = ({ title, list }) =>
    list.length > 0 && (
      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-bold text-slate-800 dark:text-white">
          {title}
        </h2>
        <div className="bg-background-light dark:bg-gray-800/50 p-4 rounded-xl border border-gray-200 dark:border-gray-800">
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {list.map((task) => (
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

                {/* {task.description && (
                  <span
                    className={`text-base font-medium truncate border-l-2 pl-3 ${
                      task.completed
                      ? "text-gray-500 dark:text-gray-400 line-through"
                      : "text-slate-800 dark:text-white"
                    }`}
                  >
                    {task.description}
                  </span>
                )} */}
              </div>
              
                {task.due_date && (
                  <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                    {task.due_date}
                  </span>
                )}

                <span
                  className={`inline-flex items-center justify-center rounded-full px-2 py-1 text-xs font-medium whitespace-nowrap
                    ${
                      task.priority === "high"
                        ? "bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-300"
                        : task.priority === "medium"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-500/20 dark:text-yellow-300"
                        : "bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-300"
                    }`}
                >
                  {task.priority}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    );

  return (
    <section className="flex flex-col gap-8 p-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Upcoming Tasks</h1>
        <p className="text-gray-400">
          Here are your tasks for the upcoming days.
        </p>
      </div>

      <TaskSection title="Tomorrow" list={tomorrowTasks} />
      <TaskSection title="This Week" list={thisWeekTasks} />
      <TaskSection title="Next Week" list={nextWeekTasks} />

      {tomorrowTasks.length === 0 &&
        thisWeekTasks.length === 0 &&
        nextWeekTasks.length === 0 && (
          <p className="text-gray-500 dark:text-gray-400 text-sm py-3">
            No upcoming tasks.
          </p>
        )}
    </section>
  );
}
