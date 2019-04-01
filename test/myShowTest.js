const app = require("../app");
const request = require("supertest")(app);
const should = require("should");
const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZ2hfc3Vud2giLCJpYXQiOjE1NTM2NjA3NDMsImV4cCI6MTU1NDI2NTU0M30.bUSzhWv5fb1FnddAxRUbsbuLjeMB74-LZyrYERGmdxM';
const testCourse = {
  content: "test_content",
  pictures: ["test_picture01", "test_picture02"],
  location: "test_location",
}

describe("Test get myShow", function () {
  it("get courseList without authorization", function (done) {
    request
      .get("/courseware/list?pageSize=5&pageNumber=1&courseType=1")
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
      .get("/courseware/list?pageSize=3&pageNumber=1&courseType=1")
      .set('Authorization', token)
      .expect(200)
      .end(function (err, res) {
        should.not.exist(err);
        res.body.should.be.an.instanceOf(Object);
        res.body.should.have.property('result').eql('success');
        res.body.coursewares.should.be.instanceof(Array).and.have.lengthOf(3);
        done();
      });
  });

});


describe("Test create course", function () {
  // it("create caseStudyClub with authorization", function (done) {
  //   request
  //     .post("/courseware/create")
  //     .set('Authorization', token)
  //     .send(testCourse)
  //     .expect(200)
  //     .end(function (err, res) {
  //       should.not.exist(err);
  //       res.body.should.be.an.instanceOf(Object);
  //       // res.body.should.have.property('result')//.eql('success');
  //       done();
  //     });
  // });

  it("create caseStudyClub without authorization", function (done) {
    request
      .post("/courseware/create")
      .send(testCourse)
      .expect(401)
      .end(function (err, res) {
        should.not.exist(err);
        // res.body.should.eql('Unauthorized');
        done();
      });
  });

});