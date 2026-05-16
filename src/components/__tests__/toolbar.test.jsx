import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Toolbar from "../toolbar";
import { useTask } from "../../context/TaskContext";

jest.mock("../../context/TaskContext", () => ({
    useTask: jest.fn(),
}));

jest.mock("../../constants", () => ({
    FILTERS: ["All", "Pending", "Completed"],
}));

describe("Toolbar Component", () => {
    const mockSetFilter = jest.fn();
    const mockSetSort = jest.fn();
    const mockOnAdd = jest.fn();

    const defaultState = {
        filter: "All",
        sort: "asc",
    };

    beforeEach(() => {
        jest.clearAllMocks();

        useTask.mockReturnValue({
            state: defaultState,
            setFilter: mockSetFilter,
            setSort: mockSetSort,
        });
    });

    test("renders all filters and action buttons correctly", () => {
        render(<Toolbar onAdd={mockOnAdd} />);

        expect(screen.getByRole("button", { name: "All" })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Pending" })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Completed" })).toBeInTheDocument();

        expect(screen.getByRole("button", { name: "Due Date ↑" })).toBeInTheDocument();

        expect(screen.getByRole("button", { name: "+ New Task" })).toBeInTheDocument();
    });

    test("triggers setFilter when a filter option is clicked", () => {
        render(<Toolbar onAdd={mockOnAdd} />);

        const pendingFilterBtn = screen.getByRole("button", { name: "Pending" });
        fireEvent.click(pendingFilterBtn);

        expect(mockSetFilter).toHaveBeenCalledTimes(1);
        expect(mockSetFilter).toHaveBeenCalledWith("Pending");
    });

    test("toggles sort order from 'asc' to 'desc' on click", () => {
        render(<Toolbar onAdd={mockOnAdd} />);

        const sortBtn = screen.getByRole("button", { name: "Due Date ↑" });
        fireEvent.click(sortBtn);

        expect(mockSetSort).toHaveBeenCalledTimes(1);
        expect(mockSetSort).toHaveBeenCalledWith("desc");
    });

    test("toggles sort order from 'desc' to 'asc' on click when current state is desc", () => {
        useTask.mockReturnValue({
            state: { filter: "All", sort: "desc" },
            setFilter: mockSetFilter,
            setSort: mockSetSort,
        });

        render(<Toolbar onAdd={mockOnAdd} />);

        const sortBtn = screen.getByRole("button", { name: "Due Date ↓" });
        fireEvent.click(sortBtn);

        expect(mockSetSort).toHaveBeenCalledTimes(1);
        expect(mockSetSort).toHaveBeenCalledWith("asc");
    });

    test("triggers the onAdd prop callback when '+ New Task' is clicked", () => {
        render(<Toolbar onAdd={mockOnAdd} />);

        const addTaskBtn = screen.getByRole("button", { name: "+ New Task" });
        fireEvent.click(addTaskBtn);

        expect(mockOnAdd).toHaveBeenCalledTimes(1);
    });
});