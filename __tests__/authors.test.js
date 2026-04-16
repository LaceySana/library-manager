const request = require("supertest");

jest.mock("../database/db", () => jest.fn().mockResolvedValue(true));
jest.mock("../models/authors");

const authorsModel = require("../models/authors");
const app = require("../app");

const mockAuthors = [
    {
        _id: "507f1f77bcf86cd799439011",
        firstName: "Jane",
        lastName: "Smith",
        dob: "1980-01-01",
        deletedAt: null
    },
    {
        _id: "507f1f77bcf86cd799439012",
        firstName: "John",
        lastName: "Doe",
        dob: "1975-06-15",
        deletedAt: null
    }
];

describe("Authors GET Routes", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("GET /authors - returns 200 and an array", async () => {
        authorsModel.find.mockResolvedValue(mockAuthors);
        const res = await request(app).get("/authors/");
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBe(2);
    });

    test("GET /authors - returns 500 on database error", async () => {
        authorsModel.find.mockRejectedValue(new Error("DB error"));
        const res = await request(app).get("/authors/");
        expect(res.status).toBe(500);
    });

    test("GET /authors/:id - returns 200 and the author", async () => {
        authorsModel.findOne.mockResolvedValue(mockAuthors[0]);
        const res = await request(app).get("/authors/507f1f77bcf86cd799439011");
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("firstName", "Jane");
    });

    test("GET /authors/:id - returns 404 when author not found", async () => {
        authorsModel.findOne.mockResolvedValue(null);
        const res = await request(app).get("/authors/507f1f77bcf86cd799439099");
        expect(res.status).toBe(404);
    });

    test("GET /authors/:id - returns 500 on database error", async () => {
        authorsModel.findOne.mockRejectedValue(new Error("DB error"));
        const res = await request(app).get("/authors/507f1f77bcf86cd799439011");
        expect(res.status).toBe(500);
    });
});
