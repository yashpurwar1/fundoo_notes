const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);
const data = require('./labelData.json');

chai.should();

const delToken = {
  token:""
}

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
            res.body.should.have.property("success").eql(true);
            res.body.should.have.property("message").eql("Label created successfully");
            delToken.token = res.body.data._id;
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
            res.body.should.have.property("success").eql(false);
            res.body.should.have.property("message").eql("validation failed");
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
            res.body.should.have.property("success").eql(false);
            res.body.should.have.property("message").eql("Unauthorized Token or token expired");
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
            res.body.should.have.property("success").eql(true);
            res.body.should.have.property("message").eql("Fetched successfully");
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
            res.body.should.have.property("success").eql(false);
            res.body.should.have.property("message").eql("Unauthorized Token or token expired");
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
            res.body.should.have.property("success").eql(true);
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
            res.body.should.have.property("success").eql(false);
            res.body.should.have.property("message").eql("Unauthorized Token or token expired");
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
            res.body.should.have.property("success").eql(false);
            res.body.should.have.property("message").eql("Incorrect LabelId");
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
            res.body.should.have.property("success").eql(true);
            res.body.should.have.property("message").eql("Updated successfully");
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
            res.body.should.have.property("success").eql(false);
            res.body.should.have.property("message").eql("Unauthorized Token or token expired");
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
            res.body.should.have.property("success").eql(false);
            res.body.should.have.property("message").eql("Label not updated");
            done();
        });
    });
})

describe('deleteLabelById', () =>{
    it('givenvalidTokenAndLabelIdShouldReturn204Status', (done) => {
        const token = data.validToken;


        chai
          .request(server)
          .delete(`/deleteLabelById/${delToken.token}`)
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
            res.body.should.have.property("success").eql(false);
            res.body.should.have.property("message").eql("Unauthorized Token or token expired");
            done();
        });
    });
})