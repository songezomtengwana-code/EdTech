"use client";
import { useEffect, useState } from "react";
import { getCourses } from "@/services/CourseService";
import CourseCard from "@/components/course-card/Index";
import Link from "next/link";
import { Add } from "@mui/icons-material";
import CourseCardSkeleton from "@/components/course-card-skeleton/Index";

export default function CoursesPage() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await getCourses();

                if (response) {
                    setLoading(false);
                    setCourses(response?.data);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        if (courses.length === 0) fetchCourses();
    }, []);

    return (
        <div className="py-6">
            <div className="flex justify-between items-center mb-6 px-6 lg:px-0 flex-row space-y-4 md:space-y-0">
                <h1 className="text-xl font-semibold my-auto">My Courses ({courses?.length})</h1>
                <Link href="/courses/create">
                    <button className="bg-slate-900 text-white px-4 py-2 rounded-md hover:bg-slate-700 cursor-pointer">
                        <Add className="my-auto" /> Create New Course
                    </button>
                </Link>
            </div>

            {loading ?
                (
                    <CourseCardSkeleton />
                ) : courses?.length > 0 ?
                    (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 p-4">

                            {courses.map((course) => (
                                <CourseCard key={course.id} course={course} />
                            ))}
                        </div>
                    ) : (
                        <>
                            <div className="h-100 w-full grid place-content-center col-span-3">
                                <h2 className="text-slate-400 text-xl font-medium">Click create new course to add your course!</h2>
                            </div>
                        </>
                    )}
        </div>
    );
}
