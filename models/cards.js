import Activity from "./activity.js";
import Task from "./task.js";
import { Schema, Types, model } from "mongoose";

const schema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  status: {
    type: String,
    default: "to do"
  },
  task: [{
    type: Types.ObjectId,
    ref: Task,
  }],
  activity: [{
    type: Types.ObjectId,
    ref: Activity,
  }],
  delete: {
    type:Boolean,
    default: false
  }

}, { timestamps: true });

const Card = new model('Card', schema);

export default Card;