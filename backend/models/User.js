import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
{
username: {
type: String,
required: true,
trim: true,
},

email: {
  type: String,
  required: true,
  unique: true,
  trim: true,
  lowercase: true,
},

password: {
  type: String,
  required: true,
},

profileImage: {
  type: String,
  default: "",
},

age: {
  type: Number,
  default: 0,
},

weight: {
  type: Number,
  default: 0,
},

height: {
  type: Number,
  default: 0,
},

goal: {
  type: String,
  default: "maintain",
},

dailyCalorieIntake: {
  type: Number,
  default: 2000,
},

dailyCalorieBurn: {
  type: Number,
  default: 400,
},

onboardingCompleted: {
  type: Boolean,
  default: false,
},

},
{
timestamps: true,
}
);

const User = mongoose.model("User", userSchema);

export default User;