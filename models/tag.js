import User from "./user.js";

import { Schema, Types, model } from "mongoose";

const schema = new Schema({
  tag_name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  is_active:{
    type: Boolean,
    default: true
  },
  user_id : {
    type: Types.ObjectId,
    ref: User
  }

});


const Tag = new model('Tag', schema);

export default Tag;