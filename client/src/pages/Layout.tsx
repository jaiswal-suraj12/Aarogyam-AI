import { Outlet } from "react-router-dom";
import { useState } from "react";

import Sidebar from "../components/ui/Sidebar";
import Header from "../components/ui/Header";

const Layout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">

      <Sidebar
        open={open}
        setOpen={setOpen}
      />

      <div className="lg:ml-64">

        <Header
          setOpen={setOpen}
        />

        <main className="p-4 sm:p-6 lg:p-8">

          <Outlet />

        </main>

      </div>

    </div>
  );
};

export default Layout;