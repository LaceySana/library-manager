jest.mock("../database/db", () => jest.fn().mockResolvedValue(null));
jest.mock("../models/books", () => ({
    find: jest.fn(),
    findOne: jest.fn()
}));

const request = require("supertest");
const app = require("../app");
const booksModel = require("../models/books");

describe("Books - GET Endpoints", () => {
    beforeEach(() => jest.clearAllMocks());

    describe("GET /books", () => {
        it("returns 200 with an array of books", async () => {
            booksModel.find.mockResolvedValue([
                { _id: "b001", title: "The Hobbit", isbn: "978-0", copiesOwned: 3, copiesAvailable: 2, deletedAt: null }
            ]);
            const res = await request(app).get("/books");
            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });

        it("returns 500 on database failure", async () => {
            booksModel.find.mockRejectedValue(new Error("DB Error"));
            const res = await request(app).get("/books");
            expect(res.status).toBe(500);
        });
    });

    describe("GET /books/:id", () => {
        it("returns 200 with a single book", async () => {
            booksModel.findOne.mockResolvedValue(
                { _id: "b001", title: "The Hobbit", isbn: "978-0", copiesOwned: 3, copiesAvailable: 2, deletedAt: null }
            );
            const res = await request(app).get("/books/b001");
            expect(res.status).toBe(200);
        });

        it("returns 404 when book not found", async () => {
            booksModel.findOne.mockResolvedValue(null);
            const res = await request(app).get("/books/nonexistent");
            expect(res.status).toBe(404);
        });

        it("returns 500 on database failure", async () => {
            booksModel.findOne.mockRejectedValue(new Error("DB Error"));
            const res = await request(app).get("/books/b001");
            expect(res.status).toBe(500);
        });
    });
});