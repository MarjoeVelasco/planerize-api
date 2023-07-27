import { Schema, Types, model } from "mongoose";

const schema = new Schema({
  title: {
    type: String,
    required: true
  },
  checked: {
    type:Boolean,
    default: false
  }
});

const Task = model('Task', schema);

export default Task;