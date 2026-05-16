import { TaskProvider } from "./context/TaskContext";
import { Dashboard } from "./components/dashboard";

export default function App() {
  return (
    <TaskProvider>
      <Dashboard />
    </TaskProvider>
  );
}
