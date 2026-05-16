import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import App from "../App";

jest.mock("../components/dashboard", () => ({
    Dashboard: () => <div data-testid="dashboard-mock">Dashboard Loaded</div>
}));

describe("App Component", () => {
    test("renders the Dashboard within the TaskProvider", () => {
        render(<App />);

        const dashboardElement = screen.getByTestId("dashboard-mock");
        expect(dashboardElement).toBeInTheDocument();
        expect(dashboardElement).toHaveTextContent("Dashboard Loaded");
    });

    test("matches snapshot", () => {
        const { asFragment } = render(<App />);
        expect(asFragment()).toMatchSnapshot();
    });
});