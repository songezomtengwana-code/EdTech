import { CircularProgress } from "@mui/material";

const LoadingOverlay = ({ isLoading, text = "Loading..." }) => {
    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white/50 z-50">
            <div className="flex flex-col items-center">
                <CircularProgress sx={{ color: '#000' }} />
                <p className="mt-3 text-slate-900 text-sm">{text}</p>
            </div>
        </div>
    );
};

export default LoadingOverlay;