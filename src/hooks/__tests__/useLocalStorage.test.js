import { renderHook, act } from "@testing-library/react";
import { useLocalStorage } from "../useLocalStorage";

describe("useLocalStorage Hook", () => {
    beforeEach(() => {
        localStorage.clear();
        jest.clearAllMocks();
    });

    test("should initialize with initialValue if localStorage is empty", () => {
        const { result } = renderHook(() => useLocalStorage("test-key", "default"));

        expect(result.current[0]).toBe("default");
        expect(localStorage.getItem("test-key")).toBe(JSON.stringify("default"));
    });

    test("should initialize with value from localStorage if it exists", () => {
        localStorage.setItem("test-key", JSON.stringify("existing-value"));

        const { result } = renderHook(() => useLocalStorage("test-key", "default"));

        expect(result.current[0]).toBe("existing-value");
    });

    test("should update localStorage when value changes", () => {
        const { result } = renderHook(() => useLocalStorage("test-key", "initial"));

        act(() => {
            const setValue = result.current[1];
            setValue("new-value");
        });

        expect(result.current[0]).toBe("new-value");
        expect(localStorage.getItem("test-key")).toBe(JSON.stringify("new-value"));
    });

    test("should return initialValue if localStorage contains invalid JSON", () => {
        localStorage.setItem("test-key", "invalid-json-string{");

        const { result } = renderHook(() => useLocalStorage("test-key", "fallback"));

        expect(result.current[0]).toBe("fallback");
    });
});