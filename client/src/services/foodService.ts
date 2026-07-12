import axios from "axios";
const API_URL="http://localhost:5000/api/food";
const getToken =()=> localStorage.getItem("token");

export const addFoodLog = async (food: {
  name: string;
  calories: number;
  mealType: string;
}) => {
  const res = await axios.post(API_URL, food, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return res.data.foodLog;
};

export const getFoodLogs = async () => {
  const res = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return res.data;
};

export const deleteFoodLog = async (id: string) => {
  await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};