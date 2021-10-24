const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);
const data = require('./noteData.json');

const delIds = {
  noteId:""
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
            delIds.noteId = res.body.data._id;
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

describe('add Label to NoteId', () =>{
  it('givenvalidToken_NoteId_labelId_ShouldReturn200Status', (done) => {
      const token = data.validToken;
      chai
        .request(server)
        .post(`/addLabel/${delIds.noteId}/616d499fc22b29d2186fa43c`)
        .set({ authorization: token })
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

  it('givenInvalidToken_NoteId_labelId_ShouldReturn401Status', (done) => {
    const token = data.invalidToken;
    chai
      .request(server)
      .post(`/addLabel/${delIds.noteId}/616d499fc22b29d2186fa43c`)
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

  it('givenvalidToken_InvalidNoteId_labelId_ShouldReturn400Status', (done) => {
    const token = data.validToken;
    chai
      .request(server)
      .post(`/addLabel/616d499fc22b29d/616d499fc22b29d2186fa43c`)
      .set({ authorization: token })
      .end((error, res) => {
        if(error){
          return done(error);
        }
        res.should.have.status(400);
        res.body.should.have.property("success").eql(false);
        res.body.should.have.property("message").eql("Label not updated");
        done();
    });
  });

  it('givenvalidToken_NoteId_InvalidLabelId_ShouldReturn400Status', (done) => {
    const token = data.validToken;
    chai
      .request(server)
      .post(`/addLabel/${delIds.noteId}/616d499fc22b29d21`)
      .set({ authorization: token })
      .end((error, res) => {
        if(error){
          return done(error);
        }
        res.should.have.status(400);
        res.body.should.have.property("success").eql(false);
        res.body.should.have.property("message").eql("Label not updated");
        done();
    });
  });
});


describe('delete Label to NoteId', () =>{
  it('givenvalidToken_NoteId_labelId_ShouldReturn201Status', (done) => {
      const token = data.validToken;
      chai
        .request(server)
        .post(`/deleteLabel/${delIds.noteId}/616d499fc22b29d2186fa43c`)
        .set({ authorization: token })
        .end((error, res) => {
          if(error){
            return done(error);
          }
          res.should.have.status(201);
          res.body.should.have.property("success").eql(true);
          res.body.should.have.property("message").eql("Label deleted");
          done();
      });
  });

  it('givenInvalidToken_NoteId_labelId_ShouldReturn401Status', (done) => {
    const token = data.invalidToken;
    chai
      .request(server)
      .post(`/deleteLabel/${delIds.noteId}/616d499fc22b29d2186fa43c`)
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

  it('givenvalidToken_InvalidNoteId_labelId_ShouldReturn400Status', (done) => {
    const token = data.validToken;
    chai
      .request(server)
      .post(`/deleteLabel/616d499fc22b29d/616d499fc22b29d2186fa43c`)
      .set({ authorization: token })
      .end((error, res) => {
        if(error){
          return done(error);
        }
        res.should.have.status(400);
        res.body.should.have.property("success").eql(false);
        res.body.should.have.property("message").eql("Label not deletes");
        done();
    });
  });

  it('givenvalidToken_NoteId_InvalidLabelId_ShouldReturn400Status', (done) => {
    const token = data.validToken;
    chai
      .request(server)
      .post(`/deleteLabel/${delIds.noteId}/616d499fc22b29d21`)
      .set({ authorization: token })
      .end((error, res) => {
        if(error){
          return done(error);
        }
        res.should.have.status(400);
        res.body.should.have.property("success").eql(false);
        res.body.should.have.property("message").eql("Label not deletes");
        done();
    });
  });
});


describe('deleteNoteById', () =>{
    it('givenvalidTokenAndNoteIdShouldReturn204Status', (done) => {
        const token = data.validToken;
        chai
          .request(server)
          .delete(`/deleteNoteById/${delIds.noteId}`)
          .set({ authorization: token })
          .end((error, res) => {
            if(error){
              return done(error);
            }
            res.should.have.status(204);
            done();
        });
    });

    it('givenValidTokenAndInvalidNoteIdShouldReturn400Status', (done) => {
      const token = data.validToken;
      chai
        .request(server)
        .delete('/deleteNoteById/61654f51497df29d16c8b')
        .set({ authorization: token })
        .end((error, res) => {
          if(error){
            return done(error);
          }
          res.should.have.status(400);
          res.body.should.have.property("success").eql(false);
          res.body.should.have.property("message").eql("Not able to find the note");
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