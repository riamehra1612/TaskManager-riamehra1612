// TaskForm.test.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import TaskForm from "../taskForm";
import { validate } from "../../utils/validate";

jest.mock("../../utils/validate", () => ({
    validate: jest.fn(),
}));

jest.mock("../../constants", () => ({
    STATUSES: ["Pending", "In Progress", "Completed"],
}));

describe("TaskForm Component", () => {
    const mockOnSubmit = jest.fn();
    const mockOnClose = jest.fn();

    const emptyFormState = {
        title: "",
        description: "",
        status: "Pending",
        dueDate: "",
    };

    const existingTask = {
        id: "1",
        title: "Existing Task",
        description: "Old description",
        status: "In Progress",
        dueDate: "2026-05-20",
    };

    beforeEach(() => {
        jest.clearAllMocks();
        validate.mockReturnValue({});
    });


    test("renders empty form for a new task with correct defaults", () => {
        render(<TaskForm onSubmit={mockOnSubmit} onClose={mockOnClose} />);

        expect(screen.getByText("New Task")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Enter task title")).value = "";
        expect(screen.getByPlaceholderText("Optional description")).value = "";
        expect(screen.getByRole("combobox")).toHaveValue("Pending");
        expect(screen.getByRole("button", { name: "Add Task" })).toBeInTheDocument();
    });

    test("submits default values when fields are filled and form is valid", () => {
        render(<TaskForm onSubmit={mockOnSubmit} onClose={mockOnClose} />);

        userEvent.type(screen.getByPlaceholderText("Enter task title"), "Buy groceries");

        const dateInput = screen.getBy陰 || document.querySelector('input[name="dueDate"]');
        userEvent.type(dateInput, "2026-05-30");

        userEvent.click(screen.getByRole("button", { name: "Add Task" }));

        expect(validate).toHaveBeenCalledWith({
            title: "Buy groceries",
            description: "",
            status: "Pending",
            dueDate: "2026-05-30",
        });
        expect(mockOnSubmit).toHaveBeenCalledWith({
            title: "Buy groceries",
            description: "",
            status: "Pending",
            dueDate: "2026-05-30",
        });
        expect(mockOnClose).toHaveBeenCalled();
    });


    test("pre-fills form data when an initial task is provided", () => {
        render(<TaskForm initial={existingTask} onSubmit={mockOnSubmit} onClose={mockOnClose} />);

        expect(screen.getByText("Edit Task")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Enter task title")).toHaveValue("Existing Task");
        expect(screen.getByPlaceholderText("Optional description")).toHaveValue("Old description");
        expect(screen.getByRole("combobox")).toHaveValue("In Progress");

        const dateInput = document.querySelector('input[name="dueDate"]');
        expect(dateInput).toHaveValue("2026-05-20");

        expect(screen.getByRole("button", { name: "Save Changes" })).toBeInTheDocument();
    });

    test("submits updated fields correctly in edit mode", () => {
        render(<TaskForm initial={existingTask} onSubmit={mockOnSubmit} onClose={mockOnClose} />);

        const titleInput = screen.getByPlaceholderText("Enter task title");
        userEvent.clear(titleInput);
        userEvent.type(titleInput, "Updated Task Title");

        userEvent.selectOptions(screen.getByRole("combobox"), "Completed");

        userEvent.click(screen.getByRole("button", { name: "Save Changes" }));

        const expectedPayload = {
            ...existingTask,
            title: "Updated Task Title",
            status: "Completed",
        };

        expect(validate).toHaveBeenCalledWith(expectedPayload);
        expect(mockOnSubmit).toHaveBeenCalledWith(expectedPayload);
        expect(mockOnClose).toHaveBeenCalled();
    });


    test("displays validation errors and blocks submission if fields fail validation", () => {
        validate.mockReturnValue({
            title: "Title is required",
            dueDate: "Date is invalid",
        });

        render(<TaskForm onSubmit={mockOnSubmit} onClose={mockOnClose} />);

        userEvent.click(screen.getByRole("button", { name: "Add Task" }));

        expect(validate).toHaveBeenCalledWith(emptyFormState);
        expect(screen.getByText("Title is required")).toBeInTheDocument();
        expect(screen.getByText("Date is invalid")).toBeInTheDocument();

        expect(mockOnSubmit).not.toHaveBeenCalled();
        expect(mockOnClose).not.toHaveBeenCalled();
    });

    test("clears specific field errors on user keystroke input changes", () => {
        validate.mockReturnValue({ title: "Title is required" });

        render(<TaskForm onSubmit={mockOnSubmit} onClose={mockOnClose} />);

        userEvent.click(screen.getByRole("button", { name: "Add Task" }));
        expect(screen.getByText("Title is required")).toBeInTheDocument();

        userEvent.type(screen.getByPlaceholderText("Enter task title"), "A");

        expect(screen.queryByText("Title is required")).not.toBeInTheDocument();
    });


    test("triggers onClose callback when header close icon is clicked", () => {
        render(<TaskForm onSubmit={mockOnSubmit} onClose={mockOnClose} />);

        userEvent.click(screen.getByRole("button", { name: "✕" }));
        expect(mockOnClose).toHaveBeenCalled();
    });

    test("triggers onClose callback when Cancel button action is clicked", () => {
        render(<TaskForm onSubmit={mockOnSubmit} onClose={mockOnClose} />);

        userEvent.click(screen.getByRole("button", { name: "Cancel" }));
        expect(mockOnClose).toHaveBeenCalled();
    });
});