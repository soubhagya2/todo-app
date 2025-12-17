import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "../slicers/task-slicer";

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
});
