const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);
const registrationData = require('./data.json');

chai.should();

describe('registartion', () => {

  it('givenRegistrationDetails_whenProper_shouldGive_201Status', (done) => {
    const registartionDetails = registrationData.registration.correctRegister;
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
    const registartionDetails = registrationData.registration.registerWithDuplicateEmail;
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
    const registartionDetails = registrationData.registration.registerWithoutEmail;
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
    const registartionDetails = registrationData.registration.registerWithoutFirstName;
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
    const registartionDetails = registrationData.registration.registerWithoutLastName;
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
    const registartionDetails = registrationData.registration.registerWithoutPassword;
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