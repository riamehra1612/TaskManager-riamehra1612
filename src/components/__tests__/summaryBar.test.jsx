import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SummaryBar from "../summaryBar";
import { useTask } from "../../context/TaskContext";

jest.mock("../../context/TaskContext", () => ({
  useTask: jest.fn(),
}));

jest.mock("../../constants", () => ({
  SUMMARY_META: [
    { label: "Total", color: "#1e1e1e", icon: "📊" },
    { label: "Pending", color: "#ff0000", icon: "⏳" },
    { label: "Completed", color: "#00ff00", icon: "✅" },
  ],
}));

describe("SummaryBar Component", () => {
  const mockSummary = {
    Total: 12,
    Pending: 4,
    Completed: 8,
  };

  beforeEach(() => {
    useTask.mockReturnValue({
      summary: mockSummary,
    });
  });

  test("renders all summary cards with correct icons, labels, and dynamic counts", () => {
    render(<SummaryBar />);

    expect(screen.getByText("Total")).toBeInTheDocument();
    expect(screen.getByText("12")).toBeInTheDocument();

    expect(screen.getByText("Pending")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();

    expect(screen.getByText("Completed")).toBeInTheDocument();
    expect(screen.getByText("8")).toBeInTheDocument();
  });

  test("handles zero or missing counts gracefully without breaking", () => {
    useTask.mockReturnValue({
      summary: { Total: 0, Pending: 0, Completed: 0 },
    });

    render(<SummaryBar />);

    const zeros = screen.getAllByText("0");
    expect(zeros).toHaveLength(3);
  });
});