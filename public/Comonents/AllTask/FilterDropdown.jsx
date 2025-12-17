import { useState, useRef, useEffect } from "react";

export function FilterDropdown({ label, options, selectedValue, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-8 items-center justify-center gap-x-2 rounded-lg bg-slate-100 dark:bg-slate-800/50 pl-3 pr-2 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
      >
        <p className="text-sm font-medium leading-normal">
          {label}: <span className="font-bold">{selectedValue}</span>
        </p>
        <i
          className={`fa-solid fa-chevron-down transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        ></i>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-40 origin-top-left rounded-md bg-white dark:bg-slate-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => {
                  onSelect(option);
                  setIsOpen(false);
                }}
                className="w-full text-left block px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
