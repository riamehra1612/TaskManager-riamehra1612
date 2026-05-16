/**
 * EmptyState Component
 * 
 * Displayed when there are no tasks matching the current filter/view.
 * Shows a helpful message with an icon and prompts user to create the first task.
 * 
 */
import { ClipboardList } from "lucide-react";
import { styles } from "../styles/styles";

export default function EmptyState({ onAdd }) {
  return (
    <div style={styles.empty}>
      <div style={styles.emptyIcon}><ClipboardList {...styles.emptyIconProps} /></div>
      <h3 style={styles.emptyTitle}>No tasks found</h3>
      <p style={styles.emptyDesc}>Add a new task to get started</p>
      <button style={styles.addBtn} onClick={onAdd}>+ New Task</button>
    </div>
  );
}
