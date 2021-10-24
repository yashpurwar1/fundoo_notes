const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const faker = require('faker');

chai.use(chaiHttp);
const data = require('./data.json');

chai.should();

describe('registartion', () => {

  it('givenRegistrationDetailsWhenCorrectShouldReturn201Status', (done) => {
    const registartionDetails = data.registration.correctRegister;
    registartionDetails.email = faker.internet.email();
    
    chai
      .request(server)
      .post('/register')
      .send(registartionDetails)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(201);
        res.body.should.have.property("success").eql(true);
        res.body.should.have.property("message").eql("User Registered");
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
        res.body.should.have.property("success").eql(false);
        res.body.should.have.property("message").eql("Email already registered");
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
        res.body.should.have.property("success").eql(false);
        res.body.should.have.property("message").eql("validation failed");
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
        res.body.should.have.property("success").eql(false);
        res.body.should.have.property("message").eql("validation failed");
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
        res.body.should.have.property("success").eql(false);
        res.body.should.have.property("message").eql("validation failed");
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
        res.body.should.have.property("success").eql(false);
        res.body.should.have.property("message").eql("validation failed");
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
        res.body.should.have.property("success").eql(true);
        res.body.should.have.property("message").eql("Login Success");
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
        res.body.should.have.property("success").eql(false);
        res.body.should.have.property("message").eql("Invalid email");
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
        res.body.should.have.property("success").eql(false);
        res.body.should.have.property("message").eql("Invalid password");
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
        res.body.should.have.property("success").eql(false);
        res.body.should.have.property("message").eql("validation failed");
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
        res.body.should.have.property("success").eql(false);
        res.body.should.have.property("message").eql("validation failed");
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
        res.body.should.have.property("success").eql(true);
        res.body.should.have.property("message").eql("Mail Sent Successful");
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
        res.body.should.have.property("success").eql(false);
        res.body.should.have.property("message").eql("Invalid email");
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
        res.body.should.have.property("success").eql(false);
        res.body.should.have.property("message").eql("Unauthorized Token or token expired");
        done();
      });
  });
});