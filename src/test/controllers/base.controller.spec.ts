import { describe } from "mocha";
import App from "../../app";
import chai, { expect, should } from 'chai';
import chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe("BaseController", () => {
    describe("Index", () => {
        it("Should have 200 Status code", () => {
            chai.request(App)
            .get("/").end((err, res) => {
                expect(res).to.have.status(200);
            })
        })
    })
})