import User from "./user.js";
import { Schema, Types, model } from "mongoose";

const schema = new Schema({
  title: {
    type: String,
    required: true
  },
  user_id: {
    type: Types.ObjectId,
    ref: User,
    required: true,
  },
  members: [{
    type: Types.ObjectId,
    ref: User,
}],
}, { timestamps: true });

const Workspace = model('Workspace', schema);
export default Workspace;
