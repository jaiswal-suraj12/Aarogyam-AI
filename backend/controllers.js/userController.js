import User from "../models/User.js";

// GET LOGGED-IN USER
export const getMyProfile = async (req, res) => {
try {
const user = await User.findById(req.userId).select("-password");

if (!user) {
  return res.status(404).json({
    message: "User not found",
  });
}

res.json({ user });

} catch (error) {
res.status(500).json({
message: error.message,
});
}
};

// UPDATE USER PROFILE / ONBOARDING
export const updateUserProfile = async (req, res) => {
try {
const userId = req.params.id;

const updatedUser = await User.findByIdAndUpdate(
  userId,
  {
    username: req.body.username,
    profileImage: req.body.profileImage,
    age: req.body.age,
    weight: req.body.weight,
    height: req.body.height,
    goal: req.body.goal,
    dailyCalorieIntake: req.body.dailyCalorieIntake,
    dailyCalorieBurn: req.body.dailyCalorieBurn,
    onboardingCompleted: req.body.onboardingCompleted,
  },
  {
    returnDocument: "after",
    runValidators: true,
  }
).select("-password");

if (!updatedUser) {
  return res.status(404).json({
    message: "User not found",
  });
}

res.json({
  message: "Profile updated successfully",
  user: updatedUser,
});

} catch (error) {
res.status(500).json({
message: error.message,
});
}
};

