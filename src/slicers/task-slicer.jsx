import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  tasks: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async (todoId) => {
  const response = await axios.get(`http://localhost:3000/todos/${todoId}`);
  return response.data.tasks;
});

export const addNewTask = createAsyncThunk(
  "tasks/addNewTask",
  async ({ todoId, task }) => {
    const response = await axios.patch(`http://localhost:3000/todos/${todoId}`, {
      tasks: task,
    });
    return response.data.tasks;
  }
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ todoId, tasks }) => {
    const response = await axios.patch(`http://localhost:3000/todos/${todoId}`, {
      tasks,
    });
    return response.data.tasks;
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchTasks.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewTask.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.tasks = action.payload;
      });
  },
});

export default tasksSlice.reducer;
