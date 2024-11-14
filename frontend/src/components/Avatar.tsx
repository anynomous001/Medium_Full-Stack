


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
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = '/';
}


export default function Avatar({ name, size }: { name: any, size: 'big' | 'small' | 'large' }) {
    return <div
        className={`relative   items-center justify-center flex-shrink-0 inline-flex w-8 h-8  md:w-12 md:h-12 ${size === 'small' ? 'w-8 h-8' : size === 'big' ? 'w-12 h-12' : 'w-48 h-48 text-3xl'}
     overflow-hidden bg-slate-700 rounded-full dark:bg-gray-600`}>
        <DropdownMenu>
            <DropdownMenuTrigger>
                <span className=" text-gray-100    font-bold :text-gray-300">{name[0]?.toUpperCase()}</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link to={"/blogs"}><DropdownMenuItem>Home</DropdownMenuItem></Link>
                <Link to={"/profile"}><DropdownMenuItem>Profile</DropdownMenuItem></Link>
                <DropdownMenuItem onClick={() => logout()}>Log Out</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
}