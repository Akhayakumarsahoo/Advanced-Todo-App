import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [
    {
      id: 1,
      task: "Buy groceries",
      isDone: false,
      priority: "Low",
      createdAt: "2025-01-15T19:32:37.692053",
    },
    {
      id: 2,
      task: "Finish project report",
      isDone: false,
      priority: "High",
      createdAt: "2025-01-15T19:32:37.692062",
    },
    {
      id: 3,
      task: "Call the bank",
      isDone: false,
      priority: "Medium",
      createdAt: "2025-01-15T19:32:37.692064",
    },
    {
      id: 4,
      task: "Schedule dentist appointment",
      isDone: false,
      priority: "Medium",
      createdAt: "2025-01-15T19:32:37.692065",
    },
    {
      id: 5,
      task: "Plan weekend trip",
      isDone: false,
      priority: "Low",
      createdAt: "2025-01-15T19:32:37.692067",
    },
    {
      id: 6,
      task: "Read a book",
      isDone: true,
      priority: "Low",
      createdAt: "2025-01-15T19:32:37.692068",
    },
    {
      id: 7,
      task: "Clean the house",
      isDone: true,
      priority: "Medium",
      createdAt: "2025-01-15T19:32:37.692070",
    },
    {
      id: 8,
      task: "Prepare presentation",
      isDone: true,
      priority: "High",
      createdAt: "2025-01-15T19:32:37.692072",
    },
    {
      id: 9,
      task: "Update blog",
      isDone: true,
      priority: "Low",
      createdAt: "2025-01-15T19:32:37.692074",
    },
  ],
  selectTask: null,
};

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    // Add a new task
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    // Delete a task
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    // Mark a task as done
    markAsDone: (state, action) => {
      state.tasks = state.tasks.map((task) => {
        if (task.id === action.payload) {
          return { ...task, isDone: !task.isDone };
        }
        return task;
      });
    },
    //change priority
    changeTaskPriority: (state, action) => {
      const { id, priority } = action.payload;
      const task = state.tasks.find((task) => task.id === id);
      if (task) {
        task.priority = priority;
      }
    },
    //select task
    selectTask: (state, action) => {
      state.selectTask = action.payload;
    },
  },
});

export const {
  addTask,
  deleteTask,
  markAsDone,
  changeTaskPriority,
  selectTask,
} = taskSlice.actions;

export default taskSlice.reducer;
