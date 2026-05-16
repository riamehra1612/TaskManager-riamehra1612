/**
 * Toolbar Component
 * 
 * Provides filtering and sorting controls for the task list.
 * Allows users to filter by task status and toggle sort order by due date.
 * Includes button to open the "Add New Task" modal.
 * 
 */
import { useTask } from "../context/TaskContext";
import { FILTERS } from "../constants";
import { styles } from "../styles/styles";

export default function Toolbar({ onAdd }) {
  const { state, setFilter, setSort } = useTask();

  // Toggles sort direction between ascending and descending by due date
  const toggleSort = () => {
    setSort(state.sort === "asc" ? "desc" : "asc");
  };

  return (
    <div style={styles.toolbar}>
      <div style={styles.filterGroup}>
        {FILTERS.map((f) => (
          <button
            key={f}
            style={{
              ...styles.filterBtn,
              ...(state.filter === f ? styles.filterBtnActive : {}),
            }}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>
      <div style={styles.toolbarActions}>
        <button style={styles.filterBtn} onClick={toggleSort}>
          Due Date {state.sort === "asc" ? "↑" : "↓"}
        </button>
        <button style={styles.addBtn} onClick={onAdd}>
          + New Task
        </button>
      </div>
    </div>
  );
}
