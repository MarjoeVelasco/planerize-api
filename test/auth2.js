process.env.NODE_ENV = 'test';

import mongoose from 'mongoose';
import chai from "chai";
import chaiHttp from "chai-http";
import app from "../index.js";
import User from "../models/user.js";

//Assertion
chai.should();
chai.use(chaiHttp);

describe('Authentication APIs22', () => { 

  before(async () => {
    await User.deleteMany({});
  });

  describe('Test POST route /v1/auth/register22', () => { 
    it('It should register a user', (done) => {
      let newUser = {
        name: "marko",
        email: "markyo@gmail.com",
        password: "1234"
      };
      chai.request(app).post("/v1/auth/register")
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').eql('User registered successfully');
          done();
      });
    });
  });

  describe('Test POST route /v1/auth/login', () => {
    it('It should login the registered user', (done) => {
      const user = {
        email: "marky@gmail.com",
        password: "1234"
      };
      chai.request(app).post('/v1/auth/login')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message').eql('User login successful');
        res.body.should.have.property('token');
        done();
      });
    });
  });

  
  after(async () => {
    // Close the database connection
    await mongoose.disconnect();
    // Exit the test process
    process.exit(0);
  });

});
