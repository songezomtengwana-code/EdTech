"use client";

import { useForm } from "react-hook-form";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { TextField, Button, Container, Typography, Box, Alert } from "@mui/material";
import Link from "next/link";
import { toast } from "react-toastify";
import LoadingOverlay from "@/components/loading-overlay/Index";

export default function LoginPage() {
    const { login, loading } = useAuth();
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [errorMessage, setErrorMessage] = useState("");

    const onSubmit = async (data) => {
        if (!data) {
            return toast.warning('All fields are required')
        }

        await login(data);
    };

    return (
        <div className="flex p-6 items-center justify-center">
            <LoadingOverlay isLoading={loading} text="Authenticating..." />
            <div className="bg-white p-6 rounded-lg shadow-lg min-w-96">
                <h2 className="text-2xl font-semibold text-center mb-4">Welcom Back!</h2>

                {errorMessage && (
                    <div className="mb-4 text-red-600 text-sm text-center">{errorMessage}</div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            {...register("email", { required: "Email is required" })}
                            className={`w-full px-4 py-2 border rounded-md ${errors.email ? "border-red-500" : "border-gray-300"
                                }`}
                            placeholder="Enter your email"
                        />
                        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            {...register("password", { required: "Password is required" })}
                            className={`w-full px-4 py-2 border rounded-md ${errors.password ? "border-red-500" : "border-gray-300"
                                }`}
                            placeholder="Enter your password"
                        />
                        {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        Login
                    </button>
                </form>

                <p className="mt-4 text-center text-sm">
                    Don't have an account?{" "}
                    <Link href="/register" className="text-blue-600 hover:underline">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}
