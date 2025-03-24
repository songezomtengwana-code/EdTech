"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { API_URL } from "@/utils/config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    /**
     * Effect to check authentication token on mount
     * if token exists, fetch user data, otherwise redirect to login to reauthenticate themselves
     */
    useEffect(() => {
        const token = Cookies.get("token");
        if (token) {
            fetchUser(token);
        } else {
            router.push('/login');
        }
    }, []);

    /**
     * Fetches user details using the token in Cookies
     * redirects to courses page if successful, otherwise logs out
     * 
     * @param {string} token - stored token
     */
    const fetchUser = async (token) => {
        setLoading(true);
        try {
            const res = await axios.get(`${API_URL}/users/me`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUser(res.data);
            router.push('/courses');
        } catch (error) {
            console.error("Failed to fetch user:", error);
            logout();
        } finally {
            setLoading(false);
        }
    };

    /**
     * Handles user login
     * Stores authentication token in cookies on success and redirects to courses page
     * 
     * @param {Object} credentials - User credentials
     */
    const login = async ({ email, password }) => {
        setLoading(true);
        try {
            const res = await axios.post(`${API_URL}/auth/local`, {
                identifier: email,
                password,
            });

            const { jwt, user } = res.data;
            router.push("/courses");
            Cookies.set("token", jwt, { expires: 7 });
            setUser(user);
        } catch (error) {
            console.error("Login error:", error);
            toast.error('Authorization failed');
        } finally {
            setLoading(false);
        }
    };

    /**
     * Handles user registration
     * Stores authentication token in cookies on success and redirects to courses page
     * 
     * @param {Object} credentials - User credentials
     */
    const signup = async ({ username, email, password }) => {
        if (!username || !email || !password) return toast.error('Please fill all required fields');

        setLoading(true);
        try {
            const res = await axios.post(`${API_URL}/auth/local/register`, {
                username,
                email,
                password,
            });

            const { jwt, user } = res.data;
            Cookies.set("token", jwt, { expires: 7 });
            setUser(user);
            router.push("/courses");
        } catch (error) {
            toast.error(error?.response?.data?.error?.message || "Something went wrong please try again");
        } finally {
            setLoading(false);
        }
    };

    /**
     * Logs out the user
     * Removes authentication token and resets user state
     * Redirects to login page
     */
    const logout = () => {
        router.push("/login");
        Cookies.remove("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
