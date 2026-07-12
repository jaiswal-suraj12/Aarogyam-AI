import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { addFoodLog ,deleteFoodLog} from "../services/foodService";
import { Flame, UtensilsCrossed } from "lucide-react";

const FoodLog = () => {
  const {
    allFoodLogs,
    setAllFoodLogs,
  } = useAppContext();

  const [foodName, setFoodName] =
    useState("");

  const [calories, setCalories] =
    useState(0);

  const [mealType, setMealType] =
    useState<
      "breakfast" | "lunch" | "dinner" | "snack"
    >("breakfast");

  const totalCalories =
    allFoodLogs.reduce(
      (total, food) =>
        total + food.calories,
      0
    );

 
  const handleAddFood = async () => {
  if (!foodName.trim() || calories <= 0) return;

  try {
    const savedFood = await addFoodLog({
      name: foodName.trim(),
      calories,
      mealType,
    });

    setAllFoodLogs((prev) => [
      savedFood,
      ...prev,
    ]);

    setFoodName("");
    setCalories(0);
    setMealType("breakfast");

  } catch (error) {
    console.error(error);
  }
};
 const handleDelete = async (id: string) => {
  try {
    await deleteFoodLog(id);

    setAllFoodLogs((prev) =>
      prev.filter((food) => food._id !== id)
    );
  } catch (error) {
    console.error(error);
  }
};
  
  const capitalize = (
    value: string
  ) =>
    value.charAt(0).toUpperCase() +
    value.slice(1);

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Food Log
        </h1>

        <p className="text-slate-500 dark:text-slate-400">
          Track your daily meals and calories
        </p>
      </div>

      {/* Add Food */}
      <Card className="mb-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <UtensilsCrossed className="w-5 h-5 text-emerald-500" />
          Add Food
        </h2>

        <div className="space-y-4">
          <Input
            label="Food Name"
            value={foodName}
            onChange={(v) =>
              setFoodName(String(v))
            }
            placeholder="Oatmeal"
          />

          <Input
            label="Calories"
            type="number"
            value={calories}
            onChange={(v) =>
              setCalories(Number(v))
            }
            placeholder="250"
            min={0}
          />

          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
              Meal Type
            </label>

            <select
              value={mealType}
              onChange={(e) =>
                setMealType(
                  e.target.value as
                  | "breakfast"
                  | "lunch"
                  | "dinner"
                  | "snack"
                )
              }
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white"
            >
              <option value="breakfast">
                Breakfast
              </option>

              <option value="lunch">
                Lunch
              </option>

              <option value="dinner">
                Dinner
              </option>

              <option value="snack">
                Snack
              </option>
            </select>
          </div>

          <Button
            onClick={handleAddFood}
            className="w-full md:w-auto"
          >
            Add Food
          </Button>
        </div>
      </Card>

      {/* Summary */}
      <Card className="mb-6">
        <div className="flex items-center gap-3">
          <Flame className="text-orange-500" />

          <div>
            <h2 className="text-xl font-semibold">
              Total Calories Today
            </h2>

            <p className="text-4xl font-bold mt-2">
              {totalCalories} kcal
            </p>

            <p className="text-slate-500 text-sm mt-1">
              {allFoodLogs.length} food
              entr
              {allFoodLogs.length === 1
                ? "y"
                : "ies"}
            </p>
          </div>
        </div>
      </Card>

      {/* Food Entries */}
      <Card>
        <h2 className="text-xl font-semibold mb-4">
          Food Entries
        </h2>

        {allFoodLogs.length === 0 ? (
          <p className="text-slate-500">
            No food entries yet.
          </p>
        ) : (
          <div className="space-y-3">
            {allFoodLogs.map(
              (food) => (
                <div
                  key={food._id}
                  className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3"
                >
                  <div>
                    <h3 className="font-medium">
                      {food.name}
                    </h3>

                    <p className="text-sm text-slate-500">
                      {capitalize(
                        food.mealType
                      )}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="font-semibold">
                      {food.calories} kcal
                    </span>

                    <button
                      onClick={() =>
                        handleDelete(
                          food._id
                        )
                      }
                      className="text-red-500 hover:text-red-700 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

export default FoodLog;