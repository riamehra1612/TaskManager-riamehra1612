/**
 * Form Validation Utilities
 * 
 * Functions for validating task form input data.
 */

/**
 * Validate task form data
 * 
 * Checks that required fields (title and due date) are provided.
 * Returns an object with field names as keys and error messages as values.
 * Empty errors object means validation passed.
 * 
 */
export function validate(form) {
  const errors = {};
  if (!form.title.trim()) errors.title = "Title is required";
  if (!form.dueDate) errors.dueDate = "Due date is required";
  return errors;
}