import bcrypt from "bcrypt"; // ✅ Import bcrypt properly
import * as chai from "chai"; // ✅ Use ES module import
import sinon from "sinon"; // ✅ Helps in mocking functions
import { appointmentsMakeup, loginMakeup, MakeupProfile } from "../backend/controllers/MakeupController.js"; // ✅ Ensure correct path
import appointmentModel from "../backend/models/appointmentModel.js"; // ✅ Import actual Mongoose models
import MakeupModel from "../backend/models/MakeupModel.js"; // ✅ Import actual Mongoose models

const { expect } = chai;

describe("Makeup API Simple Tests", () => {
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();  // ✅ Initialize sandbox before each test
    });

    afterEach(() => {
        sandbox.restore();  // ✅ Restore sandbox after each test
    });

    // ✅ Test 1: Successful Makeup Login
    it("should return a success response when correct Makeup credentials are provided", async () => {
        const req = { body: { email: "Makeup@example.com", password: "password123" } };
        const res = { json: sinon.spy() };

        // ✅ Mocking database call
        sandbox.stub(MakeupModel, "findOne").resolves({ _id: "123", password: "$2b$10$hashedpassword" });
        sandbox.stub(bcrypt, "compare").resolves(true);  // ✅ Corrected bcrypt usage

        await loginMakeup(req, res);
        expect(res.json.calledOnce).to.be.true;
        const responseArg = res.json.getCall(0).args[0];

        expect(responseArg.success).to.be.true;
        expect(responseArg).to.have.property("token");
    });

    // ✅ Test 2: Fetch Makeup Appointments (Mocked Response)
    it("should return a success response with Makeup appointments", async () => {
        const req = { body: { MakeupId: "123" } };
        const res = { json: sinon.spy() };
        const mockAppointments = [{ id: 1, date: "2025-03-01" }, { id: 2, date: "2025-03-02" }];

        // ✅ Mock database call
        sandbox.stub(appointmentModel, "find").resolves(mockAppointments);

        await appointmentsMakeup(req, res);
        expect(res.json.calledOnce).to.be.true;
        const responseArg = res.json.getCall(0).args[0];

        expect(responseArg.success).to.be.true;
        expect(responseArg.appointments).to.deep.equal(mockAppointments);
    });

    // ✅ Test 3: Fetch Makeup Profile (Mocked Response)
    it("should return a success response with Makeup profile", async () => {
        const req = { body: { MakeupId: "123" } };
        const res = { json: sinon.spy() };
        const mockProfile = { id: "123", name: "John Doe", speciality: "Haircut" };

        // ✅ Correctly mock findById().select() behavior
        sandbox.stub(MakeupModel, "findById").returns({
            select: sinon.stub().resolves(mockProfile),
        });

        await MakeupProfile(req, res);
        expect(res.json.calledOnce).to.be.true;
        const responseArg = res.json.getCall(0).args[0];

        expect(responseArg.success).to.be.true;
        expect(responseArg.profileData).to.deep.equal(mockProfile);
    });
});
