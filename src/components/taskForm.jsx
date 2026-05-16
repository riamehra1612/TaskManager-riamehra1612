/**
 * TaskForm Component
 * 
 * Form for creating new tasks or editing existing ones.
 * Includes fields for title, description, status, and due date.
 * Performs validation and displays error messages.
 * Works in both "create" and "edit" modes based on the `initial` prop.
 * 
 */
import { useState } from "react";
import { STATUSES } from "../constants";
import { validate } from "../utils/validate";
import { styles } from "../styles/styles";

export default function TaskForm({ initial, onSubmit, onClose }) {
  // Initialize form with either existing task data (edit mode) or empty values (create mode)
  const [form, setForm] = useState(
    initial || { title: "", description: "", status: "Pending", dueDate: "" }
  );
  // Tracks validation errors for each field
  const [errors, setErrors] = useState({});

  // Updates form field and clears any existing error for that field
  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((er) => ({ ...er, [e.target.name]: undefined }));
  };

  // Validates form data and submits if valid
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const errs = validate(form);
    if (Object.keys(errs).length) return setErrors(errs);
    
    onSubmit(form);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={styles.modalHeader}>
        <span style={styles.modalTitle}>{initial ? "Edit Task" : "New Task"}</span>
        <button type="button" style={styles.closeBtn} onClick={onClose}>✕</button>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Title *</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          style={{ ...styles.input, ...(errors.title ? styles.inputError : {}) }}
          placeholder="Enter task title"
        />
        {errors.title && <span style={styles.errorText}>{errors.title}</span>}
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          style={styles.textarea}
          placeholder="Optional description"
          rows={3}
        />
      </div>

      <div style={styles.formDateStatusGroup}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Status</label>
          <select name="status" value={form.status} onChange={handleChange} style={styles.input}>
            {STATUSES.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Due Date *</label>
          <input
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
            style={{ ...styles.input, ...(errors.dueDate ? styles.inputError : {}) }}
          />
          {errors.dueDate && <span style={styles.errorText}>{errors.dueDate}</span>}
        </div>
      </div>

      <div style={styles.formActions}>
        <button type="button" style={styles.cancelBtn} onClick={onClose}>Cancel</button>
        
        <button type="submit" style={styles.submitBtn}>
          {initial ? "Save Changes" : "Add Task"}
        </button>
      </div>
    </form>
  );
}