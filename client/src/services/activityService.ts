import axios from "axios";

const API_URL = "http://localhost:5000/api/activity";

const getToken = () => localStorage.getItem("token");

export const addActivityLog = async (activity: {
  name: string;
  duration: number;
  calories: number;
}) => {
  const res = await axios.post(API_URL, activity, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return res.data.activityLog;
};

export const getActivityLogs = async () => {
  const res = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return res.data;
};

export const deleteActivityLog = async (id: string) => {
  await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};