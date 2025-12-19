import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export function DoHeader({ isLanding = false, toggleSidebar }) {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "");
  }, [darkMode]);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/90 transition-all duration-300">
      <div className="w-full px-4 py-1 sm:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {!isLanding && (
            <button
              onClick={toggleSidebar}
              className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg -ml-2"
            >
              <i className="fa-solid fa-bars text-xl"></i>
            </button>
          )}
          {/* LEFT — BRAND */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-sm">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 11l3 3L22 4" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight hidden sm:block">
              DoTask
            </span>
          </Link>

          {/* CENTER — NAV or SEARCH */}
          <div className="flex-1 flex justify-center max-w-3xl px-2 md:px-4">
            {isLanding ? (
              <nav className="hidden md:flex items-center gap-8">
                {["About", "Features", "Pricing"].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-sm font-medium text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                ))}
              </nav>
            ) : (
              <form
                className="w-full"
                onSubmit={(e) => {
                  e.preventDefault();
                  navigate(`/search?search=${searchValue}`);
                }}
              >
                <div className="relative flex items-center w-full h-10 rounded-xl focus-within:ring-2 ring-red-500/50 transition-all shadow-sm">
                  <div className="absolute left-0 pl-3 flex items-center pointer-events-none z-10">
                    <i className="fa-solid fa-search text-gray-400"></i>
                  </div>
                  <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="Search tasks..."
                    className="w-full h-full pl-10 pr-4 md:pr-24 bg-gray-100 dark:bg-gray-800 border-none rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:bg-white dark:focus:bg-gray-950 transition-colors"
                  />
                  <button className="hidden md:block absolute right-1 top-1 bottom-1 px-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors">
                    Search
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* RIGHT — ACTIONS */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="size-9 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-yellow-400 transition-colors"
              aria-label="Toggle theme"
            >
              <i className={`fa-solid ${darkMode ? "fa-sun" : "fa-moon"}`} />
            </button>

            {isLanding ? (
              <>
                <Link
                  to="/login"
                  className="hidden md:block text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-2"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
                >
                  Start free
                </Link>
              </>
            ) : (
              <button
                className="size-9 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors relative"
                aria-label="Notifications"
              >
                <i className="fa-regular fa-bell text-lg" />
                <span className="absolute top-2 right-2 size-2 rounded-full bg-red-500 border-2 border-white dark:border-gray-900"></span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
