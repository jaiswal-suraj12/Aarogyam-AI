import {
  createContext,
  useContext,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

import {
  initialState,
  type FoodEntry,
  type ActivityEntry,
  type User,
  type Credentials,
} from "../types";

import {
  signupUser,
  loginUser,
} from "../services/api";

import { getFoodLogs } from "../services/foodService";
import { getActivityLogs } from "../services/activityService";

const AppContext = createContext(initialState);

const getSavedUser = (): User => {
  const token = localStorage.getItem("token");
  const savedUser = localStorage.getItem("user");

  if (!token || !savedUser) {
    return null;
  }

  try {
    return JSON.parse(savedUser);
  } catch {
    localStorage.removeItem("user");
    return null;
  }
};

export const AppProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const navigate = useNavigate();

  const savedUser = getSavedUser();

  const [user, setUser] = useState<User>(savedUser);

  const [isUserFetched, setIsUserFetched] =
    useState(false);

  const [
    onboardingCompleted,
    setOnboardingCompleted,
  ] = useState(
    Boolean(savedUser?.onboardingCompleted)
  );

  const [allFoodLogs, setAllFoodLogs] =
    useState<FoodEntry[]>([]);

  const [allActivityLogs, setAllActivityLogs] =
    useState<ActivityEntry[]>([]);

  // ==========================
  // Fetch Food Logs
  // ==========================

  const fetchFoodLogs = async () => {
    try {
      const data = await getFoodLogs();

      setAllFoodLogs(
        Array.isArray(data) ? data : []
      );
    } catch (error) {
      console.error(
        "Error fetching food logs:",
        error
      );

      setAllFoodLogs([]);
    }
  };

  // ==========================
  // Fetch Activity Logs
  // ==========================

  const fetchActivityLogs = async () => {
    try {
      const data = await getActivityLogs();

      setAllActivityLogs(
        Array.isArray(data) ? data : []
      );
    } catch (error) {
      console.error(
        "Error fetching activity logs:",
        error
      );

      setAllActivityLogs([]);
    }
  };

  // ==========================
  // Signup
  // ==========================

  const signup = async ({
    username,
    email,
    password,
  }: Credentials) => {
    if (!username) {
      throw new Error(
        "Username is required"
      );
    }

    const data = await signupUser(
      username,
      email,
      password
    );

    if (!data.token) {
      throw new Error(
        data.message || "Signup failed"
      );
    }

    localStorage.setItem(
      "token",
      data.token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(data.user)
    );

    setUser(data.user);

    setOnboardingCompleted(
      Boolean(
        data.user.onboardingCompleted
      )
    );

    await fetchFoodLogs();
    await fetchActivityLogs();

    return data.user;
  };

  // ==========================
  // Login
  // ==========================

  const login = async ({
    email,
    password,
  }: Credentials) => {
    const data = await loginUser(
      email,
      password
    );

    if (!data.token) {
      throw new Error(
        data.message || "Login failed"
      );
    }

    localStorage.setItem(
      "token",
      data.token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(data.user)
    );

    setUser(data.user);

    setOnboardingCompleted(
      Boolean(
        data.user.onboardingCompleted
      )
    );

    await fetchFoodLogs();
    await fetchActivityLogs();

    return data.user;
  };

  // ==========================
  // Fetch User
  // ==========================

  const fetchUser = async () => {
    try {
      const savedUser =
        localStorage.getItem("user");

      if (savedUser) {
        const parsedUser =
          JSON.parse(savedUser);

        setUser(parsedUser);

        setOnboardingCompleted(
          Boolean(
            parsedUser.onboardingCompleted
          )
        );

        await fetchFoodLogs();
        await fetchActivityLogs();
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error(
        "Error fetching user:",
        error
      );

      setUser(null);
    } finally {
      setIsUserFetched(true);
    }
  };

  // ==========================
  // Logout
  // ==========================

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);

    setOnboardingCompleted(false);

    setAllFoodLogs([]);

    setAllActivityLogs([]);

    navigate("/");
  };

  const value = {
    user,
    setUser,

    isUserFetched,

    signup,
    login,
    logout,

    fetchUser,

    onboardingCompleted,
    setOnboardingCompleted,

    allFoodLogs,
    setAllFoodLogs,

    allActivityLogs,
    setAllActivityLogs,

    fetchFoodLogs,
    fetchActivityLogs,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () =>
  useContext(AppContext);