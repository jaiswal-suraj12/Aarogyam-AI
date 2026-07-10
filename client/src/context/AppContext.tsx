/* eslint-disable react-refresh/only-export-components */
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
} from "../types/index.ts";

import { signupUser, loginUser } from "../services/api";

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
const [isUserFetched] = useState(true);
const [onboardingCompleted, setOnboardingCompleted] =
useState(Boolean(savedUser?.onboardingCompleted));

const [allFoodLogs, setAllFoodLogs] = useState<FoodEntry[]>([]);
const [allActivityLogs, setAllActivityLogs] = useState<
ActivityEntry[]

> ([]);

const signup = async ({
username,
email,
password,
}: Credentials) => {
if (!username) {
  throw new Error("Username is required");
}

const data = await signupUser(username, email, password);


if (!data.token) {
  throw new Error(data.message || "Signup failed");
}

localStorage.setItem("token", data.token);
localStorage.setItem("user", JSON.stringify(data.user));

setUser(data.user);
setOnboardingCompleted(data.user.onboardingCompleted);

return data.user;


};

const login = async ({
email,
password,
}: Credentials) => {
const data = await loginUser(email, password);


if (!data.token) {
  throw new Error(data.message || "Login failed");
}

localStorage.setItem("token", data.token);
localStorage.setItem("user", JSON.stringify(data.user));

setUser(data.user);
setOnboardingCompleted(data.user.onboardingCompleted);

return data.user;


};


const fetchUser = async () => {
const savedUser = localStorage.getItem("user");


if (savedUser) {
  const parsedUser = JSON.parse(savedUser);

  setUser(parsedUser);
  setOnboardingCompleted(
    Boolean(parsedUser.onboardingCompleted)
  );
}

};

/*
These remain empty until Food and Activity APIs
are connected to MongoDB.
*/
const fetchFoodLogs = async () => {
setAllFoodLogs([]);
};

const fetchActivityLogs = async () => {
setAllActivityLogs([]);
};

const logout = () => {
localStorage.removeItem("token");
localStorage.removeItem("user");


setUser(null);
setOnboardingCompleted(false);

navigate("/");


};

const value = {
user,
setUser,
isUserFetched,
fetchUser,


signup,
login,
logout,

onboardingCompleted,
setOnboardingCompleted,

allFoodLogs,
allActivityLogs,

setAllFoodLogs,
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

export const useAppContext = () => useContext(AppContext);
