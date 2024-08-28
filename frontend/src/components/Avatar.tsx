


import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link } from "react-router-dom";



function logout() {
    localStorage.removeItem('token'); // Remove JWT from localStorage
    sessionStorage.removeItem('token'); // Remove JWT from sessionStorage
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // Invalidate JWT cookie
    window.location.href = '/'; // Redirect to login page
}





export default function Avatar({ name, size }: { name: any, size: 'big' | 'small' | 'large' }) {
    return <div
        className={`relative inline-flex items-center justify-center ${size === 'small' ? 'w-8 h-8' : size === 'big' ? 'w-12 h-12' : 'w-40 h-40 text-3xl'}
     overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
        <DropdownMenu>
            <DropdownMenuTrigger>
                <span className=" text-gdarkray-500  font-bold :text-gray-300">{name[0]?.toUpperCase()}</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link to={"/profile"}><DropdownMenuItem>Profile</DropdownMenuItem></Link>
                <DropdownMenuItem onClick={() => logout()}>Log Out</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
}