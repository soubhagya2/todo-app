import { Modal, Box } from "@mui/material";

export function Reminder({ tasks= [], open, onClose, setTasks }) {
  const reminderTasks = tasks.filter((task) => task.reminder === true);

  const handleMarkAllRead = () => {
    const updatedTasks = tasks.map((task) =>
      task.reminder ? { ...task, reminder: false } : task
    );
    setTasks(updatedTasks);
    onClose();
  };

  const handleClearAll = () => {
    const updatedTasks = tasks.filter((task) => !task.reminder);
    setTasks(updatedTasks);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="reminder-modal-title"
      aria-describedby="reminder-modal-description"
    >
      <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 id="reminder-modal-title" className="text-xl font-bold text-gray-900 dark:text-white ">
          Reminders
        </h2>
        <span className=" cursor-pointer fa fa-times dark:text-white" onClick={onClose}></span>
        </div>
        <div id="reminder-modal-description" className="space-y-3 max-h-80 overflow-y-auto">
          {reminderTasks.length > 0 ? (
            reminderTasks.map((task) => (
              <div key={task.id} className="p-3 bg-gray-100 dark:bg-gray-700 rounded-md">
                <h3 className="font-semibold text-gray-800 dark:text-white">{task.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{task.description}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400">You have no reminders.</p>
          )}
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={handleMarkAllRead} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition">Mark all as read</button>
          <button onClick={handleClearAll} className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition">Clear All</button>
        </div>
      </Box>
    </Modal>
  );
}