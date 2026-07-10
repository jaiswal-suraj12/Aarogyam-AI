import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import type { ActivityEntry } from "../types";

const ActivityLog = () => {
  const {
    allActivityLogs,
    setAllActivityLogs,
  } = useAppContext();

  const [activityName, setActivityName] =
    useState("");

  const [duration, setDuration] =
    useState(0);

  const [calories, setCalories] =
    useState(0);

  const totalCaloriesBurned =
    allActivityLogs.reduce(
      (total, activity) =>
        total + activity.calories,
      0
    );

  const handleAddActivity = () => {
    if (
      !activityName.trim() ||
      duration <= 0 ||
      calories <= 0
    )
      return;

    const newActivity: ActivityEntry = {
      id: Date.now(),
      name: activityName,
      duration,
      calories,
      date: new Date().toISOString(),
      documentId: Date.now().toString(),
    };

    setAllActivityLogs((prev) => [
      newActivity,
      ...prev,
    ]);

    setActivityName("");
    setDuration(0);
    setCalories(0);
  };

  const handleDelete = (id: number | string) => {
    setAllActivityLogs((prev) =>
      prev.filter(
        (activity) => activity.id !== id
      )
    );
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Activity Log
        </h1>

        <p className="text-slate-500">
          Track workouts and calories burned
        </p>
      </div>

      {/* Add Activity */}

      <Card className="p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">
          Add Activity
        </h2>

        <div className="space-y-4">
          <Input
            label="Activity Name"
            value={activityName}
            onChange={(v) =>
              setActivityName(String(v))
            }
            placeholder="Running"
          />

          <Input
            label="Duration (minutes)"
            type="number"
            value={duration}
            onChange={(v) =>
              setDuration(Number(v))
            }
            placeholder="30"
          />

          <Input
            label="Calories Burned"
            type="number"
            value={calories}
            onChange={(v) =>
              setCalories(Number(v))
            }
            placeholder="300"
          />

          <Button onClick={handleAddActivity}>
            Add Activity
          </Button>
        </div>
      </Card>

      {/* Summary */}

      <Card className="p-6 mb-6">
        <h2 className="text-xl font-semibold">
          Calories Burned Today
        </h2>

        <p className="text-4xl font-bold mt-2">
          {totalCaloriesBurned} kcal
        </p>
      </Card>

      {/* Activities */}

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">
          Activity Entries
        </h2>

        {allActivityLogs.length === 0 ? (
          <p className="text-slate-500">
            No activity entries yet.
          </p>
        ) : (
          <div className="space-y-4">
            {allActivityLogs.map(
              (activity) => (
                <div
                  key={activity.id}
                  className="flex justify-between items-center border-b pb-3"
                >
                  <div>
                    <h3 className="font-medium">
                      {activity.name}
                    </h3>

                    <p className="text-sm text-slate-500">
                      {activity.duration} min
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="font-semibold">
                      {activity.calories} kcal
                    </span>

                    <button
                      onClick={() =>
                        handleDelete(
                          activity.id
                        )
                      }
                      className="text-red-500 hover:text-red-700"
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

export default ActivityLog;
