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

  it('givenRegistrationDetailsWhenDuplicateShouldReturn400Status', (done) => {
    const registartionDetails = data.registration.registerWithDuplicateEmail;
    chai
      .request(server)
      .post('/register')
      .send(registartionDetails)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(400);
        done();
      });
  });

  it('givenRegistrationDetailsWhenNotHavingEmailShouldReturn422Status', (done) => {
    const registartionDetails = data.registration.registerWithoutEmail;
    chai
      .request(server)
      .post('/register')
      .send(registartionDetails)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(422);
        done();
      });
  });

  it('givenRegistrationDetailsWhenNotHavingFirstNameShouldReturn422Status', (done) => {
    const registartionDetails = data.registration.registerWithoutFirstName;
    chai
      .request(server)
      .post('/register')
      .send(registartionDetails)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(422);
        done();
      });
  });

  it('givenRegistrationDetailsWhenNotHavingLastNameShouldReturn422Status', (done) => {
    const registartionDetails = data.registration.registerWithoutLastName;
    chai
      .request(server)
      .post('/register')
      .send(registartionDetails)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(422);
        done();
      });
  });

  it('givenRegistrationDetailsWhenNotHavingPasswordShouldReturn422Status', (done) => {
    const registartionDetails = data.registration.registerWithoutPassword;
    chai
      .request(server)
      .post('/register')
      .send(registartionDetails)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(422);
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

  it('givenLoginDetailsWhenWrongEmailShouldReturn400Status', (done) => {
    const loginDetails = data.login.loginWithWrongEmail;
    chai
      .request(server)
      .post('/login')
      .send(loginDetails)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(400);
        done();
      });
  });

  it('givenLoginDetailsWhenWrongPasswordShouldReturn400Status', (done) => {
    const loginDetails = data.login.loginWithWrongPassword;
    chai
      .request(server)
      .post('/login')
      .send(loginDetails)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(400);
        done();
      });
  });

  it('givenLoginDetailsWhenWithoutPasswordShouldReturn422Status', (done) => {
    const loginDetails = data.login.loginWithoutPassword;
    chai
      .request(server)
      .post('/login')
      .send(loginDetails)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(422);
        done();
      });
  });

  it('givenLoginDetailsWhenWithoutEmailShouldReturn422Status', (done) => {
    const loginDetails = data.login.loginWithoutEmail;
    chai
      .request(server)
      .post('/login')
      .send(loginDetails)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(422);
        done();
      });
  });
});

describe ('forgotPassword', () =>{

  it('givenForgotPasswordEmailWhenValidShouldReturn250Status', (done) => {
    const email = data.forgotPassword.ValidEmail;
    chai
      .request(server)
      .post('/forgotPassword')
      .send(email)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(250);
        done();
      });
  });

  it('givenForgotPasswordEmailWhenInvalidShouldReturn400Status', (done) => {
    const email = data.forgotPassword.InvalidEmail;
    chai
      .request(server)
      .post('/forgotPassword')
      .send(email)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(400);
        done();
      });
  });

})

describe('resetPassword', ()=>{
  it('givenResetPasswordTokenWhenValidShouldReturn204Status', (done) => {
    const token = data.resetPassword.validToken;
    const newPassword = data.resetPassword.validPassword;
    chai
      .request(server)
      .put('/resetPassword')
      .set({ authorization: token })
      .send(newPassword)
      .end((error, res) => {
        if(error){
          return done(error);
        }
        res.should.have.status(204);
        done();
      });
  });

  it('givenResetPasswordTokenWhenInvalidShouldReturn401Status', (done) => {
    const token = data.resetPassword.invalidToken;
    const newPassword = data.resetPassword.validPassword;
    chai
      .request(server)
      .put('/resetPassword')
      .set({ authorization: token })
      .send(newPassword)
      .end((error, res) => {
        if(error){
          return done(error);
        }
        res.should.have.status(401);
        done();
      });
  });
});