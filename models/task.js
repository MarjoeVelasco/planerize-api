import { Schema, Types, model } from "mongoose";
import User from "./user.js";
import Tag from "./tag.js";

const schema = new Schema({
  task_name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    default: 'pending'
  },
  is_active:{
    type: Boolean,
    default: true
  },
  user_id : {
    type: Types.ObjectId,
    ref: User
  },
  tag_id: {
    type:Types.ObjectId,
    ref: Tag
  }

});

const Task = model('Task', schema);

export default Task;