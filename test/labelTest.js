const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);
const data = require('./labelData.json');

chai.should();

describe('createLabel', () => {
    it('givenValidTokenAndValidLabelShouldReturn201Status', (done) => {
        const token = data.validToken;
        const label = data.labels.validLabel;
        chai
          .request(server)
          .post('/createLabel')
          .set({ authorization: token })
          .send(label)
          .end((error, res) => {
            if(error){
              return done(error);
            }
            res.should.have.status(201);
            done();
        });
    });
    
    it('givenValidTokenAndInvalidLabelShouldReturn422Status', (done) => {
        const token = data.validToken;
        const label = data.labels.inValidLabel;
        chai
          .request(server)
          .post('/createLabel')
          .set({ authorization: token })
          .send(label)
          .end((error, res) => {
            if(error){
              return done(error);
            }
            res.should.have.status(422);
            done();
        });
    });

    it('givenInvalidTokenAndValidLabelShouldReturn401Status', (done) => {
        const token = data.invalidToken;
        const label = data.labels.validLabel;
        chai
          .request(server)
          .post('/createLabel')
          .set({ authorization: token })
          .send(label)
          .end((error, res) => {
            if(error){
              return done(error);
            }
            res.should.have.status(401);
            done();
        });
    });
})

describe('getLabel', ()=>{
    it('givenValidTokenShouldReturn200Status', (done) => {
        const token = data.validToken;
        chai
          .request(server)
          .get('/getLabel')
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
          .get('/getLabel')
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

describe('getLabelById',()=>{
    it('givenvalidTokenAndLabelIdShouldReturn200Status', (done) => {
        const token = data.validToken;
        chai
          .request(server)
          .get('/getLabelById/616d464fea49e4ebd713f878')
          .set({ authorization: token })
          .end((error, res) => {
            if(error){
              return done(error);
            }
            res.should.have.status(200);
            done();
        });
    });

    it('giveninvalidTokenAndLabelIdShouldReturn401Status', (done) => {
        const token = data.invalidToken;
        chai
          .request(server)
          .get('/getLabelById/6159541990ba032e79cf82eb')
          .set({ authorization: token })
          .end((error, res) => {
            if(error){
              return done(error);
            }
            res.should.have.status(401);
            done();
        });
    });

    it('givenvalidTokenAndInvalidLabelIdShouldReturn400Status', (done) => {
        const token = data.validToken;
        chai
          .request(server)
          .get('/getLabelById/6159541990ba032e79cf82eb')
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

describe('updateLabelById',()=>{
    it('givenValidTokenAndLabelIdShouldReturn200Status', (done) => {
        const token = data.validToken;
        const label = data.labels.updatedLabel
        chai
          .request(server)
          .put('/updateLabelById/616d464fea49e4ebd713f878')
          .set({ authorization: token })
          .send(label)
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
        const label = data.labels.updatedLabel
        chai
          .request(server)
          .put('/updateLabelById/616d464fea49e4ebd713f878')
          .set({ authorization: token })
          .send(label)
          .end((error, res) => {
            if(error){
              return done(error);
            }
            res.should.have.status(401);
            done();
        });
    });

    it('givenvalidTokenAndInvalidLabelIdShouldReturn400Status', (done) => {
        const token = data.validToken;
        const label = data.labels.updatedLabel
        chai
          .request(server)
          .put('/updateLabelById/6159541990ba032e7982eb')
          .set({ authorization: token })
          .send(label)
          .end((error, res) => {
            if(error){
              return done(error);
            }
            res.should.have.status(400);
            done();
        });
    });
})

describe('deleteLabelById', () =>{
    it('givenvalidTokenAndLabelIdShouldReturn204Status', (done) => {
        const token = data.validToken;
        chai
          .request(server)
          .delete('/deleteLabelById/616810f2d7e989948a4c767a')
          .set({ authorization: token })
          .end((error, res) => {
            if(error){
              return done(error);
            }
            res.should.have.status(204);
            done();
        });
    });

    it('givenInvalidTokenAndLabelIdShouldReturn401Status', (done) => {
        const token = data.invalidToken;
        chai
          .request(server)
          .delete('/deleteLabelById/616810f2d7e989948a4c767a')
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