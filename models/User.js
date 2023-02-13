import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: { type: String, min: 5 },
  email: { type: String, unique: true },
  phonenumber: { type: Number, unique: true },
  password: { type: String, required: true },
});

export default mongoose.model("User", userSchema);
