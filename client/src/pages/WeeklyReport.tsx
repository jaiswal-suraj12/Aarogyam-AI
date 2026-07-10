import { useMemo, useState } from "react";
import {
  BarChart3,
  CalendarDays,
  Dumbbell,
  Flame,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";

import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { useAppContext } from "../context/AppContext";

const WeeklyReport = () => {
  const { user, allFoodLogs, allActivityLogs } = useAppContext();
  const [isGenerating, setIsGenerating] = useState(false);
  const [showReport, setShowReport] = useState(false);

  const weeklyData = useMemo(() => {
    const today = new Date();
    const sevenDaysAgo = new Date();

    sevenDaysAgo.setDate(today.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const foodThisWeek = allFoodLogs.filter((food) => {
      return new Date(food.date) >= sevenDaysAgo;
    });

    const activityThisWeek = allActivityLogs.filter((activity) => {
      return new Date(activity.date) >= sevenDaysAgo;
    });

    const totalCaloriesConsumed = foodThisWeek.reduce(
      (total, food) => total + Number(food.calories || 0),
      0
    );

    const totalCaloriesBurned = activityThisWeek.reduce(
      (total, activity) => total + Number(activity.calories || 0),
      0
    );

    const totalWorkoutMinutes = activityThisWeek.reduce(
      (total, activity) => total + Number(activity.duration || 0),
      0
    );

    const dailyGoal = user?.dailyCalorieIntake || 2000;
    const averageCalories = Math.round(totalCaloriesConsumed / 7);

    const calorieBalance = totalCaloriesConsumed - totalCaloriesBurned;

    const goalLabel =
      user?.goal === "lose"
        ? "weight loss"
        : user?.goal === "gain"
        ? "muscle gain"
        : "weight maintenance";

    return {
      foodThisWeek,
      activityThisWeek,
      totalCaloriesConsumed,
      totalCaloriesBurned,
      totalWorkoutMinutes,
      dailyGoal,
      averageCalories,
      calorieBalance,
      goalLabel,
    };
  }, [allFoodLogs, allActivityLogs, user]);

  const generateReport = async () => {
    setIsGenerating(true);

    await new Promise((resolve) => setTimeout(resolve, 1200));

    setShowReport(true);
    setIsGenerating(false);
  };

  const getPerformanceMessage = () => {
    const difference =
      weeklyData.averageCalories - weeklyData.dailyGoal;

    if (weeklyData.foodThisWeek.length === 0) {
      return "Start logging meals this week so Aarogyam AI can create a more accurate report.";
    }

    if (user?.goal === "lose") {
      if (difference <= 0) {
        return "Your average calorie intake is within or below your daily target. This supports your weight-loss goal.";
      }

      return "Your average calorie intake is above your daily target. Try reducing portion sizes or adding a short daily walk.";
    }

    if (user?.goal === "gain") {
      if (difference >= 0) {
        return "Your calorie intake supports your muscle-gain goal. Keep prioritizing protein-rich meals and strength training.";
      }

      return "Your calorie intake is below your target. Add nutrient-dense meals and protein snacks to support muscle gain.";
    }

    if (Math.abs(difference) <= 150) {
      return "Your average calorie intake is close to your daily target. You are maintaining a balanced routine.";
    }

    return "Your calorie intake is not close to your daily target. Small meal adjustments can improve consistency.";
  };

  const getWorkoutMessage = () => {
    if (weeklyData.totalWorkoutMinutes === 0) {
      return "No workouts were logged this week. Start with 20 to 30 minutes of walking, cycling, or home exercise.";
    }

    if (weeklyData.totalWorkoutMinutes >= 150) {
      return "Excellent activity level. You reached the recommended weekly movement range.";
    }

    return "You made progress this week. Add a few more short workouts to reach 150 active minutes.";
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-violet-600" />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                Weekly AI Report
              </h1>

              <p className="text-slate-500 dark:text-slate-400">
                Your personalized health and fitness summary.
              </p>
            </div>
          </div>
        </div>

        <Button onClick={generateReport} disabled={isGenerating}>
          <Sparkles className="w-5 h-5" />
          {isGenerating ? "Generating..." : "Generate AI Report"}
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-orange-100 flex items-center justify-center">
              <UtensilsCrossed className="w-5 h-5 text-orange-600" />
            </div>

            <div>
              <p className="text-sm text-slate-500">Calories Eaten</p>
              <p className="text-2xl font-bold">
                {weeklyData.totalCaloriesConsumed}
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center">
              <Flame className="w-5 h-5 text-emerald-600" />
            </div>

            <div>
              <p className="text-sm text-slate-500">Calories Burned</p>
              <p className="text-2xl font-bold">
                {weeklyData.totalCaloriesBurned}
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center">
              <Dumbbell className="w-5 h-5 text-blue-600" />
            </div>

            <div>
              <p className="text-sm text-slate-500">Workout Minutes</p>
              <p className="text-2xl font-bold">
                {weeklyData.totalWorkoutMinutes}
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-violet-100 flex items-center justify-center">
              <CalendarDays className="w-5 h-5 text-violet-600" />
            </div>

            <div>
              <p className="text-sm text-slate-500">Food Entries</p>
              <p className="text-2xl font-bold">
                {weeklyData.foodThisWeek.length}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {!showReport ? (
        <Card className="mt-6 text-center py-16">
          <BarChart3 className="w-14 h-14 text-violet-500 mx-auto" />

          <h2 className="mt-5 text-2xl font-bold">
            Your weekly report is ready to generate
          </h2>

          <p className="mt-3 max-w-xl mx-auto text-slate-500">
            Aarogyam AI will analyze your meals, calories, workouts, and
            fitness goal to create a personalized weekly report.
          </p>

          <Button className="mt-7" onClick={generateReport}>
            <Sparkles className="w-5 h-5" />
            Generate My Report
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <Card className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <Sparkles className="w-6 h-6 text-violet-500" />
              <h2 className="text-xl font-bold">Aarogyam AI Insights</h2>
            </div>

            <div className="space-y-5">
              <div className="rounded-2xl bg-violet-50 dark:bg-violet-900/20 p-5">
                <h3 className="font-semibold text-violet-800 dark:text-violet-300">
                  Nutrition Summary
                </h3>

                <p className="mt-2 leading-7 text-slate-600 dark:text-slate-300">
                  Your average daily calorie intake was{" "}
                  <span className="font-bold">
                    {weeklyData.averageCalories} kcal
                  </span>
                  . Your current daily target is{" "}
                  <span className="font-bold">
                    {weeklyData.dailyGoal} kcal
                  </span>
                  .
                </p>

                <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
                  {getPerformanceMessage()}
                </p>
              </div>

              <div className="rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 p-5">
                <h3 className="font-semibold text-emerald-800 dark:text-emerald-300">
                  Activity Summary
                </h3>

                <p className="mt-2 leading-7 text-slate-600 dark:text-slate-300">
                  You completed{" "}
                  <span className="font-bold">
                    {weeklyData.totalWorkoutMinutes} minutes
                  </span>{" "}
                  of activity and burned{" "}
                  <span className="font-bold">
                    {weeklyData.totalCaloriesBurned} kcal
                  </span>
                  .
                </p>

                <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
                  {getWorkoutMessage()}
                </p>
              </div>

              <div className="rounded-2xl bg-blue-50 dark:bg-blue-900/20 p-5">
                <h3 className="font-semibold text-blue-800 dark:text-blue-300">
                  Next Week Recommendation
                </h3>

                <p className="mt-2 leading-7 text-slate-600 dark:text-slate-300">
                  For your {weeklyData.goalLabel} goal, focus on consistent
                  meal logging, hydration, sleep, and at least three workout
                  sessions next week.
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-bold mb-5">Weekly Score</h2>

            <div className="flex justify-center">
              <div className="w-40 h-40 rounded-full border-[14px] border-emerald-500 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold">
                  {Math.min(
                    100,
                    Math.round(
                      (weeklyData.foodThisWeek.length * 8 +
                        weeklyData.totalWorkoutMinutes / 3) /
                        2
                    )
                  )}
                </span>

                <span className="text-sm text-slate-500">Health Score</span>
              </div>
            </div>

            <div className="mt-7 space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Average calories</span>
                <span className="font-semibold">
                  {weeklyData.averageCalories} kcal
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">Weekly balance</span>
                <span className="font-semibold">
                  {weeklyData.calorieBalance} kcal
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">Active minutes</span>
                <span className="font-semibold">
                  {weeklyData.totalWorkoutMinutes} min
                </span>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default WeeklyReport;