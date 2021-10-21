const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);
const data = require('./noteData.json');

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
            done();
        });
    });
})

describe('deleteNoteById', () =>{
    it('givenvalidTokenAndNoteIdShouldReturn204Status', (done) => {
        const token = data.validToken;
        chai
          .request(server)
          .delete('/deleteNoteById/61654f51497df29d16c8b5cd')
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
            done();
        });
    });
})