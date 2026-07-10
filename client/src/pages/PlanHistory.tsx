import { useState } from "react";
import type { SavedPlan } from "../types/plan";

const PlanHistory = () => {
  const [plans, setPlans] = useState<SavedPlan[]>(() => {
    const saved = JSON.parse(
      localStorage.getItem("savedPlans") || "[]"
    ) as SavedPlan[];

    return saved;
  });

  const deletePlan = (id: string) => {
    const updated = plans.filter((plan) => plan.id !== id);

    setPlans(updated);

    localStorage.setItem(
      "savedPlans",
      JSON.stringify(updated)
    );
  };

  if (plans.length === 0) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold">
          Plan History
        </h1>

        <p className="mt-4 text-slate-500">
          No saved plans yet.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Plan History
      </h1>

      <div className="space-y-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="bg-white dark:bg-slate-900 border rounded-xl p-6 shadow"
          >
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-xl font-bold capitalize">
                  {plan.goal} Plan
                </h2>

                <p className="text-sm text-slate-500">
                  {new Date(plan.createdAt).toLocaleString()}
                </p>
              </div>

              <button
                onClick={() => deletePlan(plan.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>

            <pre className="whitespace-pre-wrap leading-7 text-sm">
              {plan.response}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlanHistory;
