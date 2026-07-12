// import { NavLink } from "react-router-dom";
// import {
//   Home,
//   UtensilsCrossed,
//   Dumbbell,
//   User,
//   Bot,
//   MessageCircle,
//   FileText,
//   History,
//   Camera,
// } from "lucide-react";

// import { useAppContext } from "../../context/AppContext";

// const navItems = [
//   {
//     path: "/dashboard",
//     label: "Home",
//     icon: Home,
//   },
//   {
//     path: "/food",
//     label: "Food",
//     icon: UtensilsCrossed,
//   },
//   {
//     path: "/activity",
//     label: "Activity",
//     icon: Dumbbell,
//   },
//   {
//     path: "/profile",
//     label: "Profile",
//     icon: User,
//   },
//   {
//     path: "/ai-planner",
//     label: "AI Planner",
//     icon: Bot,
//   },
//   {
//     path: "/ai-chat",
//     label: "AI Chat",
//     icon: MessageCircle,
//   },
//   {
//   path: "/weekly-report",
//   label: "Weekly AI Report",
//   icon: FileText,
// },
//   {
//     path: "/plan-history",
//     label: "Plan History",
//     icon: History,
//   },
//   {
//     path: "/food-ai",
//     label: "Food AI",
//     icon: Camera,
//   },
//   {
//     path: "/food-history",
//     label: "Food History",
//     icon: History,
//   },
// ];

// const Sidebar = () => {
//   const { user } = useAppContext();

//   const goalText =
//     user?.goal === "lose"
//       ? "🔥 Lose Weight"
//       : user?.goal === "gain"
//         ? "💪 Gain Muscle"
//         : "⚖️ Maintain";

//   return (
//     <aside className="fixed left-0 top-0 h-screen w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 shadow-lg">

//       {/* Profile Section */}
//       <div className="flex flex-col items-center py-8 border-b border-slate-200 dark:border-slate-700">
//         <h1 className="text-xl font-bold text-emerald-500">
//           Aarogyam
//         </h1>

//         <p className="text-xs text-slate-500">
//           AI Health Assistant
//         </p>

//         <img
//           src={
//             user?.profileImage ||
//             `https://ui-avatars.com/api/?name=${user?.username || "User"}&background=10b981&color=fff`
//           }
//           alt="Profile"
//           className="w-24 h-24 rounded-full object-cover border-4 border-emerald-500 shadow-md"
//         />

//         <h2 className="mt-4 text-lg font-bold text-slate-800 dark:text-white">
//           {user?.username || "Fitness User"}
//         </h2>

//         <p className="text-sm text-slate-500 dark:text-slate-400">
//           {goalText}
//         </p>

//       </div>

//       {/* Navigation */}
//       <nav className="mt-6 flex flex-col gap-2 px-3">

//         {navItems.map((item) => {
//           const Icon = item.icon;

//           return (
//             <NavLink
//               key={item.path}
//               to={item.path}
//               className={({ isActive }) =>
//                 `flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${isActive
//                   ? "bg-emerald-500 text-white shadow"
//                   : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
//                 }`
//               }
//             >
//               <Icon className="w-5 h-5" />

//               <span className="font-medium">
//                 {item.label}
//               </span>
//             </NavLink>
//           );
//         })}

//       </nav>
//     </aside>
//   );
// };

// export default Sidebar;
import { NavLink } from "react-router-dom";
import {
  Home,
  UtensilsCrossed,
  Dumbbell,
  User,
  Bot,
  MessageCircle,
  FileText,
  History,
  Camera,
  X,
} from "lucide-react";

import { useAppContext } from "../../context/AppContext";

const navItems = [
  { path: "/dashboard", label: "Home", icon: Home },
  { path: "/food", label: "Food", icon: UtensilsCrossed },
  { path: "/activity", label: "Activity", icon: Dumbbell },
  { path: "/profile", label: "Profile", icon: User },
  { path: "/ai-planner", label: "AI Planner", icon: Bot },
  { path: "/ai-chat", label: "AI Chat", icon: MessageCircle },
  { path: "/weekly-report", label: "Weekly AI Report", icon: FileText },
  { path: "/plan-history", label: "Plan History", icon: History },
  { path: "/food-ai", label: "Food AI", icon: Camera },
  { path: "/food-history", label: "Food History", icon: History },
];

interface SidebarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar = ({ open, setOpen }: SidebarProps) => {
  const { user } = useAppContext();

  const goalText =
    user?.goal === "lose"
      ? "🔥 Lose Weight"
      : user?.goal === "gain"
      ? "💪 Gain Muscle"
      : "⚖️ Maintain";

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-50
          h-screen w-64
          bg-white dark:bg-slate-900
          border-r border-slate-200 dark:border-slate-800
          shadow-lg
          transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Mobile Close Button */}
        <div className="flex justify-end p-4 lg:hidden">
          <button onClick={() => setOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Profile */}
        <div className="flex flex-col items-center py-6 border-b border-slate-200 dark:border-slate-700">

          <h1 className="text-2xl font-bold text-emerald-500">
            Aarogyam
          </h1>

          <p className="text-xs text-slate-500">
            AI Health Assistant
          </p>

          <img
            src={
              user?.profileImage ||
              `https://ui-avatars.com/api/?name=${
                user?.username || "User"
              }&background=10b981&color=fff`
            }
            alt="Profile"
            className="w-24 h-24 mt-5 rounded-full border-4 border-emerald-500 object-cover"
          />

          <h2 className="mt-4 text-lg font-bold dark:text-white">
            {user?.username}
          </h2>

          <p className="text-sm text-slate-500">
            {goalText}
          </p>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2 overflow-y-auto">

          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                    isActive
                      ? "bg-emerald-500 text-white"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`
                }
              >
                <Icon size={20} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;