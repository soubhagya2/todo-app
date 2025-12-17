import axios from "axios";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Reminder } from "../Reminder/reminder";

export function Header({ user, tasks, setTasks }) {
  const navigate = useNavigate();
  const [reminderOpen, setReminderOpen] = useState(false);

  const [cookies, setCookie, removeCookie] = useCookies([
    "userid",
    "useremail",
  ]);
  const [searchValue, setSearchValue] = useState("");

  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme"));
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.removeItem("theme");
    }
  }, [darkMode]);

  return (
    <header className="flex items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-00 p-3 px-9 pt-6 sticky top-0 bg-white/70 dark:bg-gray-900 backdrop-blur-md z-50 transition-colors">
      <Link to="/" className="flex items-center gap-3">
        <div className="text-blue-600 dark:text-blue-400 text-2xl">
          <i className="fa-solid fa-list-check"></i>
        </div>
        <h2 className="text-gray-900 dark:text-white text-xl font-bold tracking-tight">
          TaskFlow
        </h2>
      </Link>

      <label className="hidden sm:flex w-full max-w-md">
        <form className="w-full">
          <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg w-full h-10 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
            <span className="px-3 text-gray-600 dark:text-gray-300">
              <i className="fa-solid fa-search"></i>
            </span>
            <input
              type="text"
              name="search"
              value={searchValue}
              placeholder="Search tasks..."
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none text-sm"
            />
            <button
              className=" h-full px-4 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-r-lg transition-all"
              onClick={() => {
                navigate("/search");
              }}
            >
              Search
            </button>
          </div>
        </form>
      </label>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setReminderOpen(true)}
          className="size-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          aria-label="Notifications"
        >
          <i className="fa-regular fa-bell text-lg"></i>
        </button>
       
        <div>
          {cookies.useremail ? (
            <div className="flex flex-row items-center gap-4">
              <div className="flex flex-col items-end">
                <div className=" text-xs font-medium text-gray-600 dark:text-gray-300 ">
                  {user ? `Hello, ${user.name.split(" ")[0]}` : "Loading..."}
                </div>

                <button
                  onClick={() => {
                    removeCookie("useremail", { path: "/" });
                    removeCookie("userid", { path: "/" });
                  }}
                  className="text-xs text-red-500 hover:underline dark:text-red-400 hover:cursor-pointer"
                >
                  Logout
                </button>
              </div>
              <Link
                to="/profile"
                className="size-10 rounded-full flex items-center justify-center bg-gray-300 dark:bg-gray-700 cursor-pointer"
              >
                <i className="fa-regular fa-user dark:text-white text-black text-lg"></i>
              </Link>
            </div>
          ) : (
            <div className="relative group size-10 rounded-full flex items-center justify-center bg-gray-300 dark:bg-gray-700 cursor-pointer">
              <i className="fa-regular fa-user dark:text-white text-black text-lg"></i>

              <div className="absolute right-6 top-9 mt-2 w-32 bg-white dark:bg-gray-800 rounded-md shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-20">
                <span className="relative block">
                  <Link
                    to="/register"
                    className="relative block px-4 py-2.5 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 text-sm group/btn"
                  >
                    Register
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-400 group-hover/btn:w-full transition-all duration-300"></span>
                  </Link>
                </span>
                <span className="relative block">
                  <Link
                    to="/login"
                    className="relative block px-4 py-2.5 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 text-sm group/btn"
                  >
                    Login
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-400 group-hover/btn:w-full transition-all duration-300"></span>
                  </Link>
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
      <Reminder
        tasks={tasks}
        setTasks={setTasks}
        open={reminderOpen}
        onClose={() => setReminderOpen(false)}
      />
    </header>
  );
}
