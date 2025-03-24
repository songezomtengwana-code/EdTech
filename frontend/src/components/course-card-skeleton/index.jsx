import Skeleton from "@mui/material/Skeleton";

const CourseCardSkeleton = ({ count = 4 }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
            {Array.from({ length: count }).map((_, index) => (
                <div key={index} className="p-4 rounded-lg bg-white space-y-4">
                    <Skeleton variant="rectangular" width="100%" height={220} className="rounded" />
                    <Skeleton variant="text" width="60%" height={15} className="mb-4" />
                    <Skeleton variant="text" width="80%" height={40} className="mt-4" />
                    <Skeleton variant="text" width="100%" height={20} />
                    <Skeleton variant="text" width="100%" height={20} />
                    <Skeleton variant="text" width="75%" height={20} />
                    <div className="flex justify-between items-center w-full mt-4">
                        <Skeleton variant="rectangular" width="20%" height={40} />
                        <Skeleton variant="text" width="20%" height={20} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CourseCardSkeleton;
