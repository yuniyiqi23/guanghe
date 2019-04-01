const app = require("../app");
const request = require("supertest")(app);
const should = require("should");

describe("test signin", function () {
  const name = "gh_daom";
  const password = "111111";

  it("signin successful", function (done) {
    request
      .post("/user/signin").send({
        name: name,
        password: password
      })
      .expect(200)
      .end(function (err, res) {
        should.not.exist(err);
        done();
      });
  });
  it("signin fail when name is empty", function (done) {
    request
      .post("/user/signin")
      .send({
        name: "",
        password: password
      })
      .expect(200)
      .end(function (err, res) {
        should.not.exist(err);
        res.text.should.containEql('child ' + '"name"' + ' fails because ["name" is not allowed to be empty]');
        done();
      });
  });
  it("signin fail when password is empty", function (done) {
    request
      .post("/user/signin")
      .send({
        name: name,
        password: ""
      })
      .expect(200)
      .end(function (err, res) {
        should.not.exist(err);
        res.text.should.containEql('child "password" fails because ["password" is not allowed to be empty]');
        done();
      });
  });
  it("signin fail when name is not exist", function (done) {
    request
      .post("/user/signin")
      .send({
        name: name + "!@#",
        password: password
      })
      .expect(200)
      .end(function (err, res) {
        should.not.exist(err);
        res.text.should.containEql('{"result":"success","message":"认证失败,用户不存在!"}');
        done();
      });
  });
  it("signin fail when password is wrong", function (done) {
    request
      .post("/user/signin")
      .send({
        name: name,
        password: password + "!@#"
      })
      .expect(200)
      .end(function (err, res) {
        should.not.exist(err);
        res.text.should.containEql('child "password" fails because ["password" with value "111111!@#" fails to match the required pattern: /^[a-zA-Z0-9]{3,30}$/]');
        done();
      });
  });

});
