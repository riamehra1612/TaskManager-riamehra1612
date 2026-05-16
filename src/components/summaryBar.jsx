/**
 * SummaryBar Component
 * 
 * Displays task statistics overview with three cards showing counts for:
 * - Pending tasks
 * - In Progress tasks  
 * - Completed tasks
 * 
 * Each card has a colored icon and count badge.
 * 
 */
import { useTask } from "../context/TaskContext";
import { SUMMARY_META } from "../constants";
import { styles } from "../styles/styles";
import BaseCard from "./BaseCard";

export default function SummaryBar() {
  const { summary } = useTask();

  return (
    <div style={styles.summaryBar}>
      {SUMMARY_META.map((item) => (
        <BaseCard key={item.label} borderTopColor={item.color} variant="summary">
          <span style={styles.summaryIcon}>{item.icon}</span>
          <div>
            <div style={{ ...styles.summaryCount, color: item.color }}>
              {summary[item.label]}
            </div>
            <div style={styles.summaryLabel}>{item.label}</div>
          </div>
        </BaseCard>
      ))}
    </div>
  );
}
