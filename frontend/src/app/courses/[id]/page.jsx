"use client"
import CourseCardSkeleton from '@/components/course-card-skeleton';
import CoursePreview from '@/components/course-preview';
import { deleteCourse, getCourseById } from '@/services/CourseService';
import { ArrowBackIos, Delete, Edit } from '@mui/icons-material';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

export default function page() {
    const params = useParams();
    const router = useRouter();
    const [course, setCourse] = useState(undefined);
    const [loading, setLoading] = useState(true);
    const { id } = params

    const removeCourse = async () => {
        setLoading(true)
        await deleteCourse(id).then((response) => {
            router.push('/courses')
            toast.success('Course deleted successfully!');
        }).catch((error) => {
            console.log(error);
        }).finally(() => {
            setLoading(false);
        });
    }

    useEffect(() => {
        const fetchCourse = async (id) => {
            setLoading(true)
            try {
                const data = await getCourseById(id)
                setCourse(data?.data)
            } catch (error) {
                const { status, message } = error
                if (status === 403) {
                    router.back();
                    return toast.error(message);
                }
                toast.error(message || 'Something went wrong!');
            } finally {
                setLoading(false);
            }
        }

        if (id) fetchCourse(id);
    }, [])
    return (
        <div className='container py-6 px-6 lg:px-0'>
            <div className="flex justify-between items-center mb-6 md:flex-row gap-4">
                <h1 className="text-xl font-semibold cursor-pointer items-center" onClick={() => { router.back() }}><ArrowBackIos /> Go Back</h1>
                <div className="flex row gap-4">
                    <Link href={`/courses/${course?.documentId}/edit`}>
                        <button disabled={loading} className="bg-white border-2 border-slate-900 text-slate-900 px-4 py-2 rounded-md cursor-pointer">
                            <Edit className="my-auto" /> Edit
                        </button>
                    </Link>
                    <button disabled={loading} onClick={() => removeCourse()} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 cursor-pointer">
                        <Delete className="my-auto" />
                    </button>
                </div>
            </div>

            {course ? (<CoursePreview course={course} loading={loading} />) : (<CourseCardSkeleton count={1} />)}
        </div>

    )
}
