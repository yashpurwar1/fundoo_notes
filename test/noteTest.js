const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);
const data = require('./noteData.json');

const delToken = {
  token:""
}
chai.should();

describe('createNote', () => {
    it('givenValidTokenAndValiNoteShouldReturn201Status', (done) => {
        const token = data.validToken;
        const note = data.notes.validNote;
        chai
          .request(server)
          .post('/createNote')
          .set({ authorization: token })
          .send(note)
          .end((error, res) => {
            if(error){
              return done(error);
            }
            res.should.have.status(201);
            res.body.should.have.property("success").eql(true);
            res.body.should.have.property("message").eql("Note created successfully");
            delToken.token = res.body.data._id;
            done();
        });
    });
    
    it('givenValidTokenAndInvaliNoteShouldReturn422Status', (done) => {
        const token = data.validToken;
        const note = data.notes.inValidNote;
        chai
          .request(server)
          .post('/createNote')
          .set({ authorization: token })
          .send(note)
          .end((error, res) => {
            if(error){
              return done(error);
            }
            res.should.have.status(422);
            res.body.should.have.property("success").eql(false);
            res.body.should.have.property("message").eql("validation failed");
            done();
        });
    });

    it('givenInvalidTokenAndValiNoteShouldReturn401Status', (done) => {
        const token = data.invalidToken;
        const note = data.notes.validNote;
        chai
          .request(server)
          .post('/createNote')
          .set({ authorization: token })
          .send(note)
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
})

describe('getNote', ()=>{
    it('givenvalidTokenAndShouldReturn200Status', (done) => {
        const token = data.validToken;
        chai
          .request(server)
          .get('/getNote')
          .set({ authorization: token })
          .end((error, res) => {
            if(error){
              return done(error);
            }
            res.should.have.status(200);
            res.body.should.have.property("success").eql(true);
            res.body.should.have.property("message").eql("Fetched successfully");
            done();
        });
    });

    it('giveninvalidTokenShouldReturn401Status', (done) => {
        const token = data.invalidToken;
        chai
          .request(server)
          .get('/getNote')
          .set({ authorization: token })
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
})

describe('getNoteById',()=>{
    it('givenvalidTokenAndNoteIdShouldReturn200Status', (done) => {
        const token = data.validToken;
        chai
          .request(server)
          .get('/getNoteById/61654f6e497df29d16c8b5d4')
          .set({ authorization: token })
          .end((error, res) => {
            if(error){
              return done(error);
            }
            res.should.have.status(200);
            res.body.should.have.property("success").eql(true);
            done();
        });
    });

    it('giveninvalidTokenAndNoteIdShouldReturn401Status', (done) => {
        const token = data.invalidToken;
        chai
          .request(server)
          .get('/getNoteById/61654f6e497df29d16c8b5d4')
          .set({ authorization: token })
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

    it('givenvalidTokenAndInvalidNoteIdShouldReturn400Status', (done) => {
        const token = data.validToken;
        chai
          .request(server)
          .get('/getNoteById/61654f6e497df29d16c8b5')
          .set({ authorization: token })
          .end((error, res) => {
            if(error){
              return done(error);
            }
            res.should.have.status(400);
            res.body.should.have.property("success").eql(false);
            res.body.should.have.property("message").eql("Incorrect noteId");
            done();
        });
    });
})

describe('updateNoteById',()=>{
    it('givenValidTokenAndNoteIdShouldReturn201Status', (done) => {
        const token = data.validToken;
        const note = data.notes.updatedNote
        chai
          .request(server)
          .put('/updateNoteById/61654f6f497df29d16c8b5d6')
          .set({ authorization: token })
          .send(note)
          .end((error, res) => {
            if(error){
              return done(error);
            }
            res.should.have.status(200);
            res.body.should.have.property("success").eql(true);
            res.body.should.have.property("message").eql("Updated successfully");
            done();
        });
    });

    it('givenInvalidTokenAndNoteIdShouldReturn401Status', (done) => {
        const token = data.invalidToken;
        const note = data.notes.updatedNote
        chai
          .request(server)
          .put('/updateNoteById/61654f6e497df29d16c8b5d4')
          .set({ authorization: token })
          .send(note)
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

    it('givenvalidTokenAndInvalidNoteIdShouldReturn400Status', (done) => {
        const token = data.validToken;
        const note = data.notes.updatedNote
        chai
          .request(server)
          .put('/updateNoteById/61654f6e497df29d16c8b5')
          .set({ authorization: token })
          .send(note)
          .end((error, res) => {
            if(error){
              return done(error);
            }
            res.should.have.status(400);
            res.body.should.have.property("success").eql(false);
            res.body.should.have.property("message").eql("Note not updated");
            done();
        });
    });
})

describe('deleteNoteById', () =>{
    it('givenvalidTokenAndNoteIdShouldReturn204Status', (done) => {
        const token = data.validToken;
        chai
          .request(server)
          .delete(`/deleteNoteById/${delToken.token}`)
          .set({ authorization: token })
          .end((error, res) => {
            if(error){
              return done(error);
            }
            res.should.have.status(204);
            done();
        });
    });

    it('givenInvalidTokenAndNoteIdShouldReturn401Status', (done) => {
        const token = data.invalidToken;
        chai
          .request(server)
          .delete('/deleteNoteById/61654f51497df29d16c8b5cd')
          .set({ authorization: token })
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
})