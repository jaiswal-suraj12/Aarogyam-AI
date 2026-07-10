import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import {
  HeartPulse,
  Bot,
  Camera,
  Activity,
  Apple,
  Dumbbell,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
} from "lucide-react";

import { useAppContext } from "../context/AppContext";

const Login = () => {
  const navigate = useNavigate();

  const {
    login,
    signup,
    user,
    onboardingCompleted,
  } = useAppContext();

  const [state, setState] =
    useState<"login" | "signup">("signup");

  const [username, setUsername] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  useEffect(() => {
    if (!user) return;

    if (!onboardingCompleted) {
      navigate("/onboarding");
    } else {
      navigate("/");
    }
  }, [user, onboardingCompleted, navigate]);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (state === "signup" && !username.trim()) {
      toast.error("Username is required");
      return;
    }

    if (!email.trim()) {
      toast.error("Email is required");
      return;
    }

    if (!password.trim()) {
      toast.error("Password is required");
      return;
    }

    if (password.length < 6) {
      toast.error(
        "Password must contain at least 6 characters."
      );
      return;
    }

    setIsSubmitting(true);

    try {
      if (state === "signup") {
        await signup({
          username,
          email,
          password,
        });

        toast.success(
          "Welcome to Aarogyam AI 🎉"
        );
      } else {
        await login({
          email,
          password,
        });

        toast.success("Welcome Back 👋");
      }
    } catch (err: unknown) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Authentication Failed"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-100 via-cyan-50 to-cyan-100 dark:from-slate-950 dark:via-slate-900 dark:to-black flex">

      {/* LEFT + CENTER SECTION */}
      <div className="hidden lg:flex w-[70%] min-h-screen items-center justify-between relative overflow-hidden pl-16 xl:pl-28 pr-10">

        {/* Background glows */}
        <div className="absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full bg-emerald-300/30 blur-3xl" />

        <div className="absolute bottom-0 left-[35%] w-[360px] h-[360px] rounded-full bg-cyan-300/25 blur-3xl" />

        {/* Floating decorative icons */}
        <div className="absolute top-20 left-[48%] animate-float-slow">
          <div className="w-14 h-14 rounded-2xl bg-white/70 backdrop-blur-md shadow-lg flex items-center justify-center">
            <HeartPulse className="w-7 h-7 text-rose-500" />
          </div>
        </div>

        <div className="absolute bottom-28 left-[52%] animate-float-reverse">
          <div className="w-14 h-14 rounded-2xl bg-white/70 backdrop-blur-md shadow-lg flex items-center justify-center">
            <Dumbbell className="w-7 h-7 text-blue-500" />
          </div>
        </div>

        <div className="absolute top-1/2 left-[62%] animate-float-slow">
          <div className="w-12 h-12 rounded-2xl bg-white/70 backdrop-blur-md shadow-lg flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-amber-500" />
          </div>
        </div>

        {/* LEFT TEXT */}
        <div className="relative z-10 max-w-md">
          <div className="w-20 h-20 rounded-3xl bg-emerald-500 flex items-center justify-center shadow-xl">
            <HeartPulse className="w-10 h-10 text-white" />
          </div>

          <p className="mt-8 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
            <Sparkles className="w-4 h-4" />
            AI-powered wellness platform
          </p>

          <h1 className="mt-5 text-5xl xl:text-6xl font-black leading-tight text-slate-900 dark:text-white">
            Aarogyam
            <span className="text-emerald-500"> AI</span>
          </h1>

          <h2 className="mt-5 text-2xl xl:text-3xl font-bold leading-snug text-slate-700 dark:text-slate-200">
            Your Personal AI Companion for a Healthier Tomorrow
          </h2>

          <p className="mt-6 text-base xl:text-lg leading-8 text-slate-500 dark:text-slate-400">
            Build healthier habits with AI-powered workout plans, nutrition tracking,
            BMI insights, calorie monitoring, and smart food recognition.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-x-7 gap-y-5">
            <div className="flex items-center gap-3 text-slate-700 dark:text-slate-200">
              <Bot className="w-5 h-5 text-emerald-500" />
              <span className="font-medium">AI Workout Plans</span>
            </div>

            <div className="flex items-center gap-3 text-slate-700 dark:text-slate-200">
              <Apple className="w-5 h-5 text-red-500" />
              <span className="font-medium">Nutrition Tracking</span>
            </div>

            <div className="flex items-center gap-3 text-slate-700 dark:text-slate-200">
              <Camera className="w-5 h-5 text-blue-500" />
              <span className="font-medium">Food Recognition</span>
            </div>

            <div className="flex items-center gap-3 text-slate-700 dark:text-slate-200">
              <Activity className="w-5 h-5 text-violet-500" />
              <span className="font-medium">BMI Analytics</span>
            </div>
          </div>
        </div>

        {/* CENTER ILLUSTRATION */}
        <div className="relative z-10 flex flex-1 items-center justify-center">
          <img
            src="/images/health.png"
            alt="Aarogyam AI health assistant illustration"
            className="w-[560px] xl:w-[680px] 2xl:w-[760px] max-w-none object-contain drop-shadow-[0_35px_80px_rgba(0,0,0,0.18)] transition-transform duration-500 hover:scale-105 animate-float"
          />
        </div>
      </div>


      {/* RIGHT SIDE */}

      <div className="w-full lg:w-[30%] flex items-center justify-center p-6">

        <div className="w-full max-w-md">

          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-slate-700 p-8">

            <div className="flex justify-center mb-6">

              <div className="w-16 h-16 rounded-2xl bg-emerald-500 flex items-center justify-center shadow-lg">

                <Sparkles className="text-white w-8 h-8" />

              </div>

            </div>

            <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white">

              {state === "login"
                ? "Welcome Back 👋"
                : "Create Account"}

            </h2>

            <p className="text-center text-slate-500 mt-2">

              {state === "login"
                ? "Sign in to continue your fitness journey."
                : "Start your healthy journey with Aarogyam AI."}

            </p>

            <form
              onSubmit={handleSubmit}
              className="space-y-5 mt-8"
            >

              {/* Username */}

              {state === "signup" && (

                <div>

                  <label className="text-sm font-medium">

                    Username

                  </label>

                  <div className="relative mt-2">

                    <User className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />

                    <input
                      value={username}
                      onChange={(e) =>
                        setUsername(e.target.value)
                      }
                      placeholder="Enter username"
                      className="w-full rounded-xl border pl-12 pr-4 py-3 dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none"
                    />

                  </div>

                </div>

              )}

              {/* Email */}

              <div>

                <label className="text-sm font-medium">

                  Email Address

                </label>

                <div className="relative mt-2">

                  <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />

                  <input
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    placeholder="example@email.com"
                    className="w-full rounded-xl border pl-12 pr-4 py-3 dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />

                </div>

              </div>

              {/* Password */}

              <div>

                <label className="text-sm font-medium">

                  Password

                </label>

                <div className="relative mt-2">

                  <Lock className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    placeholder="Enter password"
                    className="w-full rounded-xl border pl-12 pr-14 py-3 dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-4 top-3"
                  >

                    {showPassword ? (

                      <EyeOff className="w-5 h-5 text-slate-500" />

                    ) : (

                      <Eye className="w-5 h-5 text-slate-500" />

                    )}

                  </button>

                </div>

              </div>

              {/* Submit */}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 transition text-white py-3 font-semibold flex justify-center items-center gap-2 shadow-lg hover:shadow-xl"
              >

                {isSubmitting
                  ? "Please wait..."
                  : state === "login"
                    ? "Sign In"
                    : "Create Account"}

                <ArrowRight className="w-5 h-5" />

              </button>

            </form>

            {/* Divider */}

            <div className="flex items-center my-8">

              <div className="flex-1 h-px bg-slate-300 dark:bg-slate-700" />

              <span className="px-4 text-sm text-slate-400">

                OR

              </span>

              <div className="flex-1 h-px bg-slate-300 dark:bg-slate-700" />

            </div>

            {/* Switch */}

            <p className="text-center text-slate-500">

              {state === "login"
                ? "Don't have an account?"
                : "Already have an account?"}

              <button
                onClick={() =>
                  setState(
                    state === "login"
                      ? "signup"
                      : "login"
                  )
                }
                className="ml-2 font-semibold text-emerald-600 hover:text-emerald-700"
              >

                {state === "login"
                  ? "Sign Up"
                  : "Sign In"}

              </button>

            </p>

          </div>

          <p className="text-center text-sm text-slate-500 mt-6">

            © 2026 Aarogyam AI

            <br />

            Intelligent Personal Health & Fitness Assistant

          </p>

        </div>

      </div>

    </main>

  );
};

export default Login;
