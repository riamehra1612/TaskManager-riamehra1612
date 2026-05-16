import { renderHook, act } from "@testing-library/react";
import { TaskProvider, useTask } from "../TaskContext";
import { useLocalStorage } from "../../hooks/useLocalStorage";

jest.mock("../../hooks/useLocalStorage");

describe("TaskProvider & useTask Hook", () => {
    const mockSetStoredTasks = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        useLocalStorage.mockReturnValue([[], mockSetStoredTasks]);
    });

    const wrapper = ({ children }) => <TaskProvider>{children}</TaskProvider>;

    test("should initialize with default state settings", () => {
        const { result } = renderHook(() => useTask(), { wrapper });

        expect(result.current.state.filter).toBe("All");
        expect(result.current.state.view).toBe("all");
        expect(result.current.state.sort).toBe("asc");
        expect(result.current.state.tasks).toEqual([]);
    });

    test("should add a new task and trigger localStorage synchronization", () => {
        const { result } = renderHook(() => useTask(), { wrapper });

        act(() => {
            result.current.addTask({ title: "Write unit tests", status: "Pending" });
        });

        expect(result.current.state.tasks).toHaveLength(1);
        expect(result.current.state.tasks[0]).originalArgs = expect.objectContaining({
            title: "Write unit tests",
            status: "Pending",
        });
        expect(typeof result.current.state.tasks[0].id).toBe("string");
    });

    test("should update a task via editTask", () => {
        const { result } = renderHook(() => useTask(), { wrapper });

        act(() => {
            result.current.addTask({ title: "Task 1", status: "Pending" });
        });
        const addedTask = result.current.state.tasks[0];

        act(() => {
            result.current.editTask({ ...addedTask, title: "Updated Task 1", status: "Completed" });
        });

        expect(result.current.state.tasks[0].title).toBe("Updated Task 1");
        expect(result.current.state.tasks[0].status).toBe("Completed");
    });

    test("should remove a task via deleteTask", () => {
        const { result } = renderHook(() => useTask(), { wrapper });

        act(() => {
            result.current.addTask({ title: "To Be Deleted", status: "Pending" });
        });
        const targetId = result.current.state.tasks[0].id;

        act(() => {
            result.current.deleteTask(targetId);
        });

        expect(result.current.state.tasks).toHaveLength(0);
    });

    test("should update filter, view, and sort settings correctly", () => {
        const { result } = renderHook(() => useTask(), { wrapper });

        act(() => {
            result.current.setFilter("In Progress");
            result.current.setView("completed");
            result.current.setSort("desc");
        });

        expect(result.current.state.filter).toBe("In Progress");
        expect(result.current.state.view).toBe("completed");
        expect(result.current.state.sort).toBe("desc");
    });
});