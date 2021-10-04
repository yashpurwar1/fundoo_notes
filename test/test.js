const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);
const data = require('./data.json');

chai.should();

describe('registartion', () => {

  it('givenRegistrationDetailsWhenCorrectShouldReturn201Status', (done) => {
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

  it('givenRegistrationDetailsWhenDuplicateShouldReturn409Status', (done) => {
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

  it('givenRegistrationDetailsWhenNotHavingEmailShouldReturn401Status', (done) => {
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

  it('givenRegistrationDetailsWhenNotHavingFirstNameShouldReturn401Status', (done) => {
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

  it('givenRegistrationDetailsWhenNotHavingLastNameShouldReturn401Status', (done) => {
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

  it('givenRegistrationDetailsWhenNotHavingPasswordShouldReturn401Status', (done) => {
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

  it('givenLoginDetailsWhenProperShouldReturn201Status', (done) => {
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

  it('givenLoginDetailsWhenWrongEmailShouldReturn401Status', (done) => {
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

  it('givenLoginDetailsWhenWrongPasswordShouldReturn401Status', (done) => {
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

  it('givenLoginDetailsWhenWithoutPasswordShouldReturn401Status', (done) => {
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

  it('givenLoginDetailsWhenWithoutEmailShouldReturn401Status', (done) => {
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