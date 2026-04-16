jest.mock("../database/db", () => jest.fn().mockResolvedValue(null));
jest.mock("../models/loan", () => ({
    find: jest.fn(),
    findById: jest.fn()
}));

const request = require("supertest");
const app = require("../app");
const loansModel = require("../models/loan");

describe("Loans - GET Endpoints", () => {
    beforeEach(() => jest.clearAllMocks());

    describe("GET /loans", () => {
        it("returns 200 with an array of loans", async () => {
            loansModel.find.mockResolvedValue([
                { _id: "l001", memberId: "m001", bookId: "b001", status: "borrowed" }
            ]);
            const res = await request(app).get("/loans");
            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });

        it("returns 500 on database failure", async () => {
            loansModel.find.mockRejectedValue(new Error("DB Error"));
            const res = await request(app).get("/loans");
            expect(res.status).toBe(500);
        });
    });

    describe("GET /loans/:id", () => {
        it("returns 200 with a single loan", async () => {
            loansModel.findById.mockResolvedValue(
                { _id: "l001", memberId: "m001", bookId: "b001", status: "borrowed" }
            );
            const res = await request(app).get("/loans/l001");
            expect(res.status).toBe(200);
        });

        it("returns 404 when loan not found", async () => {
            loansModel.findById.mockResolvedValue(null);
            const res = await request(app).get("/loans/nonexistent");
            expect(res.status).toBe(404);
        });

        it("returns 500 on database failure", async () => {
            loansModel.findById.mockRejectedValue(new Error("DB Error"));
            const res = await request(app).get("/loans/l001");
            expect(res.status).toBe(500);
        });
    });
});