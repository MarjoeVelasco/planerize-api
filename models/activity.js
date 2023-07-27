import User from "./user.js";
import { Schema, Types, model } from "mongoose";

const schema = new Schema({
  commenter: {
    type: Types.ObjectId,
    ref: User,
    required: true
  },
  content: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Activity = new model('Activity', schema);

export default Activity;