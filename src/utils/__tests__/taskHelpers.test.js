import { filterTasks, sortByDueDate, getSummary, isOverdue, formatDate } from "../taskHelpers";

const mockTasks = [
    { id: 1, title: "Task A", status: "Pending", dueDate: "2026-06-01" },
    { id: 2, title: "Task B", status: "Completed", dueDate: "2026-05-01" },
    { id: 3, title: "Task C", status: "In Progress", dueDate: "2026-07-01" },
];

describe("Task Utility Functions", () => {

    describe("filterTasks", () => {
        test("returns only completed tasks when view is 'completed'", () => {
            const result = filterTasks(mockTasks, "All", "completed");
            expect(result).toHaveLength(1);
            expect(result[0].status).toBe("Completed");
        });

        test("filters by status when filter is not 'All'", () => {
            const result = filterTasks(mockTasks, "Pending", "all");
            expect(result).toHaveLength(1);
            expect(result[0].title).toBe("Task A");
        });
    });

    describe("sortByDueDate", () => {
        test("sorts tasks in ascending order (default)", () => {
            const sorted = sortByDueDate(mockTasks, "asc");
            expect(sorted[0].title).toBe("Task B");
            expect(sorted[2].title).toBe("Task C");
        });

        test("sorts tasks in descending order", () => {
            const sorted = sortByDueDate(mockTasks, "desc");
            expect(sorted[0].title).toBe("Task C");
        });

        test("does not mutate the original tasks array", () => {
            const originalCopy = [...mockTasks];
            sortByDueDate(mockTasks);
            expect(mockTasks).toEqual(originalCopy);
        });
    });

    describe("getSummary", () => {
        test("calculates correct counts for each status", () => {
            const summary = getSummary(mockTasks);
            expect(summary).toEqual({
                Pending: 1,
                "In Progress": 1,
                Completed: 1,
            });
        });
    });

    describe("isOverdue", () => {
        test("returns true for past dates if not completed", () => {
            const pastDate = "2020-01-01";
            expect(isOverdue(pastDate, "Pending")).toBe(true);
        });

        test("returns false for past dates if completed", () => {
            const pastDate = "2020-01-01";
            expect(isOverdue(pastDate, "Completed")).toBe(false);
        });

        test("returns false for future dates", () => {
            const futureDate = "2099-01-01";
            expect(isOverdue(futureDate, "Pending")).toBe(false);
        });
    });

    describe("formatDate", () => {
        test("formats date correctly for en-IN locale", () => {
            const date = "2026-05-15";
            expect(formatDate(date)).toMatch(/15 [A-Za-z]+ 2026/);
        });
    });
});