import { useAppContext } from "../context/AppContext";
import Card from "../components/ui/Card";
import ProgressBar from "../components/ui/ProgressBar";

import {
  Flame,
  Target,
  Dumbbell,
  TrendingUp,
  Activity,
  HeartPulse,
  Salad,
} from "lucide-react";

const Dashboard = () => {
  const {
    user,
    allFoodLogs,
    allActivityLogs,
  } = useAppContext();

  const caloriesConsumed = allFoodLogs.reduce(
    (sum, item) => sum + item.calories,
    0
  );

  const caloriesBurned = allActivityLogs.reduce(
    (sum, item) => sum + item.calories,
    0
  );

  const calorieGoal =
    user?.dailyCalorieIntake || 2000;

  const caloriesRemaining = Math.max(
    calorieGoal - caloriesConsumed,
    0
  );

  const progress = Math.min(
    (caloriesConsumed / calorieGoal) * 100,
    100
  );

  const bmi =
    user?.weight &&
    user?.height &&
    user.height > 0
      ? (
          user.weight /
          Math.pow(user.height / 100, 2)
        ).toFixed(1)
      : "--";

  const bmiStatus =
    bmi === "--"
      ? "--"
      : Number(bmi) < 18.5
      ? "Underweight"
      : Number(bmi) < 25
      ? "Normal"
      : Number(bmi) < 30
      ? "Overweight"
      : "Obese";

  const aiInsight = () => {
    if (bmi === "--")
      return "Complete your profile to receive AI insights.";

    if (Number(bmi) < 18.5)
      return "Your BMI is low. Increase protein intake and strength training.";

    if (Number(bmi) < 25)
      return "Excellent! Your BMI is in the healthy range. Keep it up.";

    if (Number(bmi) < 30)
      return "Try increasing cardio and reducing sugary foods.";

    return "Focus on a calorie deficit, walking daily and eating more vegetables.";
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">

      {/* Header */}

<div className="flex items-center justify-between">

  <div className="flex items-center gap-4">
<img
    src={
        user?.profileImage ||
        "https://ui-avatars.com/api/?name=User"
    }
    className="w-16 h-16 rounded-full object-cover border-2 border-emerald-500"
/>
    

    <div>
      <h1 className="text-3xl font-bold">
        Welcome, {user?.username} 👋
      </h1>

      <p className="text-slate-500">
        Let's achieve your fitness goals today.
      </p>
    </div>

  </div>

</div>

      {/* Stats */}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

        <Card className="p-5">
          <div className="flex justify-between">
            <div>
              <p className="text-slate-500">
                BMI
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {bmi}
              </h2>

              <span
                className={`inline-block mt-3 px-3 py-1 rounded-full text-sm font-semibold ${
                  bmiStatus === "Normal"
                    ? "bg-green-100 text-green-700"
                    : bmiStatus === "Underweight"
                    ? "bg-blue-100 text-blue-700"
                    : bmiStatus === "Overweight"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {bmiStatus}
              </span>
            </div>

            <HeartPulse className="w-10 h-10 text-red-500" />
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex justify-between">
            <div>
              <p className="text-slate-500">
                Calories
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {caloriesConsumed}
              </h2>
            </div>

            <Flame className="w-10 h-10 text-orange-500" />
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex justify-between">
            <div>
              <p className="text-slate-500">
                Burned
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {caloriesBurned}
              </h2>
            </div>

            <Dumbbell className="w-10 h-10 text-blue-500" />
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex justify-between">
            <div>
              <p className="text-slate-500">
                Remaining
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {caloriesRemaining}
              </h2>
            </div>

            <TrendingUp className="w-10 h-10 text-green-500" />
          </div>
        </Card>

      </div>

      {/* Progress */}

      <Card className="p-6">

        <div className="flex justify-between mb-4">

          <h2 className="text-xl font-semibold">
            Daily Progress
          </h2>

          <span className="font-bold">
            {progress.toFixed(0)}%
          </span>

        </div>

        <ProgressBar
          value={caloriesConsumed}
          max={calorieGoal}
        />

        <p className="text-slate-500 mt-4">
          Goal: {calorieGoal} kcal
        </p>

      </Card>

      {/* Food & Activity */}

      <div className="grid lg:grid-cols-2 gap-6">

        <Card className="p-5">

          <div className="flex items-center gap-2 mb-5">
            <Salad className="text-green-500" />
            <h2 className="font-bold text-xl">
              Today's Meals
            </h2>
          </div>

          {allFoodLogs.length === 0 ? (
            <p>No meals added.</p>
          ) : (
            allFoodLogs.slice(-5).reverse().map((food) => (
              <div
                key={food.id}
                className="flex justify-between border-b py-3"
              >
                <div>

                  <p className="font-semibold">
                    {food.name}
                  </p>

                  <small className="text-slate-500 capitalize">
                    {food.mealType}
                  </small>

                </div>

                <strong>
                  {food.calories} kcal
                </strong>

              </div>
            ))
          )}

        </Card>

        <Card className="p-5">

          <div className="flex items-center gap-2 mb-5">
            <Activity className="text-blue-500" />
            <h2 className="font-bold text-xl">
              Today's Activities
            </h2>
          </div>

          {allActivityLogs.length === 0 ? (
            <p>No activity logged.</p>
          ) : (
            allActivityLogs
              .slice(-5)
              .reverse()
              .map((activity) => (
                <div
                  key={activity.id}
                  className="flex justify-between border-b py-3"
                >
                  <div>

                    <p className="font-semibold">
                      {activity.name}
                    </p>

                    <small className="text-slate-500">
                      {activity.duration} min
                    </small>

                  </div>

                  <strong>
                    {activity.calories} kcal
                  </strong>

                </div>
              ))
          )}

        </Card>

      </div>

      {/* AI Insight */}

      <Card className="p-6 bg-gradient-to-r from-emerald-500 to-green-600 text-white">

        <div className="flex items-center gap-3 mb-3">

          <Target className="w-8 h-8" />

          <h2 className="text-2xl font-bold">
            AI Health Insight
          </h2>

        </div>

        <p className="text-lg">
          {aiInsight()}
        </p>

      </Card>

    </div>
  );
};

export default Dashboard;