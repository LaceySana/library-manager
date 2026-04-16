const request = require("supertest");

jest.mock("../database/db", () => jest.fn().mockResolvedValue(true));
jest.mock("../models/books");

const booksModel = require("../models/books");
const app = require("../app");

const mockBooks = [
    {
        _id: "507f1f77bcf86cd799439021",
        title: "The Great Novel",
        authorId: "507f1f77bcf86cd799439011",
        isbn: "978-0000000001",
        copiesOwned: 5,
        copiesAvailable: 3,
        deletedAt: null
    },
    {
        _id: "507f1f77bcf86cd799439022",
        title: "Another Book",
        authorId: "507f1f77bcf86cd799439012",
        isbn: "978-0000000002",
        copiesOwned: 2,
        copiesAvailable: 1,
        deletedAt: null
    }
];

describe("Books GET Routes", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("GET /books - returns 200 and an array", async () => {
        booksModel.find.mockResolvedValue(mockBooks);
        const res = await request(app).get("/books/");
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBe(2);
    });

    test("GET /books - returns 500 on database error", async () => {
        booksModel.find.mockRejectedValue(new Error("DB error"));
        const res = await request(app).get("/books/");
        expect(res.status).toBe(500);
    });

    test("GET /books/:id - returns 200 and the book", async () => {
        booksModel.findOne.mockResolvedValue(mockBooks[0]);
        const res = await request(app).get("/books/507f1f77bcf86cd799439021");
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("title", "The Great Novel");
    });

    test("GET /books/:id - returns 404 when book not found", async () => {
        booksModel.findOne.mockResolvedValue(null);
        const res = await request(app).get("/books/507f1f77bcf86cd799439099");
        expect(res.status).toBe(404);
    });

    test("GET /books/:id - returns 500 on database error", async () => {
        booksModel.findOne.mockRejectedValue(new Error("DB error"));
        const res = await request(app).get("/books/507f1f77bcf86cd799439021");
        expect(res.status).toBe(500);
    });
});
