import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// SIGNUP
export const signup = async (req, res) => {
try {
const { username, email, password } = req.body;

if (!username || !email || !password) {
  return res.status(400).json({
    message: "Username, email and password are required",
  });
}

const existingUser = await User.findOne({ email });

if (existingUser) {
  return res.status(400).json({
    message: "Email already registered",
  });
}

const hashedPassword = await bcrypt.hash(password, 10);

const user = await User.create({
  username,
  email,
  password: hashedPassword,
  profileImage: `https://ui-avatars.com/api/?name=${username}&background=10b981&color=ffffff&size=200`,
});

const token = jwt.sign(
  { userId: user._id },
  process.env.JWT_SECRET || "mysecretkey",
  { expiresIn: "7d" }
);

res.status(201).json({
  message: "Account created successfully",
  user,
  token,
});

} catch (error) {
res.status(500).json({
message: error.message,
});
}
};

// LOGIN
export const login = async (req, res) => {
try {
const { email, password } = req.body;

if (!email || !password) {
  return res.status(400).json({
    message: "Email and password are required",
  });
}

const user = await User.findOne({ email });

if (!user) {
  return res.status(400).json({
    message: "User not found",
  });
}

const isPasswordCorrect = await bcrypt.compare(
  password,
  user.password
);

if (!isPasswordCorrect) {
  return res.status(400).json({
    message: "Incorrect password",
  });
}

const token = jwt.sign(
  { userId: user._id },
  process.env.JWT_SECRET || "mysecretkey",
  { expiresIn: "7d" }
);

res.json({
  message: "Login successful",
  user,
  token,
});

} catch (error) {
res.status(500).json({
message: error.message,
});
}
};

