const request = require("request");

describe('calc', () => {
    it("should mutiply 2 and 2", () => {
        expect(2*2).toBe(4);
    });
});

describe("get message", () => {
    it("should return 200 ok", (done) => {
        request.get("http://localhost:5000/messages", (err, res) => {
            expect(res.statusCode).toBe(200);
            done();
        })
    })

    it("should return list that's not empty", (done) => {
        request.get("http://localhost:5000/messages", (err, res) => {
            expect(JSON.parse(res.body).length).toBeGreaterThan(0);
            done();
        })
    })
})

describe("get message by user", () => {
    it("should return 200 ok", (done) => {
        request.get("http://localhost:5000/messages/john", (err, res) => {
            expect(res.statusCode).toBe(200);
            done();
        })
    })

    it("should return name of john", (done) => {
        request.get("http://localhost:5000/messages/john", (err, res) => {
            expect(JSON.parse(res.body)[0].name).toEqual("john");
            done();
    })
})
})