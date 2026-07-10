import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Layout from "./pages/Layout";
import Onboarding from "./pages/Onboarding";

import Dashboard from "./pages/Dashboard";
import WeeklyReport from "./pages/WeeklyReport";
import FoodLog from "./pages/FoodLog";
import ActivityLog from "./pages/ActivityLog";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Login from "./pages/Login";


import { useAppContext } from "./context/AppContext";

import AIPlanner from "./pages/AIPlanner";
import AIChat from "./pages/AIChat";
import PlanHistory from "./pages/PlanHistory";
import FoodAI from "./pages/FoodAI";
import FoodHistory from "./pages/FoodHistory"
const App = () => {
  const {
    user,
    isUserFetched,
    onboardingCompleted,
  } = useAppContext();
  console.log("app user information ", user);


  if (!isUserFetched) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }
console.log({ 
  user,
  onboardingCompleted,
  isUserFetched,
});
  if (!user) {
    return (
      <>
        <Toaster position="top-right" />
        <Login />
      </>
    );
  }

  if (!onboardingCompleted) {
    return (
      <>
        <Toaster />
        <Onboarding />
      </>
    );
  }

  return (
    <>
      <Toaster />
<Routes>
  {/* Pages that use Sidebar + Layout */}
  <Route path="/" element={<Layout />}>
    <Route index element={<Dashboard />} />

    <Route path="weekly-report" element={<WeeklyReport />} />

    <Route path="food" element={<FoodLog />} />

    <Route path="activity" element={<ActivityLog />} />

    <Route path="profile" element={<Profile />} />

    <Route path="ai-planner" element={<AIPlanner />} />

    <Route path="ai-chat" element={<AIChat />} />

    <Route path="plan-history" element={<PlanHistory />} />

    <Route path="food-ai" element={<FoodAI />} />

    <Route path="food-history" element={<FoodHistory />} />
  </Route>

  {/* Page without Sidebar */}
  <Route path="/edit-profile" element={<EditProfile />} />

  {/* Redirect unknown pages */}
  <Route path="*" element={<Navigate to="/" replace />} />
</Routes>
      
    </>
  );
};

export default App;