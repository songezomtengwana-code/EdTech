import { Skeleton } from "@mui/material";
import moment from "moment";
import Image from "next/image";

const CoursePreview = ({ course, loading }) => {
    return (
        <div className="max-w-4xl py-2">
            {loading ? (
                <div className="space-y-4">
                    <Skeleton variant="rectangular" width="100%" height={300} className="rounded-lg" />
                    <Skeleton variant="text" width="60%" height={40} />
                    <Skeleton variant="text" width="100%" height={20} />
                    <Skeleton variant="text" width="100%" height={20} />
                    <Skeleton variant="text" width="80%" height={20} />
                    <Skeleton variant="rectangular" width="120px" height={30} className="rounded-md" />
                </div>
            ) : (
                <div className="space-y-6">
                    <div className="relative w-full h-full rounded-lg overflow-hidde">
                        {course.image ? (
                            <div className="flex items-center justify-start h-full">
                                <img
                                    src={`http://localhost:1337${course?.image?.url}`}
                                    alt={course?.title}
                                    className="h-full max-h-96 rounded"
                                />
                            </div>
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-500">
                                No Image Available
                            </div>
                        )}
                    </div>
                    <span className="text-gray-600 text-sm my-2">{moment(course?.publishedAt).format('MMMM Do YYYY, h:mm:ss a')}</span>
                    <h1 className="text-4xl font-bold capitalize">{course.title}</h1>
                    <p className="text-gray-600">{course.description}</p>

                    <div className="mt-auto text-end p-4 px-4">
                        <span className="text-4xl font-bold text-black">R{course?.price.toFixed(2)}</span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CoursePreview