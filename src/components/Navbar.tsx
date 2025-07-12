"use client"
import Image from 'next/image'
import React from 'react';
import Link from 'next/link';
import { useSession,signOut } from 'next-auth/react';
import {User} from 'next-auth';
import { Button } from './ui/button';

const Navbar = ()=>{

    const {data:session}= useSession();
    const user:User = session?.user as User;

    return (
        <div className="flex justify-between items-center p-2  fixed top-0 w-full ">
            <div className="flex items-center  justify-between space-x-3">
                <a href="#" className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-gray-400">
                        <Image src="/images/icognito.svg" alt="Image" width={40} height={40} className="font-semibold"/>
                    </span>
                    <span className="text-2xl font-bold text-gray-800">
                        Icognito messaging
                    </span>
                </a>
            </div>
            <div className=" top-[64px] z-30 border-b border-gray-200 bg-white/80 px-6 py-2 backdrop-blur-sm backdrop-saturate-200 dark:bg-black/50 text-black  rounded-r-3xl shadow-sm rounded-l-3xl ">
                <ul className="space-x-6 text-xl m-1 font-semibold">
                    <li className="inline-block ">
                        <Link href="/">Home</Link>
                    </li>
                    <li className="inline-block ">
                        <Link href="/about">About</Link>
                    </li>
                    <li className="inline-block ">
                        <Link href="/contact">Contact</Link>
                    </li>
                </ul>
            </div>
                {
                    session?(
                    <div>
                        <span>Welcome, {user?.username}</span>
                        <Link  href={`/u/${user?.username}`}>Profile</Link>
                        <Button className="bg-black text-white border-gray-400" onClick={() => signOut()}>Logout</Button>
                    </div>
                    ):(
                        <div className="flex space-x-4 ">
                        <Link href="/sign-in">
                            <Button>Login</Button>
                        </Link>
                        <Link href="/sign-up" className="mr-4">
                            <Button>Register</Button>
                        </Link>
                        </div>
                    )
                }
        </div>
    )
}


export default Navbar;