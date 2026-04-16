jest.mock("../database/db", () => jest.fn().mockResolvedValue(null));
jest.mock("../models/authors", () => ({
    find: jest.fn(),
    findOne: jest.fn()
}));

const request = require("supertest");
const app = require("../app");
const authorsModel = require("../models/authors");

describe("Authors - GET Endpoints", () => {
    beforeEach(() => jest.clearAllMocks());

    describe("GET /authors", () => {
        it("returns 200 with an array of authors", async () => {
            authorsModel.find.mockResolvedValue([
                { _id: "64a1", firstName: "Jane", lastName: "Smith", dob: "1980-01-01", deletedAt: null }
            ]);
            const res = await request(app).get("/authors");
            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });

        it("returns 500 on database failure", async () => {
            authorsModel.find.mockRejectedValue(new Error("DB Error"));
            const res = await request(app).get("/authors");
            expect(res.status).toBe(500);
        });
    });

    describe("GET /authors/:id", () => {
        it("returns 200 with a single author", async () => {
            authorsModel.findOne.mockResolvedValue(
                { _id: "64a1", firstName: "Jane", lastName: "Smith", dob: "1980-01-01", deletedAt: null }
            );
            const res = await request(app).get("/authors/64a1");
            expect(res.status).toBe(200);
        });

        it("returns 404 when author not found", async () => {
            authorsModel.findOne.mockResolvedValue(null);
            const res = await request(app).get("/authors/nonexistent");
            expect(res.status).toBe(404);
        });

        it("returns 500 on database failure", async () => {
            authorsModel.findOne.mockRejectedValue(new Error("DB Error"));
            const res = await request(app).get("/authors/64a1");
            expect(res.status).toBe(500);
        });
    });
});