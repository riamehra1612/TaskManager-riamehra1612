import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TaskCard from "../taskCard";
import { useTask } from "../../context/TaskContext";
import { isOverdue, formatDate } from "../../utils/taskHelpers";

jest.mock("../../context/TaskContext", () => ({
    useTask: jest.fn(),
}));

jest.mock("../../utils/taskHelpers", () => ({
    isOverdue: jest.fn(),
    formatDate: jest.fn(),
}));

jest.mock("../modal", () => ({ children, onClose }) => (
    <div data-testid="mock-modal">
        <button data-testid="modal-close" onClick={onClose}>X</button>
        {children}
    </div>
));

jest.mock("../taskForm", () => ({ onSubmit, onClose }) => (
    <div data-testid="mock-task-form">
        <button data-testid="form-submit" onClick={() => onSubmit({ title: "Updated Title" })}>Submit</button>
        <button data-testid="form-close" onClick={onClose}>Close</button>
    </div>
));

jest.mock("lucide-react", () => ({
    Pencil: () => <svg data-testid="icon-pencil" />,
    Trash2: () => <svg data-testid="icon-trash" />,
    Calendar: () => <svg data-testid="icon-calendar" />,
    AlertTriangle: () => <svg data-testid="icon-alert" />,
}));

describe("TaskCard Component", () => {
    const mockEditTask = jest.fn();
    const mockDeleteTask = jest.fn();

    const sampleTask = {
        id: "123",
        title: "Test Task",
        description: "This is a test description",
        status: "In Progress",
        dueDate: "2026-05-20",
    };

    beforeEach(() => {
        jest.clearAllMocks();
        useTask.mockReturnValue({
            editTask: mockEditTask,
            deleteTask: mockDeleteTask,
        });
        isOverdue.mockReturnValue(false);
        formatDate.mockReturnValue("May 20, 2026");
    });

    test("renders task details correctly", () => {
        render(<TaskCard task={sampleTask} />);

        expect(screen.getByText("Test Task")).toBeInTheDocument();
        expect(screen.getByText("This is a test description")).toBeInTheDocument();
        expect(screen.getByText("In Progress")).toBeInTheDocument();
        expect(screen.getByText("May 20, 2026")).toBeInTheDocument();
        expect(screen.getByTestId("icon-calendar")).toBeInTheDocument();
    });

    test("does not render description if it is missing", () => {
        const taskWithoutDesc = { ...sampleTask, description: "" };
        render(<TaskCard task={taskWithoutDesc} />);

        expect(screen.queryByText("This is a test description")).not.toBeInTheDocument();
    });

    test("displays alert icon and correct styling when task is overdue", () => {
        isOverdue.mockReturnValue(true);
        render(<TaskCard task={sampleTask} />);

        expect(screen.getByTestId("icon-alert")).toBeInTheDocument();
        expect(screen.queryByTestId("icon-calendar")).not.toBeInTheDocument();
    });

    test("opens edit modal, submits changes, and closes modal", () => {
        render(<TaskCard task={sampleTask} />);

        const editButton = screen.getByTitle("Edit");
        userEvent.click(editButton);

        expect(screen.getByTestId("mock-task-form")).toBeInTheDocument();

        const submitButton = screen.getByTestId("form-submit");
        userEvent.click(submitButton);

        expect(mockEditTask).toHaveBeenCalledWith({
            ...sampleTask,
            title: "Updated Title",
        });
    });

    test("closes edit modal when cancel action is triggered", () => {
        render(<TaskCard task={sampleTask} />);

        userEvent.click(screen.getByTitle("Edit"));
        expect(screen.getByTestId("mock-task-form")).toBeInTheDocument();

        userEvent.click(screen.getByTestId("form-close"));
        expect(screen.queryByTestId("mock-task-form")).not.toBeInTheDocument();
    });

    test("opens delete confirmation modal and processes deletion", () => {
        render(<TaskCard task={sampleTask} />);

        const trashIconButton = screen.getByTitle("Delete");
        userEvent.click(trashIconButton);

        expect(screen.getByText(/Are you sure you want to delete/i)).toBeInTheDocument();
        expect(screen.getByText(`"${sampleTask.title}"`)).toBeInTheDocument();

        const modal = screen.getByTestId("mock-modal");

        const confirmButton = modal.querySelector("button[style*='#ef4444']") || screen.getAllByRole("button", { name: "Delete" })[1];

        const actionButtons = screen.getAllByRole("button", { name: "Delete" });
        const modalDeleteButton = actionButtons[1];

        userEvent.click(modalDeleteButton);

        expect(mockDeleteTask).toHaveBeenCalledWith("123");

        expect(screen.queryByText(/Are you sure you want to delete/i)).not.toBeInTheDocument();
    });

    test("closes delete confirmation without deleting when Cancel is clicked", () => {
        render(<TaskCard task={sampleTask} />);

        userEvent.click(screen.getByTitle("Delete"));

        const cancelButton = screen.getByRole("button", { name: "Cancel" });
        userEvent.click(cancelButton);

        expect(mockDeleteTask).not.toHaveBeenCalled();
        expect(screen.queryByText(/Are you sure you want to delete/i)).not.toBeInTheDocument();
    });
});