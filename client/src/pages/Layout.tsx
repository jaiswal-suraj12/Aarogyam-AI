import { Outlet } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import Sidebar from "../components/ui/Sidebar";

const Layout = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">

      {/* Sidebar */}
      
      <Sidebar />

      {/* Main Section */}
      <div className="flex flex-col lg:flex-row">

        {/* Header */}
        <header className="h-16 flex items-center justify-end px-6 border-b bg-white dark:bg-slate-900 dark:border-slate-800">

          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {theme === "light" ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5 text-yellow-400" />
            )}
          </button>

        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default Layout;