import { Skeleton } from "@mui/material";
import moment from "moment";
import Link from "next/link";

const CourseCard = ({ course }) => {
    const imagePath = process.env.API_URL || 'http://localhost:1337' + course?.image?.url;

    return (
        <div className="max-w-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden ">
            {course?.image ? (
                <img src={imagePath} alt={course?.title} className="w-full min-h-60 max-h-60 object-cover" />
            ) : (
                <div className="w-full h-60 bg-gray-200 flex items-center justify-center text-gray-500">
                    No Image
                </div>
            )}

            <div className="p-4">
                <span className="text-gray-600 text-sm my-2">{moment(course?.publishedAt).format('MMMM Do YYYY, h:mm:ss a')}</span>
                <h2 className="text-2xl capitalize font-semibold text-gray-800">{course?.title}</h2>
                <p className="text-gray-600 text-sm mt-2 text text-ellipsis truncate">{course?.description}</p>
            </div>
            <div className="mt-auto text-end p-4 px-4">
                <span className="text-2xl font-bold text-black">R{course?.price.toFixed(2)}</span>
            </div>

            <Link href={{ pathname: `/courses/${course?.documentId}` }}>
                <div className=" border-slate-200 w-full p-3 text-gray-400 font-medium text-center hover:text-slate-900 transition duration-200">More Details</div>
            </Link>
        </div>
    );
};

export default CourseCard;
