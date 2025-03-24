"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { createCourse } from "@/services/CourseService";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { CircularProgress } from "@mui/material";
import LoadingOverlay from "@/components/loading-overlay";

export default function CreateCoursePage() {
    const { register, handleSubmit, reset } = useForm();
    const router = useRouter();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState(null);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const formData = {
                title: data.title,
                price: parseFloat(data.price),
                description: data.description,
                image: data.image[0],
                owner: user?.documentId
            };

            setTimeout(async () => {
                await createCourse(formData).then(() => {
                    router.push('/courses');
                })
            }, 5000);
            console.log("Course created successfully!");
        } catch (err) {
            console.error("Failed to create course!", err);
        } finally {
            setLoading(false);
        }
    };

    const handleImagePreview = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    return (
        <div className="px-6 md:px-0 py-6">
            <LoadingOverlay isLoading={loading} text="Saving..." />
            <h2 className="text-2xl font-semibold mb-4">Create Course</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 space-x-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            {...register("title", { required: true })}
                            className="w-full p-2 border rounded mt-1"
                            placeholder="Enter course title"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Price</label>
                        <input
                            type="text"
                            {...register("price", { required: true })}
                            className="w-full p-2 border rounded mt-1"
                            placeholder="Enter course price"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        {...register("description")}
                        className="w-full p-2 border rounded mt-1"
                        placeholder="Enter course description"
                        rows="7"
                    />
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Upload Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            {...register("image")}
                            onChange={handleImagePreview}
                            className="w-full p-2 border rounded mt-1"
                        />
                    </div>

                    {preview && (
                        <div className="mt-2 flex justify-start">
                            <img src={preview} alt="Preview" className="w-auto h-40 object-cover rounded" />
                        </div>
                    )}
                </div>
                <div className="flex row justify-end gap-4 items-center mt-6 border-slate-700">
                    <button
                        type="button"
                        className="w-fit bg-white text-slate-900 py-3 px-5 rounded hover:opacity-75 border-2 border-slate-900 transition disabled:opacity-50 cursor-pointer flex self-end"
                        disabled={loading}
                        onClick={() => router.back()}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="w-fit bg-slate-900 border-2 border-slate-900 text-white py-3 px-5 rounded hover:bg-slate-700 transition disabled:opacity-50 cursor-pointer flex self-end"
                        disabled={loading}
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}
