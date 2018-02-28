var request = require("supertest");
var expect = require("expect");
var {app} = require("./../server");
var {Todo} = require("../models/todo");



describe('server', () => {
    it("should post /todos", (done) => {
        var text="edgar"
        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .end((err, res) => {
                if(err){
                    done(err);
                }
            })
    })
})