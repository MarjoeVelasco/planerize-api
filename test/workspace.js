process.env.NODE_ENV = 'test';

import mongoose from 'mongoose';
import chai from "chai";
import chaiHttp from "chai-http";
import app from "../index.js";
import Workspace from '../models/workspace.js';

chai.should();
chai.use(chaiHttp);


describe('Workspace APIs', () => {
  

});