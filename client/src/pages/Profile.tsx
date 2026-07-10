import { useAppContext } from "../context/AppContext";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";
import {
  User,
  Target,
  Scale,
  Ruler,
  Flame,
  Activity,
  Calendar,
  Mail,
} from "lucide-react";

const Profile = () => {
  const { user, logout } = useAppContext();
const navigate = useNavigate();
  const bmi =
    user?.weight &&
    user?.height &&
    user.height > 0
      ? (
          user.weight /
          ((user.height / 100) * (user.height / 100))
        ).toFixed(1)
      : "--";

  const bmiStatus =
    bmi === "--"
      ? "Unknown"
      : Number(bmi) < 18.5
      ? "Underweight"
      : Number(bmi) < 25
      ? "Normal"
      : Number(bmi) < 30
      ? "Overweight"
      : "Obese";

  const bmiColor =
    bmiStatus === "Normal"
      ? "bg-green-100 text-green-700"
      : bmiStatus === "Underweight"
      ? "bg-blue-100 text-blue-700"
      : bmiStatus === "Overweight"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-red-100 text-red-700";

  const goalText =
    user?.goal === "lose"
      ? "🔥 Lose Weight"
      : user?.goal === "gain"
      ? "💪 Gain Muscle"
      : "⚖️ Maintain Weight";

  return (
    <div className="max-w-6xl mx-auto p-6">

      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
          My Profile
        </h1>

        <p className="text-slate-500 dark:text-slate-400">
          View your fitness information
        </p>
      </div>

      {/* Profile Card */}

      <Card className="p-8 mb-8">

        <div className="flex flex-col md:flex-row items-center gap-8">
<img
    src={
        user?.profileImage ||
        "https://ui-avatars.com/api/?name=User"
    }
    className="w-36 h-36 rounded-full object-cover border-4 border-emerald-500 shadow-lg"
/>
          
          <Button
    onClick={() => navigate("/edit-profile")}
>
    Edit Profile
</Button>

          <div className="flex-1">

            <h2 className="text-3xl font-bold">
              {user?.username}
            </h2>

            <p className="flex items-center gap-2 text-slate-500 mt-2">
              <Mail size={18} />
              {user?.email}
            </p>

            <div className="flex flex-wrap gap-3 mt-5">

              <span className="px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 font-semibold">
                {goalText}
              </span>

              <span
                className={`px-4 py-2 rounded-full font-semibold ${bmiColor}`}
              >
                BMI {bmi} • {bmiStatus}
              </span>

            </div>

          </div>

        </div>

      </Card>

      {/* Stats */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <Card className="p-6">

          <div className="flex items-center gap-3">

            <Scale className="text-emerald-500" />

            <div>

              <p className="text-slate-500">
                Weight
              </p>

              <h2 className="text-3xl font-bold">
                {user?.weight ?? "--"} kg
              </h2>

            </div>

          </div>

        </Card>

        <Card className="p-6">

          <div className="flex items-center gap-3">

            <Ruler className="text-blue-500" />

            <div>

              <p className="text-slate-500">
                Height
              </p>

              <h2 className="text-3xl font-bold">
                {user?.height ?? "--"} cm
              </h2>

            </div>

          </div>

        </Card>

        <Card className="p-6">

          <div className="flex items-center gap-3">

            <Target className="text-purple-500" />

            <div>

              <p className="text-slate-500">
                Goal
              </p>

              <h2 className="font-bold">
                {goalText}
              </h2>

            </div>

          </div>

        </Card>

        <Card className="p-6">

          <div className="flex items-center gap-3">

            <Activity className="text-orange-500" />

            <div>

              <p className="text-slate-500">
                BMI
              </p>

              <h2 className="text-3xl font-bold">
                {bmi}
              </h2>

            </div>

          </div>

        </Card>

      </div>

      {/* Daily Targets */}

      <Card className="mt-8 p-6">

        <h2 className="text-xl font-bold mb-5">
          Daily Targets
        </h2>

        <div className="space-y-5">

          <div className="flex justify-between items-center">

            <div className="flex items-center gap-2">

              <Flame className="text-red-500" />

              Daily Calorie Intake

            </div>

            <span className="font-bold">
              {user?.dailyCalorieIntake} kcal
            </span>

          </div>

          <div className="flex justify-between items-center">

            <div className="flex items-center gap-2">

              <Activity className="text-emerald-500" />

              Daily Calorie Burn

            </div>

            <span className="font-bold">
              {user?.dailyCalorieBurn} kcal
            </span>

          </div>

        </div>

      </Card>

      {/* Account Information */}

      <Card className="mt-8 p-6">

        <h2 className="text-xl font-bold mb-5">
          Account Information
        </h2>

        <div className="space-y-4">

          <div className="flex justify-between">

            <span className="flex items-center gap-2">
              <User size={18} />
              Username
            </span>

            <span className="font-semibold">
              {user?.username}
            </span>

          </div>

          <div className="flex justify-between">

            <span className="flex items-center gap-2">
              <Mail size={18} />
              Email
            </span>

            <span className="font-semibold">
              {user?.email}
            </span>

          </div>

          <div className="flex justify-between">

            <span className="flex items-center gap-2">
              <Calendar size={18} />
              Member Since
            </span>

            <span className="font-semibold">
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "--"}
            </span>

          </div>

        </div>

      </Card>

      {/* Logout */}

      <div className="mt-8">

        <Button
          variant="danger"
          onClick={logout}
          className="w-full md:w-auto"
        >
          Logout
        </Button>

      </div>

    </div>
  );
};

export default Profile;