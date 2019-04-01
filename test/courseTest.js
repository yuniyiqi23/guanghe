const app = require("../app");
const request = require("supertest")(app);
const should = require("should");
const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZ2hfc3Vud2giLCJpYXQiOjE1NTM2NjA3NDMsImV4cCI6MTU1NDI2NTU0M30.bUSzhWv5fb1FnddAxRUbsbuLjeMB74-LZyrYERGmdxM';
const pageSize = 3;
const pageNumber = 1;

describe("Test course", function () {
  it("get courseList without authorization", function (done) {
    request
      .get("/courseware/list")
      .send({
        pageSize: pageSize,
        pageNumber: pageNumber
      })
      .expect(200)
      .end(function (err, res) {
        should.not.exist(err);
        res.body.should.be.an.instanceOf(Object);
        res.body.should.have.property('result').eql('success');
        res.body.should.have.property('coursewares');
        done();
      });
  });

  it("get courseList with authorization", function (done) {
    request
      .get("/courseware/list")
      .set('Authorization', token)
      .send({
        pageSize: pageSize,
        pageNumber: pageNumber
      })
      .expect(200)
      .end(function (err, res) {
        should.not.exist(err);
        res.body.should.be.an.instanceOf(Object);
        res.body.should.have.property('result').eql('success');
        res.body.should.have.property('coursewares');
        done();
      });
  });

});
