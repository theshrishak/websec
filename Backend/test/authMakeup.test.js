import { expect } from "chai";
import jwt from "jsonwebtoken";
import sinon from "sinon";
import authMakeup from "../backend/middleware/authMakeup.js";

describe("Makeup Authentication Middleware Tests", () => {
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox(); // ✅ Set up sandbox for each test
    });

    afterEach(() => {
        sandbox.restore(); // ✅ Restore sandbox after each test
    });

    // ✅ 1st Test: Valid Token - Should allow access
    it("should allow access when a valid Makeup token is provided", async () => {
        const req = { headers: { stoken: "valid_token" }, body: {} };
        const res = { json: sinon.spy() };
        const next = sinon.spy();

        // ✅ Mock JWT verification
        sandbox.stub(jwt, "verify").returns({ id: "12345" });

        await authMakeup(req, res, next);
        expect(req.body.MakeupId).to.equal("12345"); // ✅ Check if MakeupId is assigned
        expect(next.calledOnce).to.be.true; // ✅ Expect next() to be called
    });

    // ✅ 2nd Test: No Token - Should return an error
    it("should return an error when no token is provided", async () => {
        const req = { headers: {} };
        const res = { json: sinon.spy() };
        const next = sinon.spy();

        await authMakeup(req, res, next);
        expect(res.json.calledOnce).to.be.true;
        const responseArg = res.json.getCall(0).args[0];

        expect(responseArg.success).to.be.false;
        expect(responseArg.message).to.equal("Not Authorized. Please Login Again");
    });

    // ✅ 3rd Test: Invalid Token - Should return an error
    it("should return an error when an invalid token is provided", async () => {
        const req = { headers: { stoken: "invalid_token" } };
        const res = { json: sinon.spy() };
        const next = sinon.spy();

        // ✅ Mock JWT verification failure
        sandbox.stub(jwt, "verify").throws(new Error("Invalid Token"));

        await authMakeup(req, res, next);
        expect(res.json.calledOnce).to.be.true;
        const responseArg = res.json.getCall(0).args[0];

        expect(responseArg.success).to.be.false;
        expect(responseArg.message).to.equal("Invalid Token");
    });
});
