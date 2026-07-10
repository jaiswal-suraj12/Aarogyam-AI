import axios from "axios";

const API_URL = "http://localhost:5000/api";

const getErrorMessage = (
    error: unknown,
    fallback: string
) => {
    if (axios.isAxiosError<{ message?: string }>(error)) {
        return error.response?.data?.message || fallback;
    }

    if (error instanceof Error) {
        return error.message;
    }

    return fallback;
};

export const signupUser = async (
    username: string,
    email: string,
    password: string
) => {
    try {
        const response = await axios.post(`${API_URL}/auth/signup`, {
            username,
            email,
            password,
        });


        return response.data;


    } catch (error: unknown) {
        throw new Error(
            getErrorMessage(error, "Signup failed"),
            { cause: error }
        );
    }
};

export const loginUser = async (
    email: string,
    password: string
) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, {
            email,
            password,
        });


        return response.data;

    } catch (error: unknown) {
        throw new Error(
            getErrorMessage(error, "Login failed"),
            { cause: error }
        );
    }
};

export const updateUserProfile = async (
    userId: string,
    profile: Record<string, unknown>
) => {
    try {
        const token = localStorage.getItem("token");

        const response = await axios.put(
            `${API_URL}/users/${userId}`,
            profile,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data.user;

    } catch (error: unknown) {
        throw new Error(
            getErrorMessage(error, "Profile update failed"),
            { cause: error }
        );
    }
};
