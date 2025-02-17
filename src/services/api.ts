import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const login = async (username: string, password: string) => {
    try {
        const response = await axios.post(`${API_URL}auth/login`, { username, password });
        return response.data;
    } catch (error) {
        console.error("Login failed", error);
        throw new Error("Invalid credentials");
    }

}

export const logout = async () => {
    localStorage.removeItem("token");
}