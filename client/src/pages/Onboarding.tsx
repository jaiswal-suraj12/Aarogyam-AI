import { useState } from "react";
import { updateUserProfile } from "../services/api";
import { useAppContext } from "../context/AppContext";
import type { ProfileFormData } from "../types";

import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

import {
ArrowLeft,
ArrowRight,
Target,
User,
ScaleIcon,
PersonStanding,
} from "lucide-react";

const Onboarding = () => {
const {
user,
setUser,
setOnboardingCompleted,
} = useAppContext();

const [step, setStep] = useState(1);
const [isSubmitting, setIsSubmitting] = useState(false);

const totalSteps = 3;

const [formData, setFormData] = useState<ProfileFormData>({
age: 0,
weight: 0,
height: 0,
goal: "maintain",
dailyCalorieIntake: 2000,
dailyCalorieBurn: 400,
});

const updateField = (
field: keyof ProfileFormData,
value: string | number
) => {
setFormData((previous) => ({
...previous,
[field]: value,
}));
};

const handleNext = async () => {
if (step < totalSteps) {
setStep((previous) => previous + 1);
return;
}


if (!user) {
  console.error("User data is missing");
  return;
}

const userId = user._id || user.id;

if (!userId) {
  console.error("User ID is missing");
  return;
}

try {
  setIsSubmitting(true);

  const updatedUser = await updateUserProfile(userId, {
    age: Number(formData.age),
    weight: Number(formData.weight),
    height: Number(formData.height),
    goal: formData.goal,
    dailyCalorieIntake: Number(formData.dailyCalorieIntake),
    dailyCalorieBurn: Number(formData.dailyCalorieBurn),
    onboardingCompleted: true,
  });

  setUser(updatedUser);
  setOnboardingCompleted(true);
} catch (error) {
  console.error("Failed to complete onboarding:", error);
} finally {
  setIsSubmitting(false);
}


};

const handleBack = () => {
setStep((previous) => Math.max(previous - 1, 1));
};

return ( <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
{/* Header */} <div className="p-6 pt-12"> <div className="flex items-center gap-3"> <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center"> <PersonStanding className="w-6 h-6 text-white" /> </div>


      <div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
          Aarogyam AI
        </h1>

        <p className="text-sm text-slate-500 dark:text-slate-400">
          An Intelligent Personal Health & Fitness Assistant
        </p>

        <p className="text-slate-500 dark:text-slate-400">
          Let's personalize your experience
        </p>
      </div>
    </div>
  </div>

  {/* Progress */}
  <div className="px-6 mb-8">
    <div className="flex gap-2">
      {[1, 2, 3].map((currentStep) => (
        <div
          key={currentStep}
          className={`h-2 flex-1 rounded-full transition-all duration-300 ${
            currentStep <= step
              ? "bg-emerald-500"
              : "bg-slate-200 dark:bg-slate-800"
          }`}
        />
      ))}
    </div>

    <p className="text-sm text-slate-500 mt-3">
      Step {step} of {totalSteps}
    </p>
  </div>

  {/* Content */}
  <div className="flex-1 px-6">
    {step === 1 && (
      <div>
        <div className="flex items-center gap-4 mb-8">
          <div className="size-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center">
            <User className="size-6 text-emerald-600" />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
              How old are you?
            </h2>

            <p className="text-slate-500">
              This helps us calculate your needs.
            </p>
          </div>
        </div>

        <Input
          label="Age"
          type="number"
          value={formData.age}
          onChange={(value) => updateField("age", Number(value))}
          placeholder="Enter your age"
          min={13}
          max={120}
          required
        />
      </div>
    )}

    {step === 2 && (
      <div>
        <div className="flex items-center gap-4 mb-8">
          <div className="size-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center">
            <ScaleIcon className="size-6 text-emerald-600" />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
              Your Measurements
            </h2>

            <p className="text-slate-500">
              Helps us track your progress.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <Input
            label="Weight (kg)"
            type="number"
            value={formData.weight}
            onChange={(value) =>
              updateField("weight", Number(value))
            }
            placeholder="Enter your weight"
            min={20}
            max={300}
            required
          />

          <Input
            label="Height (cm)"
            type="number"
            value={formData.height}
            onChange={(value) =>
              updateField("height", Number(value))
            }
            placeholder="Enter your height"
            min={100}
            max={250}
            required
          />
        </div>
      </div>
    )}

    {step === 3 && (
      <div>
        <div className="flex items-center gap-4 mb-8">
          <div className="size-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center">
            <Target className="size-6 text-emerald-600" />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
              What's your goal?
            </h2>

            <p className="text-slate-500">
              We'll tailor your experience.
            </p>
          </div>
        </div>

        <div className="grid gap-3">
          {[
            { value: "lose", label: "🔥 Lose Weight" },
            { value: "maintain", label: "⚖️ Maintain Weight" },
            { value: "gain", label: "💪 Gain Muscle" },
          ].map((goal) => (
            <button
              key={goal.value}
              type="button"
              onClick={() =>
                updateField(
                  "goal",
                  goal.value as "lose" | "maintain" | "gain"
                )
              }
              className={`p-4 rounded-xl border text-left transition-all ${
                formData.goal === goal.value
                  ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
                  : "border-slate-200 dark:border-slate-700"
              }`}
            >
              {goal.label}
            </button>
          ))}
        </div>
      </div>
    )}
  </div>

  {/* Navigation */}
  <div className="p-6">
    <div className="flex gap-3 justify-end">
      {step > 1 && (
        <Button
          variant="secondary"
          onClick={handleBack}
          disabled={isSubmitting}
        >
          <ArrowLeft size={18} />
          Back
        </Button>
      )}

      <Button onClick={handleNext} disabled={isSubmitting}>
        {isSubmitting
          ? "Saving..."
          : step === totalSteps
          ? "Get Started"
          : "Continue"}

        {!isSubmitting && <ArrowRight size={18} />}
      </Button>
    </div>
  </div>
</div>


);
};

export default Onboarding;
