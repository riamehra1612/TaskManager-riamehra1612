import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import BaseCard from "../BaseCard";

describe("BaseCard Component", () => {

    test("renders children inside the card wrapper", () => {
        render(
            <BaseCard>
                <div data-testid="card-child">Card Content</div>
            </BaseCard>
        );

        const child = screen.getByTestId("card-child");
        expect(child).toBeInTheDocument();
        expect(child.parentElement).toBeInTheDocument();
    });

    test("applies default borderTopColor when none is provided", () => {
        render(<BaseCard>Content</BaseCard>);

        const cardElement = screen.getByText("Content");
        expect(cardElement).toHaveStyle("border-top: 4px solid #e5e7eb");
    });

    test("applies a custom borderTopColor dynamically", () => {
        render(<BaseCard borderTopColor="#ef4444">Content</BaseCard>);

        const cardElement = screen.getByText("Content");
        expect(cardElement).toHaveStyle("border-top: 4px solid #ef4444");
    });

    test("merges custom inline styles with component styles", () => {
        const inlineOverride = { marginTop: "20px", opacity: "0.8" };
        render(<BaseCard style={inlineOverride}>Content</BaseCard>);

        const cardElement = screen.getByText("Content");
        expect(cardElement).toHaveStyle("margin-top: 20px");
        expect(cardElement).toHaveStyle("opacity: 0.8");
        expect(cardElement).toHaveStyle("border-top: 4px solid #e5e7eb"); // retains structural base defaults
    });

    test("applies correct layout properties for 'summary' variant", () => {
        render(<BaseCard variant="summary">Summary View</BaseCard>);

        const cardElement = screen.getByText("Summary View");
        expect(cardElement).toHaveStyle({
            background: "#fff",
            borderRadius: "12px",
            padding: "20px 24px",
            display: "flex",
            alignItems: "center",
            gap: "16px",
        });
    });

    test("applies correct structural layout styles for 'task' variant", () => {
        render(<BaseCard variant="task">Task View</BaseCard>);

        const cardElement = screen.getByText("Task View");
        expect(cardElement).toHaveStyle({
            background: "#fff",
            borderRadius: "14px",
            padding: "20px",
            border: "1px solid #f1f5f9",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
        });
    });
});