/**
 * TaskContext Module
 * 
 * Provides global state management for the task management application.
 * Handles task CRUD operations, filtering, sorting, and view state.
 * 
 * State managed:
 * - tasks: Array of all task objects
 * - filter: Current status filter ("All", "Pending", "In Progress", "Completed")
 * - view: Current view mode ("all" or "completed")
 * - sort: Sort direction ("asc" or "desc") for due dates
 * 
 * All tasks are persisted to browser localStorage automatically.
 */
import { createContext, useContext, useReducer, useCallback, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { filterTasks, sortByDueDate, getSummary } from "../utils/taskHelpers";

// Create the context object (null initially, filled by TaskProvider)
const TaskContext = createContext(null);

/**
 * Task Reducer
 * 
 * Handles state transitions for all task-related actions.
 * Updates state immutably and applies the action to generate new state.
 * 
 * Action types:
 * - SET_TASKS: Replace all tasks
 * - ADD_TASK: Add a new task to the list
 * - EDIT_TASK: Update an existing task
 * - DELETE_TASK: Remove a task by ID
 * - SET_FILTER: Update the current status filter
 * - SET_VIEW: Update the current view mode (all/completed)
 * - SET_SORT: Update the sort direction
 */
function taskReducer(state, action) {
  switch (action.type) {
    // Replace entire task list with new data
    case "SET_TASKS":
      return { ...state, tasks: action.payload };
    // Add new task with auto-generated ID based on timestamp
    case "ADD_TASK":
      return { ...state, tasks: [...state.tasks, action.payload] };
    // Find and update task by ID, keeping all other tasks unchanged
    case "EDIT_TASK":
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload.id ? action.payload : t
        ),
      };
    // Remove task matching the ID from the list
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== action.payload),
      };
    // Update the status filter (affects filtered task display)
    case "SET_FILTER":
      return { ...state, filter: action.payload };
    // Update the view mode (all tasks vs completed tasks only)
    case "SET_VIEW":
      return { ...state, view: action.payload };
    // Update the sort direction for due dates
    case "SET_SORT":
      return { ...state, sort: action.payload };
    default:
      return state;
  }
}

/**
 * TaskProvider Component
 * 
 * Wraps the application to provide task state and methods to all child components.
 * Manages state using a reducer and persists tasks to localStorage.
 * 
 * Provides context value with:
 * - state: Current global state
 * - filteredTasks: Tasks filtered and sorted based on current state
 * - summary: Object with counts of tasks by status
 * - addTask, editTask, deleteTask: CRUD action creators
 * - setFilter, setView, setSort: State update action creators
 * 
 */
export function TaskProvider({ children }) {
  // Load persisted tasks from localStorage
  const [storedTasks, setStoredTasks] = useLocalStorage("tasks", []);

  // Initialize state reducer with persisted tasks and default filter/view/sort values
  const [state, dispatch] = useReducer(taskReducer, {
    tasks: storedTasks,
    filter: "All",
    view: "all",
    sort: "asc",
  });

  // Sync tasks to localStorage whenever they change
  useEffect(() => {
    setStoredTasks(state.tasks);
  }, [state.tasks]);

  // Add a new task with auto-generated timestamp ID
  const addTask = useCallback(
    (task) =>
      dispatch({
        type: "ADD_TASK",
        payload: { ...task, id: Date.now().toString() },
      }),
    []
  );

  // Update an existing task
  const editTask = useCallback(
    (task) => dispatch({ type: "EDIT_TASK", payload: task }),
    []
  );

  // Delete a task by ID
  const deleteTask = useCallback(
    (id) => dispatch({ type: "DELETE_TASK", payload: id }),
    []
  );

  // Update the current status filter
  const setFilter = useCallback(
    (f) => dispatch({ type: "SET_FILTER", payload: f }),
    []
  );

  // Update the current view mode (all vs completed)
  const setView = useCallback(
    (v) => dispatch({ type: "SET_VIEW", payload: v }),
    []
  );

  // Update the sort direction
  const setSort = useCallback(
    (s) => dispatch({ type: "SET_SORT", payload: s }),
    []
  );

  // Compute filtered and sorted task list based on current state
  const filteredTasks = sortByDueDate(
    filterTasks(state.tasks, state.filter, state.view),
    state.sort
  );

  // Compute task count summary by status
  const summary = getSummary(state.tasks);

  // Provide context value with all state and action creators
  return (
    <TaskContext.Provider
      value={{
        state,
        filteredTasks,
        summary,
        addTask,
        editTask,
        deleteTask,
        setFilter,
        setView,
        setSort,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

/**
 * useTask Hook
 * 
 * Custom hook for consuming the TaskContext in components.
 * Throws an error if used outside of a TaskProvider.
 * 
 */
export function useTask() {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error("useTask must be used within a TaskProvider");
  return ctx;
}
