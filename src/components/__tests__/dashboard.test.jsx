import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { Dashboard } from "../dashboard";
import { useTask } from "../../context/TaskContext";

jest.mock("../../context/TaskContext", () => ({
    useTask: jest.fn(),
}));

jest.mock("../navBar", () => () => <div data-testid="navbar">Navbar</div>);
jest.mock("../../components/summaryBar", () => () => <div data-testid="summary-bar">SummaryBar</div>);
jest.mock("../../components/toolbar", () => ({ onAdd }) => (
    <button data-testid="toolbar-add-btn" onClick={onAdd}>Toolbar Add</button>
));
jest.mock("../../components/emptyState", () => ({ onAdd }) => (
    <button data-testid="empty-state-add-btn" onClick={onAdd}>Empty State Add</button>
));
jest.mock("../../components/taskCard", () => ({ task }) => <div data-testid="task-card">{task.title}</div>);
jest.mock("../../components/modal", () => ({ children, onClose }) => (
    <div data-testid="modal">
        <button data-testid="modal-close" onClick={onClose}>Close</button>
        {children}
    </div>
));
jest.mock("../../components/taskForm", () => ({ onSubmit, onClose }) => (
    <form data-testid="task-form" onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
        <button type="submit">Submit Form</button>
    </form>
));

describe("Dashboard Component", () => {
    const mockAddTask = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renders EmptyState when filteredTasks array is empty", () => {
        useTask.mockReturnValue({
            filteredTasks: [],
            addTask: mockAddTask,
        });

        render(<Dashboard />);

        expect(screen.getByText("0 tasks shown")).toBeInTheDocument();
        expect(screen.getByTestId("empty-state-add-btn")).toBeInTheDocument();
        expect(screen.queryByTestId("task-card")).not.toBeInTheDocument();
    });

    test("renders a list of TaskCards when filteredTasks exist", () => {
        const mockTasks = [
            { id: "1", title: "Task One" },
            { id: "2", title: "Task Two" },
        ];

        useTask.mockReturnValue({
            filteredTasks: mockTasks,
            addTask: mockAddTask,
        });

        render(<Dashboard />);

        expect(screen.getByText("2 tasks shown")).toBeInTheDocument();

        const taskCards = screen.getAllByTestId("task-card");
        expect(taskCards).toHaveLength(2);
        expect(taskCards[0]).toHaveTextContent("Task One");
        expect(screen.queryByTestId("empty-state-add-btn")).not.toBeInTheDocument();
    });

    test("opens the Modal with TaskForm when the Toolbar add button is clicked", () => {
        useTask.mockReturnValue({
            filteredTasks: [],
            addTask: mockAddTask,
        });

        render(<Dashboard />);

        expect(screen.queryByTestId("modal")).not.toBeInTheDocument();

        fireEvent.click(screen.getByTestId("toolbar-add-btn"));

        expect(screen.getByTestId("modal")).toBeInTheDocument();
        expect(screen.getByTestId("task-form")).toBeInTheDocument();
    });

    test("closes the Modal when the form submission or close action triggers", () => {
        useTask.mockReturnValue({
            filteredTasks: [],
            addTask: mockAddTask,
        });

        render(<Dashboard />);

        fireEvent.click(screen.getByTestId("toolbar-add-btn"));
        expect(screen.getByTestId("modal")).toBeInTheDocument();

        fireEvent.click(screen.getByTestId("modal-close"));

        expect(screen.queryByTestId("modal")).not.toBeInTheDocument();
    });
});