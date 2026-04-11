const request = require("supertest");
jest.mock("../controllers", () => ({
    authorsController: {
        getAll: jest.fn(),
        get: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn()
    },
    booksController: {
        getAll: jest.fn(),
        get: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn()
    },
    membersController: {
        getAll: jest.fn(),
        get: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn()
    },
    loansController: {
        getAll: jest.fn(),
        get: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn()
    }
}));

jest.mock("../validation", () => ({
    validateAuthor: { create: (r, s, n) => n(), update: (r, s, n) => n() },
    validateBook: { create: (r, s, n) => n(), update: (r, s, n) => n() },
    validateMember: { create: (r, s, n) => n(), update: (r, s, n) => n() },
    validateLoan: { create: (r, s, n) => n(), update: (r, s, n) => n() }
}));

jest.mock("../middleware/authentication", () => ({
    authenticate: (req, res, next) => next()
}));
const app = require("../app");
const { membersController } = require("../controllers");

describe("Members GET routes", () => {
    it("should return all members", async () => {
        membersController.getAll.mockImplementation((req, res) => {
            res.status(200).json([
                { id: 1, name: "Member 1" },
                { id: 2, name: "Member 2" }
            ]);
        });

        const res = await request(app).get("/members");

        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(2);
    });

    it("should return one member by id", async () => {
        membersController.get.mockImplementation((req, res) => {
            res.status(200).json({ id: 1, name: "Member 1" });
        });

        const res = await request(app).get("/members/1");

        expect(res.statusCode).toBe(200);
        expect(res.body.id).toBe(1);
    });
});
