import { CircularProgress } from "@mui/material";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export function RightSidebar({ tasks }) {
  const completedTasks = tasks.filter(task => task.completed).length;
  const progress = (completedTasks / tasks.length) * 100;
  const [month, setMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState();

  return (
    <aside className="p-6 text-gray-900 dark:text-white border-l border-gray-200 dark:border-gray-800">

       <div className="bg-gray-100   dark:bg-gray-800/50 overflow-hidden  rounded-xl w-full">
      <DayPicker mode="single" selected={selectedDate} onSelect={setSelectedDate} month={month} onMonthChange={setMonth}  
      className="text-gray-900 scale-90  dark:text-white"
        modifiersClassNames={{
          selected: "bg-blue-500 text-white rounded-full",
          today: "bg-blue-600 text-white rounded-full",
        }}
      />
    </div>

      <div className="bg-gray-100 dark:bg-gray-800/50 p-6 rounded-xl mt-6 text-center">
        <h3 className="font-bold mb-4">Today's Progress</h3>
        <div className="relative size-32 mx-auto">
          <CircularProgress variant="determinate" value={progress} size={60} thickness={5}/>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-bold mt-8">{progress.toFixed(0) }%</span>
          </div>
        </div>
        <p className="text-gray-500 dark:text-gray-400 mt-4">{completedTasks} of {tasks.length} tasks completed</p>
      </div>

    </aside>
  );
}

