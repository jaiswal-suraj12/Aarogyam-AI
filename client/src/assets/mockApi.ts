import {
  dummyUser,
  dummyFoodLogs,
  dummyActivityLogs,
} from "../assets/assets";

import type {
  UserData,
  FoodEntry,
  ActivityEntry,
  FormData,
  User,
} from "../types";

interface DB {
  user: User;
  foodLogs: FoodEntry[];
  activityLogs: ActivityEntry[];
}

interface AuthCredentials {
  identifier?: string;
  username?: string;
  email: string;
  password: string;
}

const getDB = (): DB => {
  const dbStr = localStorage.getItem("fitness_db");

  if (!dbStr) {
    return {
      user: null,
      foodLogs: [],
      activityLogs: [],
    };
  }

  return JSON.parse(dbStr);
};

const saveDB = (db: DB) => {
  localStorage.setItem("fitness_db", JSON.stringify(db));
};

const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const mockApi = {
  auth: {
    login: async (credentials: AuthCredentials) => {
      await delay(500);

      const db = getDB();

      if (!db.user) {
        const username = (
          credentials.identifier ||
          credentials.email
        ).split("@")[0];

        db.user = {
          ...dummyUser,
          username,
          email:
            credentials.identifier ||
            credentials.email,

          profileImage: `https://ui-avatars.com/api/?name=${encodeURIComponent(
            username
          )}&background=10b981&color=ffffff&size=200`,
        };

        db.foodLogs = [...dummyFoodLogs];
        db.activityLogs = [...dummyActivityLogs];

        saveDB(db);
      }

      return {
        data: {
          user: db.user,
          jwt: "mock_jwt_token_" + Date.now(),
        },
      };
    },

    register: async (credentials: AuthCredentials) => {
      await delay(500);

      const db = getDB();
      const username =
        credentials.username ||
        credentials.email.split("@")[0];

      db.user = {
        id: "user_" + Date.now(),

        username,

        email: credentials.email,

        profileImage: `https://ui-avatars.com/api/?name=${encodeURIComponent(
          username
        )}&background=10b981&color=ffffff&size=200`,

        age: 0,
        weight: 0,
        height: 0,

        goal: "maintain",

        dailyCalorieIntake: 2000,

        dailyCalorieBurn: 400,

        createdAt: new Date().toISOString(),
      };

      db.foodLogs = [];
      db.activityLogs = [];

      saveDB(db);

      return {
        data: {
          user: db.user,
          jwt: "mock_jwt_token_" + Date.now(),
        },
      };
    },
  },

  user: {
    me: async () => {
      await delay(300);

      const db = getDB();

      return {
        data: {
          user: db.user || dummyUser,
          jwt: localStorage.getItem("token") || "",
        },
      };
    },

    update: async (
      _id: string,
      updates: Partial<UserData>
    ) => {
      await delay(300);

      const db = getDB();

      if (db.user) {
        db.user = {
          ...db.user,
          ...updates,
        };

        saveDB(db);
      }

      return {
        data: db.user,
      };
    },
  },

  foodLogs: {
    list: async () => {
      await delay(300);

      const db = getDB();

      return {
        data: db.foodLogs,
      };
    },

    create: async (payload: { data: FormData }) => {
      await delay(300);

      const db = getDB();

      const newEntry: FoodEntry = {
        id: Date.now(),

        documentId: "doc_food_" + Date.now(),

        name: payload.data.name,

        calories: payload.data.calories,

        mealType: payload.data.mealType as FoodEntry["mealType"],

        date: new Date()
          .toISOString()
          .split("T")[0],

        createdAt: new Date().toISOString(),
      };

      db.foodLogs.push(newEntry);

      saveDB(db);

      return {
        data: newEntry,
      };
    },

    delete: async (documentId: string) => {
      await delay(300);

      const db = getDB();

      db.foodLogs = db.foodLogs.filter(
        (food) => food.documentId !== documentId
      );

      saveDB(db);

      return {
        data: {
          id: documentId,
        },
      };
    },
  },

  activityLogs: {
    list: async () => {
      await delay(300);

      const db = getDB();

      return {
        data: db.activityLogs,
      };
    },

    create: async (payload: {
      data: {
        name: string;
        duration: number;
        calories: number;
      };
    }) => {
      await delay(300);

      const db = getDB();

      const newEntry: ActivityEntry = {
        id: Date.now(),

        documentId: "doc_act_" + Date.now(),

        name: payload.data.name,

        duration: payload.data.duration,

        calories: payload.data.calories,

        date: new Date()
          .toISOString()
          .split("T")[0],

        createdAt: new Date().toISOString(),
      };

      db.activityLogs.push(newEntry);

      saveDB(db);

      return {
        data: newEntry,
      };
    },

    delete: async (documentId: string) => {
      await delay(300);

      const db = getDB();

      db.activityLogs = db.activityLogs.filter(
        (activity) =>
          activity.documentId !== documentId
      );

      saveDB(db);

      return {
        data: {
          id: documentId,
        },
      };
    },
  },

  imageAnalysis: {
    analyze: async (formData: FormData) => {
      void formData;
      await delay(1500);

      const foods = [
        {
          name: "Apple",
          calories: 95,
        },
        {
          name: "Banana",
          calories: 105,
        },
        {
          name: "Avocado Toast",
          calories: 250,
        },
        {
          name: "Pizza Slice",
          calories: 300,
        },
      ];

      const randomFood =
        foods[Math.floor(Math.random() * foods.length)];

      return {
        data: {
          result: randomFood,
        },
      };
    },
  },
};

export default mockApi;
