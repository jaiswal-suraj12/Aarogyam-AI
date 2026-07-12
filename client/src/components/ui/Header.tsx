// import { Menu, Moon, Sun } from "lucide-react";
// import { useTheme } from "../../context/ThemeContext";

// interface Props {
//   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
// }

// const Header = ({ setOpen }: Props) => {

//   const { theme, toggleTheme } = useTheme();

//   return (

//     <header
//       className="
//       sticky top-0 z-40
//       h-16
//       bg-white
//       dark:bg-slate-900
//       border-b
//       dark:border-slate-800

//       flex
//       items-center
//       justify-between

//       px-4
//       lg:px-6
//     "
//     >

//       {/* Mobile Menu */}

//       <button
//         onClick={() => setOpen(true)}
//         className="lg:hidden"
//       >
//         <Menu className="w-6 h-6" />
//       </button>

//       <div></div>

//       {/* Theme */}

//       <button

//         onClick={toggleTheme}

//         className="
//         p-2
//         rounded-lg
//         border
//         border-slate-300
//         dark:border-slate-700

//         hover:bg-slate-100
//         dark:hover:bg-slate-800
//       "

//       >

//         {theme === "light" ? (

//           <Moon className="w-5 h-5" />

//         ) : (

//           <Sun className="w-5 h-5 text-yellow-400" />

//         )}

//       </button>

//     </header>

//   );

// };

// export default Header;
import { Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

interface HeaderProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({ setOpen }: HeaderProps) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 h-16 bg-white dark:bg-slate-900 border-b dark:border-slate-800 flex items-center justify-between px-4 lg:px-8">

      {/* Mobile Menu */}
      <button
        className="lg:hidden"
        onClick={() => setOpen(true)}
      >
        <Menu className="w-6 h-6" />
      </button>

      <h2 className="hidden sm:block text-xl font-semibold text-slate-800 dark:text-white">
        Aarogyam AI
      </h2>

      {/* Theme */}
      <button
        onClick={toggleTheme}
        className="p-2 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
      >
        {theme === "light" ? (
          <Moon className="w-5 h-5" />
        ) : (
          <Sun className="w-5 h-5 text-yellow-400" />
        )}
      </button>

    </header>
  );
};

export default Header;