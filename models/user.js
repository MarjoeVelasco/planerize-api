import {Schema, model} from "mongoose";
import bcrypt from "bcrypt";

//create user schema
const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value);
      },
      message: 'Please enter a valid email address',
    },
  },
  password: {
    type: String,
    required: true,
  }
});


//hash password before saving
schema.pre('save', async function (next) {
  try {
    //check if password is modified
    if(!this.isModified('password')) {
      return next();
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    //replace plain text password with hashed
    this.password = hashedPassword;
    return next();
  } catch (error) {
    return next(error);
  }
});

const User = model('User',schema);

export default User;