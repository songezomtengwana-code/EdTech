"use client"
import { useAuth } from "@/context/AuthContext";
import { Logout } from "@mui/icons-material";
import Link from "next/link";

export default function AuthenticatedLayout({ children }) {
    const { user, loading, logout } = useAuth();

    if (loading) return (<></>);

    return user ? (
        <>
            <div className="flex mx-auto w-full fixed top-0 left-0 right-0 bg-[#f5f5f5] shadow z-50">
                <div className="container m-auto py-6 px-6 lg:px-0 flex row justify-between items-center">
                    <Link href={'/courses'}>
                        <h1 className="font-semibold text-black text-md lg:text-xl">
                            EdTech Course Manager
                        </h1>
                    </Link>
                    <div className="flex flex-row items-center space-x-4 ">
                        <p className="hidden lg:block">{user?.username || ""}</p>
                        <img src={`https://ui-avatars.com/api/?name=${user?.username}?background=random`} alt={user?.username} className="h-12 rounded-full overflow-hidden hidden lg:block" />
                        <button onClick={logout} className="rounded-full h-full text-white px-4 py-2 cursor-pointer">
                            <Logout className="my-auto" sx={{ color: 'red' }} />
                        </button>
                    </div>
                </div>
            </div>

            <main className="container mx-auto pt-24 overflow-x-hidden">
                {children}
            </main>
        </>
    ) : (
        <main className="container mx-auto pt-24 overflow-x-hidden">{children}</main>
    );
}