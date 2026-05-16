import { validate } from "../validate";

describe("validate function", () => {
    test("returns empty object when all fields are valid", () => {
        const validForm = {
            title: "Finish Report",
            dueDate: "2026-05-20",
        };
        const errors = validate(validForm);

        expect(errors).toEqual({});
    });

    test("returns error if title is missing or only whitespace", () => {
        const invalidForm = {
            title: "   ",
            dueDate: "2026-05-20",
        };
        const errors = validate(invalidForm);

        expect(errors.title).toBe("Title is required");
    });

    test("returns error if dueDate is missing", () => {
        const invalidForm = {
            title: "Buy Groceries",
            dueDate: "",
        };
        const errors = validate(invalidForm);

        expect(errors.dueDate).toBe("Due date is required");
    });

    test("returns multiple errors if both fields are missing", () => {
        const emptyForm = {
            title: "",
            dueDate: null,
        };
        const errors = validate(emptyForm);

        expect(errors.title).toBe("Title is required");
        expect(errors.dueDate).toBe("Due date is required");
        expect(Object.keys(errors).length).toBe(2);
    });
});