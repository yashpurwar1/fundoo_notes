const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);
const data = require('./data.json');

chai.should();

describe('registartion', () => {

  it('givenRegistrationDetails_whenProper_shouldGive_201Status', (done) => {
    const registartionDetails = data.registration.correctRegister;
    chai
      .request(server)
      .post('/register')
      .send(registartionDetails)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(201);
        done();
      });
  });

  it('givenRegistrationDetails_whenDuplicateEmail_shouldGive_409Status', (done) => {
    const registartionDetails = data.registration.registerWithDuplicateEmail;
    chai
      .request(server)
      .post('/register')
      .send(registartionDetails)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(409);
        done();
      });
  });

  it('givenRegistrationDetails_whenNotHavingEmail_shouldGive_401Status', (done) => {
    const registartionDetails = data.registration.registerWithoutEmail;
    chai
      .request(server)
      .post('/register')
      .send(registartionDetails)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(401);
        done();
      });
  });

  it('givenRegistrationDetails_whenNotHavingFirstName_shouldGive_401Status', (done) => {
    const registartionDetails = data.registration.registerWithoutFirstName;
    chai
      .request(server)
      .post('/register')
      .send(registartionDetails)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(401);
        done();
      });
  });

  it('givenRegistrationDetails_whenNotHavingLastName_shouldGive_401Status', (done) => {
    const registartionDetails = data.registration.registerWithoutLastName;
    chai
      .request(server)
      .post('/register')
      .send(registartionDetails)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(401);
        done();
      });
  });

  it('givenRegistrationDetails_whenNotHavingPassword_shouldGive_401Status', (done) => {
    const registartionDetails = data.registration.registerWithoutPassword;
    chai
      .request(server)
      .post('/register')
      .send(registartionDetails)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(401);
        done();
      });
  });

});

describe('login', () => {

  it('givenLoginDetails_whenProper_shouldGive_201Status', (done) => {
    const loginDetails = data.login.correctLogin;
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
    const loginDetails = data.login.loginWithWrongEmail;
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
    const loginDetails = data.login.loginWithWrongPassword;
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
    const loginDetails = data.login.loginWithoutPassword;
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
    const loginDetails = data.login.loginWithoutEmail;
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