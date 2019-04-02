const app = require("../app");
const request = require("supertest")(app);
const should = require("should");
const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZ2hfc3Vud2giLCJpYXQiOjE1NTM2NjA3NDMsImV4cCI6MTU1NDI2NTU0M30.bUSzhWv5fb1FnddAxRUbsbuLjeMB74-LZyrYERGmdxM';
const testCourse = {
  authorId: "5c8744bdc71400367afd3ad7",
  nickName: "明道老师",
  avatar: "test_avatar",
  title: "test_title",
  videoURL: "Boss——videoURL",
  cover: "Boss——coverPicture",
  videoSlice: "Boss——videoSlice",
  content: "test_content",
  publishTime: "2019-04-02T02:34:00.000Z",
  courseType: "2"
}

describe("Test get course", function () {
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

  it.only("get courseList with authorization", function (done) {
    request
      .get("/courseware/list?pageSize=3&pageNumber=1&courseType=1")
      .set('Authorization', token)
      .expect(200)
      .end(function (err, res) {
        should.not.exist(err);
        res.body.should.be.an.instanceOf(Object);
        res.body.should.have.property('result').eql('success');
        res.body.coursewares.should.be.instanceof(Array).and.have.lengthOf(2);
        done();
      });
  });

});


describe("Test create course", function () {
  it("create caseStudyClub with authorization", function (done) {
    request
      .post("/courseware/create")
      .set('Authorization', token)
      .send(testCourse)
      .expect(200)
      .end(function (err, res) {
        should.not.exist(err);
        res.body.should.be.an.instanceOf(Object);
        res.body.should.have.property('result').eql('success');
        done();
      });
  });

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