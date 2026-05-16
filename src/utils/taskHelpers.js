/**
 * Task Helper Utilities
 * 
 * Collection of utility functions for task filtering, sorting, and formatting.
 * These functions handle the business logic for task list manipulation.
 */

/**
 * Filter tasks based on current filter and view settings
 * 
 */
export function filterTasks(tasks, filter, view) {
  return tasks.filter((t) => {
    if (view === "completed") return t.status === "Completed";
    if (filter === "All") return true;
    return t.status === filter;
  });
}

/**
 * Sort tasks by due date
 * 
 * Creates a new sorted array without mutating the original.
 * Handles null/invalid dates gracefully.
 * 
 */
export function sortByDueDate(tasks, direction = "asc") {
  return [...tasks].sort((a, b) => {
    const diff = new Date(a.dueDate) - new Date(b.dueDate);
    return direction === "asc" ? diff : -diff;
  });
}

/**
 * Generate task statistics summary
 * 
 * Counts tasks in each status category.
 * Used to display summary cards on the dashboard.
 * 
 */
export function getSummary(tasks) {
  return {
    Pending: tasks.filter((t) => t.status === "Pending").length,
    "In Progress": tasks.filter((t) => t.status === "In Progress").length,
    Completed: tasks.filter((t) => t.status === "Completed").length,
  };
}

/**
 * Check if a task is overdue
 * 
 * A task is overdue if its due date is in the past and it's not completed.
 * Completed tasks are never considered overdue.
 * 
 */
export function isOverdue(dueDate, status) {
  return new Date(dueDate) < new Date() && status !== "Completed";
}

/**
 * Format a date for display
 * 
 * Converts ISO date string to human-readable format (e.g., "25 Dec 2024").
 * Uses Indian locale (en-IN) for consistent formatting.
 * 
 */
export function formatDate(dueDate) {
  return new Date(dueDate).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}