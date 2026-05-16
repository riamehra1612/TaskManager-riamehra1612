/**
 * Dashboard Component
 * 
 * Main application container that orchestrates the task management interface.
 * Displays navbar, summary statistics, toolbar, and task grid/empty state.
 * Manages the "Add Task" modal state.
 * 
 */
import { useState } from "react";
import Navbar from "./navBar";
import SummaryBar from "./summaryBar";
import Toolbar from "./toolbar";
import TaskCard from "./taskCard";
import TaskForm from "./taskForm";
import Modal from "./modal";
import EmptyState from "./emptyState";
import { styles } from "../styles/styles";
import { useTask } from "../context/TaskContext";

export function Dashboard() {
    const { filteredTasks, addTask } = useTask();
    // Tracks modal visibility for creating new tasks
    const [showAddModal, setShowAddModal] = useState(false);

    return (
        <div style={styles.page}>
            <Navbar />
            <div style={styles.container}>
                <div style={styles.pageHeader}>
                    <h1 style={styles.pageTitle}>Task Dashboard</h1>
                    <p style={styles.pageSubtitle}>
                        {filteredTasks.length} task{filteredTasks.length !== 1 ? "s" : ""} shown
                    </p>
                </div>

                <SummaryBar />
                <Toolbar onAdd={() => setShowAddModal(true)} />

                {filteredTasks.length === 0 ? (
                    <EmptyState onAdd={() => setShowAddModal(true)} />
                ) : (
                    <div style={styles.grid}>
                        {filteredTasks.map((task) => (
                            <TaskCard key={task.id} task={task} />
                        ))}
                    </div>
                )}
            </div>

            {showAddModal && (
                <Modal onClose={() => setShowAddModal(false)}>
                    <TaskForm
                        onSubmit={addTask}
                        onClose={() => setShowAddModal(false)}
                    />
                </Modal>
            )}
        </div>
    );
}
