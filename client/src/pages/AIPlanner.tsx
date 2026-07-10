import { useState } from "react";
import toast from "react-hot-toast";

import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

import { useAppContext } from "../context/AppContext";
import { generateAIPlan } from "../services/aiService";

import type { SavedPlan } from "../types/plan";

const AIPlanner = () => {
  const { user } = useAppContext();

  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const generatePlan = async () => {
    if (!user) {
      toast.error("User not found.");
      return;
    }

    setLoading(true);
    setResponse("Generating AI plan...");

    try {
      const prompt = `
Create a detailed fitness plan.

User Details:
Age: ${user.age}
Height: ${user.height} cm
Weight: ${user.weight} kg
Goal: ${user.goal}

Include:
1. Workout Plan
2. Diet Plan
3. Daily Calories
4. Fitness Tips
`;

      const result = await generateAIPlan(prompt);

      if (!result.success) {
        toast.error("Failed to generate AI plan.");
        setResponse("Failed to generate plan.");
        return;
      }

      setResponse(result.response);

      const savedPlan: SavedPlan = {
        id: crypto.randomUUID(),
        goal: user.goal || "maintain",
        response: result.response,
        createdAt: new Date().toISOString(),
      };

      let existing: SavedPlan[] = [];

      try {
        existing = JSON.parse(
          localStorage.getItem("savedPlans") || "[]"
        );
      } catch {
        existing = [];
      }

      existing.unshift(savedPlan);

      localStorage.setItem(
        "savedPlans",
        JSON.stringify(existing)
      );
console.log("savedPlans =", localStorage.getItem("savedPlans"));
      
      toast.success("AI Plan generated and saved!");
    } catch (error) {
      console.error(error);
      toast.error("Server Error");
      setResponse("Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-2">
        AI Fitness Planner
      </h1>

      <p className="text-slate-500 mb-6">
        Generate your personalized AI fitness plan.
      </p>

      <Button
        onClick={generatePlan}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate AI Plan"}
      </Button>

      {response && (
        <Card className="mt-6 p-5 whitespace-pre-wrap">
          {response}
        </Card>
      )}
    </div>
  );
};

export default AIPlanner;
