jest.mock("../database/db", () => jest.fn().mockResolvedValue(null));
jest.mock("../models/members", () => ({
    find: jest.fn(),
    findOne: jest.fn()
}));

const request = require("supertest");
const app = require("../app");
const membersModel = require("../models/members");

describe("Members - GET Endpoints", () => {
    beforeEach(() => jest.clearAllMocks());

    describe("GET /members", () => {
        it("returns 200 with an array of members", async () => {
            membersModel.find.mockResolvedValue([
                { _id: "m001", firstName: "John", lastName: "Doe", email: "john@example.com", deletedAt: null }
            ]);
            const res = await request(app).get("/members");
            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });

        it("returns 500 on database failure", async () => {
            membersModel.find.mockRejectedValue(new Error("DB Error"));
            const res = await request(app).get("/members");
            expect(res.status).toBe(500);
        });
    });

    describe("GET /members/:id", () => {
        it("returns 200 with a single member", async () => {
            membersModel.findOne.mockResolvedValue(
                { _id: "m001", firstName: "John", lastName: "Doe", email: "john@example.com", deletedAt: null }
            );
            const res = await request(app).get("/members/m001");
            expect(res.status).toBe(200);
        });

        it("returns 404 when member not found", async () => {
            membersModel.findOne.mockResolvedValue(null);
            const res = await request(app).get("/members/nonexistent");
            expect(res.status).toBe(404);
        });

        it("returns 500 on database failure", async () => {
            membersModel.findOne.mockRejectedValue(new Error("DB Error"));
            const res = await request(app).get("/members/m001");
            expect(res.status).toBe(500);
        });
    });
});