const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);
const loginData = require('./data.json');

chai.should();

describe('login', () => {

  it('givenLoginDetails_whenProper_shouldGive_201Status', (done) => {
    const loginDetails = loginData.login.correctLogin;
    chai
      .request(server)
      .post('/login')
      .send(loginDetails)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(201);
        done();
      });
  });

  it('givenLoginDetails_whenWrongEmail_shouldGive_401Status', (done) => {
    const loginDetails = loginData.login.loginWithWrongEmail;
    chai
      .request(server)
      .post('/login')
      .send(loginDetails)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(401);
        done();
      });
  });

  it('givenLoginDetails_whenWrongPassword_shouldGive_401Status', (done) => {
    const loginDetails = loginData.login.loginWithWrongPassword;
    chai
      .request(server)
      .post('/login')
      .send(loginDetails)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(401);
        done();
      });
  });

  it('givenLoginDetails_whenWithoutPassword_shouldGive_401Status', (done) => {
    const loginDetails = loginData.login.loginWithoutPassword;
    chai
      .request(server)
      .post('/login')
      .send(loginDetails)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(401);
        done();
      });
  });

  it('givenLoginDetails_whenWithoutEmail_shouldGive_401Status', (done) => {
    const loginDetails = loginData.login.loginWithoutEmail;
    chai
      .request(server)
      .post('/login')
      .send(loginDetails)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(401);
        done();
      });
  });
});