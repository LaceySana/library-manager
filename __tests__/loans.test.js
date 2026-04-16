const request = require("supertest");

jest.mock("../database/db", () => jest.fn().mockResolvedValue(true));
jest.mock("../models/loan");

const loansModel = require("../models/loan");
const app = require("../app");

const mockLoans = [
    {
        _id: "507f1f77bcf86cd799439041",
        memberId: "507f1f77bcf86cd799439031",
        bookId: "507f1f77bcf86cd799439021",
        loanDate: "2025-01-01",
        dueDate: "2025-01-15",
        status: "borrowed"
    },
    {
        _id: "507f1f77bcf86cd799439042",
        memberId: "507f1f77bcf86cd799439032",
        bookId: "507f1f77bcf86cd799439022",
        loanDate: "2025-01-05",
        dueDate: "2025-01-20",
        returnDate: "2025-01-18",
        status: "returned"
    }
];

describe("Loans GET Routes", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("GET /loans - returns 200 and an array", async () => {
        loansModel.find.mockResolvedValue(mockLoans);
        const res = await request(app).get("/loans/");
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBe(2);
    });

    test("GET /loans - returns 500 on database error", async () => {
        loansModel.find.mockRejectedValue(new Error("DB error"));
        const res = await request(app).get("/loans/");
        expect(res.status).toBe(500);
    });

    test("GET /loans/:id - returns 200 and the loan", async () => {
        loansModel.findById.mockResolvedValue(mockLoans[0]);
        const res = await request(app).get("/loans/507f1f77bcf86cd799439041");
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("status", "borrowed");
    });

    test("GET /loans/:id - returns 404 when loan not found", async () => {
        loansModel.findById.mockResolvedValue(null);
        const res = await request(app).get("/loans/507f1f77bcf86cd799439099");
        expect(res.status).toBe(404);
    });

    test("GET /loans/:id - returns 500 on database error", async () => {
        loansModel.findById.mockRejectedValue(new Error("DB error"));
        const res = await request(app).get("/loans/507f1f77bcf86cd799439041");
        expect(res.status).toBe(500);
    });
});
