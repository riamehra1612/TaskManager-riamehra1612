import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Modal from "../modal";

describe("Modal Component", () => {
    const mockOnClose = jest.fn();
    const modalText = "Modal Content Goes Here";

    beforeEach(() => {
        mockOnClose.mockClear();
    });

    test("renders children content correctly", () => {
        render(
            <Modal onClose={mockOnClose}>
                <div>{modalText}</div>
            </Modal>
        );

        expect(screen.getByText(modalText)).toBeInTheDocument();
    });

    test("calls onClose when the overlay backdrop is clicked", () => {
        render(
            <Modal onClose={mockOnClose}>
                <div>{modalText}</div>
            </Modal>
        );

        const contentElement = screen.getByText(modalText);
        const overlay = contentElement.parentElement.parentElement;

        fireEvent.click(overlay);

        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    test("does NOT call onClose when clicking inside the modal content box (stopPropagation)", () => {
        render(
            <Modal onClose={mockOnClose}>
                <button data-testid="inner-content">Click Me</button>
            </Modal>
        );

        const innerContent = screen.getByTestId("inner-content");

        fireEvent.click(innerContent);

        expect(mockOnClose).not.toHaveBeenCalled();
    });

    test("calls onClose when the Escape key is pressed", () => {
        render(
            <Modal onClose={mockOnClose}>
                <div>{modalText}</div>
            </Modal>
        );

        fireEvent.keyDown(window, { key: "Escape", code: "Escape", keyCode: 27 });

        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    test("removes the event listener on unmount", () => {
        const { unmount } = render(
            <Modal onClose={mockOnClose}>
                <div>{modalText}</div>
            </Modal>
        );

        unmount();

        fireEvent.keyDown(window, { key: "Escape" });

        expect(mockOnClose).not.toHaveBeenCalled();
    });
});