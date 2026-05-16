import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import EmptyState from "../emptyState";

jest.mock("lucide-react", () => ({
    ClipboardList: () => <svg data-testid="clipboard-icon" />,
}));

describe("EmptyState Component", () => {
    const mockOnAdd = jest.fn();

    beforeEach(() => {
        mockOnAdd.mockClear();
    });

    test("renders all structural texts and the icon correctly", () => {
        render(<EmptyState onAdd={mockOnAdd} />);

        const heading = screen.getByRole("heading", { name: /no tasks found/i });
        expect(heading).toBeInTheDocument();

        const description = screen.getByText(/add a new task to get started/i);
        expect(description).toBeInTheDocument();

        const icon = screen.getByTestId("clipboard-icon");
        expect(icon).toBeInTheDocument();

        const button = screen.getByRole("button", { name: /\+ new task/i });
        expect(button).toBeInTheDocument();
    });

    test("calls onAdd handler when the '+ New Task' button is clicked", () => {
        render(<EmptyState onAdd={mockOnAdd} />);

        const button = screen.getByRole("button", { name: /\+ new task/i });

        fireEvent.click(button);

        expect(mockOnAdd).toHaveBeenCalledTimes(1);
    });
});