import api from "./api";
import { removeToken, saveToken } from "./authService";

const API_URL = process.env.REACT_APP_API_URL;

export const login = async (username: string, password: string) => {
    try {
        const response = await api.post("auth/login", { username, password });
        saveToken(response.data.token);
        return response.data;
    } catch (error) {
        console.error("Login failed", error);
        throw new Error("Invalid credentials");
    }

}

export const logout = async () => {
    removeToken();
}