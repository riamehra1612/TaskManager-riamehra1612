/**
 * TaskCard Component
 * 
 * Displays a single task with its details, status, and action buttons.
 * Shows title, description (if present), and due date with overdue indicator.
 * Provides edit and delete functionality via modal dialogs.
 * 
 */
import { useState } from "react";
import { Pencil, Trash2, Calendar, AlertTriangle } from "lucide-react";
import { useTask } from "../context/TaskContext";
import { STATUS_CONFIG } from "../constants";
import { isOverdue, formatDate } from "../utils/taskHelpers";
import { styles } from "../styles/styles";
import Modal from "./modal";
import TaskForm from "./taskForm";
import BaseCard from "./BaseCard";

export default function TaskCard({ task }) {
  const { editTask, deleteTask } = useTask();
  const [editing, setEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  // Get color config for the task's current status
  const cfg = STATUS_CONFIG[task.status];
  // Check if task is overdue (due date is in the past and not completed)
  const overdue = isOverdue(task.dueDate, task.status);

  return (
    <>
      <BaseCard borderTopColor={cfg.dot} variant="task">
        <div style={styles.cardTop}>
          <div style={styles.cardStatusContainer}>
            <span style={{ ...styles.statusDot, background: cfg.dot }} />
            <span style={{ ...styles.statusBadge, color: cfg.color, background: cfg.bg }}>
              {task.status}
            </span>
          </div>
          <div style={styles.cardActions}>
            <button style={styles.iconBtn} onClick={() => setEditing(true)} title="Edit"><Pencil size={18} /></button>
            <button style={styles.iconBtn} onClick={() => setConfirmDelete(true)} title="Delete"><Trash2 size={18} /></button>
          </div>
        </div>

        <h3 style={styles.cardTitle}>{task.title}</h3>
        {task.description && <p style={styles.cardDesc}>{task.description}</p>}

        <div style={styles.cardFooter}>
          <span style={{ ...styles.dueDate, color: overdue ? "#ef4444" : "#6b7280" }}>
            {overdue ? <AlertTriangle size={18} /> : <Calendar size={18} />} {formatDate(task.dueDate)}
          </span>
        </div>
      </BaseCard>

      {editing && (
        <Modal onClose={() => setEditing(false)}>
          <TaskForm
            initial={task}
            onSubmit={(updated) => editTask({ ...task, ...updated })}
            onClose={() => setEditing(false)}
          />
        </Modal>
      )}

      {confirmDelete && (
        <Modal onClose={() => setConfirmDelete(false)}>
          <div style={styles.deleteModalContent}>
            <h3 style={{ ...styles.modalTitle, marginBottom: "12px" }}>Delete Task?</h3>
            <p style={styles.deleteModalText}>
              Are you sure you want to delete <strong>"{task.title}"</strong>? This cannot be undone.
            </p>
            <div style={styles.formActions}>
              <button style={styles.cancelBtn} onClick={() => setConfirmDelete(false)}>Cancel</button>
              <button
                style={{ ...styles.submitBtn, background: "#ef4444" }}
                onClick={() => { deleteTask(task.id); setConfirmDelete(false); }}
              >
                Delete
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
