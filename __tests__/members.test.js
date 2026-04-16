const request = require("supertest");

jest.mock("../database/db", () => jest.fn().mockResolvedValue(true));
jest.mock("../models/members");

const membersModel = require("../models/members");
const app = require("../app");

const mockMembers = [
    {
        _id: "507f1f77bcf86cd799439031",
        firstName: "Alice",
        lastName: "Johnson",
        phone: "555-0001",
        email: "alice@example.com",
        status: "active",
        role: "member",
        deletedAt: null
    },
    {
        _id: "507f1f77bcf86cd799439032",
        firstName: "Bob",
        lastName: "Williams",
        phone: "555-0002",
        email: "bob@example.com",
        status: "active",
        role: "admin",
        deletedAt: null
    }
];

describe("Members GET Routes", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("GET /members - returns 200 and an array", async () => {
        membersModel.find.mockResolvedValue(mockMembers);
        const res = await request(app).get("/members/");
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBe(2);
    });

    test("GET /members - returns 500 on database error", async () => {
        membersModel.find.mockRejectedValue(new Error("DB error"));
        const res = await request(app).get("/members/");
        expect(res.status).toBe(500);
    });

    test("GET /members/:id - returns 200 and the member", async () => {
        membersModel.findOne.mockResolvedValue(mockMembers[0]);
        const res = await request(app).get("/members/507f1f77bcf86cd799439031");
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("firstName", "Alice");
    });

    test("GET /members/:id - returns 404 when member not found", async () => {
        membersModel.findOne.mockResolvedValue(null);
        const res = await request(app).get("/members/507f1f77bcf86cd799439099");
        expect(res.status).toBe(404);
    });

    test("GET /members/:id - returns 500 on database error", async () => {
        membersModel.findOne.mockRejectedValue(new Error("DB error"));
        const res = await request(app).get("/members/507f1f77bcf86cd799439031");
        expect(res.status).toBe(500);
    });
});
