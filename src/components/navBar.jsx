/**
 * Navbar Component
 * 
 * Application header with branding and navigation.
 * Displays the TaskFlow logo and handles navigation state management.
 * 
 */
import { Zap } from "lucide-react";
import { useTask } from "../context/TaskContext";
import { styles } from "../styles/styles";

export default function Navbar() {
  const { state, setView, setFilter } = useTask();

  // Handles view changes and syncs filter state
  const handleViewChange = (view) => {
    setView(view);
    setFilter(view === "completed" ? "Completed" : "All");
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.navBrand}>
        <span style={styles.navLogo}>
          <Zap {...styles.navLogoIcon} />
        </span>
        <span style={styles.navTitle}>TaskFlow</span>
      </div>
    </nav>
  );
}
