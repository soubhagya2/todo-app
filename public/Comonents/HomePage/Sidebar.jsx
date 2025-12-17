import { NavLink } from "react-router-dom";

export function Sidebar({ tasks }) {
  const getLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-lg transition ${
      isActive
        ? "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white font-medium"
        : "hover:bg-gray-200 dark:hover:bg-gray-800"
    }`;

  return (
    <aside className="flex flex-col border-r border-gray-200 dark:border-gray-700 p-4 text-gray-900 dark:text-white h-full overflow-y-auto">
      <nav className="flex flex-col gap-1">
        <NavLink to="/" className={getLinkClass} end>
          <i className="fa-solid fa-calendar-day w-5 text-center"></i>
          Today
          <span className="ml-auto text-xs text-gray-600 dark:text-gray-300">
            {tasks.length}
          </span>
        </NavLink>

        <NavLink to="upcoming-tasks" className={getLinkClass}>
          <i className="fa-solid fa-calendar-week w-5 text-center"></i>
          Upcoming
          <span className="ml-auto text-xs text-gray-600 dark:text-gray-300">
            1
          </span>
        </NavLink>

        <NavLink to="/all-tasks" className={getLinkClass}>
          <i className="fa-solid fa-list-ul w-5 text-center"></i>
          All Tasks
          <span className="ml-auto text-xs text-gray-600 dark:text-gray-300">
            {tasks.length}
          </span>
        </NavLink>

        <NavLink to="important" className={getLinkClass}>
          <i className="fa-solid fa-star w-5 text-center"></i>
          Important
          <span className="ml-auto text-xs text-gray-600 dark:text-gray-300">
            3
          </span>
        </NavLink>

        <NavLink to="completed" className={getLinkClass}>
          <i className="fa-solid fa-check-double w-5 text-center"></i>
          Completed
          <span className="ml-auto text-xs text-gray-600 dark:text-gray-300">
            5
          </span>
        </NavLink>
      </nav>
    </aside>
  );
}
