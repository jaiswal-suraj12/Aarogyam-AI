import FoodLog from "../models/FoodLog.js";

// ADD FOOD
export const addFoodLog = async (req, res) => {
 console.log("Food API called");
  console.log(req.body);
  console.log(req.userId);


try {
const { name, calories, mealType, date } = req.body;

if (!name || !calories || !mealType) {
  return res.status(400).json({
    message: "Name, calories and meal type are required",
  });
}
console.log("Creating food log...");

const foodLog = await FoodLog.create({
  user: req.userId,
  name,
  calories,
  mealType,
  date: date || new Date(),
});
console.log(foodLog);
res.status(201).json({
  message: "Food added successfully",
  foodLog,
});

} catch (error) {
res.status(500).json({
message: error.message,
});
}
};

// GET ALL FOOD LOGS FOR LOGGED-IN USER
export const getFoodLogs = async (req, res) => {
try {
const foodLogs = await FoodLog.find({
user: req.userId,
}).sort({ createdAt: -1 });

res.json(foodLogs);

} catch (error) {
res.status(500).json({
message: error.message,
});
}
};

// DELETE FOOD LOG
export const deleteFoodLog = async (req, res) => {
try {
const foodLog = await FoodLog.findOneAndDelete({
_id: req.params.id,
user: req.userId,
});

if (!foodLog) {
  return res.status(404).json({
    message: "Food log not found",
  });
}

res.json({
  message: "Food log deleted successfully",
});

} catch (error) {
res.status(500).json({
message: error.message,
});
}
};

