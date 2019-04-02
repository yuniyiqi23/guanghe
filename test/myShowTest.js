const app = require("../app");
const request = require("supertest")(app);
const should = require("should");
const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZ2hfc3Vud2giLCJpYXQiOjE1NTM2NjA3NDMsImV4cCI6MTU1NDI2NTU0M30.bUSzhWv5fb1FnddAxRUbsbuLjeMB74-LZyrYERGmdxM';
const testMyShowData = {
  content: "test_content",
  pictures: ["test_picture01", "test_picture02"],
  location: "test_location",
}

describe.only("Test get myShow", function () {
  it("get myshows without authorization", function (done) {
    request
      .get("/myshow/list?pageSize=3&pageNumber=1")
      .expect(200)
      .end(function (err, res) {
        should.not.exist(err);
        res.body.should.be.an.instanceOf(Object);
        res.body.should.have.property('result').eql('success');
        res.body.myShowList.should.be.instanceof(Array).and.have.lengthOf(3);
        done();
      });
  });

  it("get my myshows with authorization", function (done) {
    request
      .get("/myshow/list?pageSize=3&pageNumber=1")
      .expect(200)
      .end(function (err, res) {
        should.not.exist(err);
        res.body.should.be.an.instanceOf(Object);
        res.body.should.have.property('result').eql('success');
        res.body.myShowList.should.be.instanceof(Array).and.have.lengthOf(3);
        done();
      });
  });

  it("get myshow with authorization", function (done) {
    request
      .get("/myshow/list?pageSize=3&pageNumber=1&self=true")
      .set('Authorization', token)
      .expect(200)
      .end(function (err, res) {
        should.not.exist(err);
        res.body.should.be.an.instanceOf(Object);
        res.body.should.have.property('result').eql('success');
        res.body.myShowList.should.be.instanceof(Array).and.have.lengthOf(3);
        done();
      });
  });

});


describe("Test create myshow", function () {
  it("create myshow with authorization", function (done) {
    request
      .post("/myshow/create")
      .set('Authorization', token)
      .send(testMyShowData)
      .expect(200)
      .end(function (err, res) {
        should.not.exist(err);
        res.body.should.be.an.instanceOf(Object);
        res.body.should.have.property('result').eql('success');
        res.body.should.have.property('message').eql('发布我秀成功!');
        done();
      });
  });

  it("create myshow without authorization", function (done) {
    request
      .post("/myshow/create")
      .send(testMyShowData)
      .expect(401)
      .end(function (err, res) {
        should.not.exist(err);
        // res.body.should.eql('Unauthorized');
        done();
      });
  });

});