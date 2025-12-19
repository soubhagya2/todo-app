import { NavLink, Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export function Sidebar({ tasks = [], user, onClose }) {
  const navigate = useNavigate();
  const [cookies, , removeCookie] = useCookies(["userid", "useremail"]);

  const linkBase =
    "group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all";

  const getLinkClass = ({ isActive }) =>
    `${linkBase} ${
      isActive
        ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md"
        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
    }`;

  return (
    <aside className="h-full w-full flex flex-col border-r md:border-r-0 border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0F172A] md:rounded-xl md:shadow-sm md:h-[calc(100vh-100px)] md:sticky md:top-24">
      {/* PROFILE */}
      <div className="px-5 pt-6 pb-3 ">
        {cookies.useremail ? (
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <Link
              to="/profile"
              className="shrink-0 size-12 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-md"
            >
              <i className="fa-regular fa-user text-white text-lg" />
            </Link>

            {/* User Info */}
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                {user?.name || "User"}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {cookies.useremail}
              </div>
            </div>

            {/* Logout */}
            <button
              onClick={() => {
                removeCookie("useremail", { path: "/" });
                removeCookie("userid", { path: "/" });
                navigate("/");
              }}
              className="text-gray-400 hover:text-red-500 transition"
              title="Logout"
            >
              <i className="fa-solid fa-right-from-bracket text-sm" />
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="flex items-center gap-4 p-4 rounded-xl bg-linear-to-r from-blue-500 to-blue-600 text-white shadow-md"
          >
            <div className="size-12 rounded-full bg-white/20 flex items-center justify-center">
              <i className="fa-regular fa-user text-lg" />
            </div>
            <div>
              <div className="font-semibold text-sm">Sign In</div>
              <div className="text-xs text-blue-100">Access your tasks</div>
            </div>
          </Link>
        )}
      </div>

      {/* MENU */}
      <div className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
        Menu
      </div>

      {/* NAV */}
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
        <NavLink to="/" end className={getLinkClass} onClick={onClose}>
          {({ isActive }) => (
            <>
              <i className="fa-solid fa-calendar-day w-5 text-center" />
              Today
              <span
                className={`ml-auto px-2 py-0.5 rounded-full text-xs font-semibold ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                {tasks.length}
              </span>
            </>
          )}
        </NavLink>

        <NavLink to="upcoming-tasks" className={getLinkClass} onClick={onClose}>
          <i className="fa-solid fa-calendar-week w-5 text-center" />
          Upcoming
        </NavLink>

        <NavLink to="/all-tasks" className={getLinkClass} onClick={onClose}>
          <i className="fa-solid fa-list-ul w-5 text-center" />
          All Tasks
          <span className="ml-auto px-2 py-0.5 rounded-full text-xs bg-gray-200 dark:bg-gray-700">
            {tasks.length}
          </span>
        </NavLink>

        <NavLink to="important" className={getLinkClass} onClick={onClose}>
          <i className="fa-solid fa-star w-5 text-center" />
          Important
        </NavLink>

        <NavLink to="completed" className={getLinkClass} onClick={onClose}>
          <i className="fa-solid fa-check-double w-5 text-center" />
          Completed
        </NavLink>
      </nav>
    </aside>
  );
}
