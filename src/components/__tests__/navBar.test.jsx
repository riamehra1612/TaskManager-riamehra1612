import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Navbar from "../navBar";
import { useTask } from "../../context/TaskContext";

jest.mock("../../context/TaskContext", () => ({
  useTask: jest.fn(),
}));

jest.mock("lucide-react", () => ({
  Zap: () => <svg data-testid="zap-icon" />,
}));

describe("Navbar Component", () => {
  const mockSetView = jest.fn();
  const mockSetFilter = jest.fn();

  beforeEach(() => {
    mockSetView.mockClear();
    mockSetFilter.mockClear();

    useTask.mockReturnValue({
      state: { tasks: [] },
      setView: mockSetView,
      setFilter: mockSetFilter,
    });
  });

  test("renders the brand logo and application title correctly", () => {
    render(<Navbar />);

    const brandTitle = screen.getByText("TaskFlow");
    expect(brandTitle).toBeInTheDocument();

    const logoIcon = screen.getByTestId("zap-icon");
    expect(logoIcon).toBeInTheDocument();
  });
});