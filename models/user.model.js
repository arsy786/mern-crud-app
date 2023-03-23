import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: true,
      },
      password: {
        type: String,
        required: true,
      }},
{
    versionKey: false
});

const User = mongoose.model("User", userSchema);

export default User;