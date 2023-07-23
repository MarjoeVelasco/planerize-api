process.env.NODE_ENV = 'test';

import mongoose from 'mongoose';
import chai from "chai";
import chaiHttp from "chai-http";
import app from "../index.js";
import User from "../models/user.js";

//assertions
chai.should();
chai.use(chaiHttp);

describe('Authentication APIs', () => { 

  before(async () => {
    await User.deleteMany({});
  });

  describe('Test POST route /v1/auth/register', () => { 
    //test registration 200
    it('It should register a user', (done) => {
      let newUser = {
        name: "mark",
        email: "marky@gmail.com",
        password: "1234"
      };
      chai.request(app).post("/v1/auth/register")
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').eql('User registered successfully');
          res.body.should.have.property('token');
          done();
      });
    });
    //test duplicate email
    it('It should decline registration and show email exists', (done) => {
      let newUser = {
        name: "mark",
        email: "marky@gmail.com",
        password: "1234"
      };
      chai.request(app).post("/v1/auth/register")
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(409);
          res.body.should.have.property('message').eql('Email already exists');
          done();
      });
    });
  });


  describe('Test POST route /v1/auth/login', () => {
    //test user login
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
    //test incorrect email
    it('It should show incorrect email or password (error 404) ', (done) => {
      const user = {
        email: "marky55@gmail.com",
        password: "1234"
      };
      chai.request(app).post('/v1/auth/login')
      .send(user)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('message').eql('Incorrect email or password');
        done();
      });
    });
    //test incorrect password
    it('It should show incorrect email or password (error 410) ', (done) => {
      const user = {
        email: "marky@gmail.com",
        password: "1234kaka"
      };
      chai.request(app).post('/v1/auth/login')
      .send(user)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('message').eql('Incorrect email or password');
        done();
      });
    });

  });
  
  after(async () => {
    await mongoose.disconnect();
    process.exit(0);
  });

});
