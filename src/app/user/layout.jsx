
import "@/app/globals.css";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import NavBar from '@/components/actuators/bars/NavBar.jsx';
import SidebarButton from "@/components/triggers/buttons/SideBarButton";

export const metadata = {
    title: "Dash Board",
    description: "Generated by me",
};
  
export default function DashBoardLayout({ children }){

    return (
        <section className="h-full w-full flex">
            <NavBar position="left" className="w-[20vw] bg-white"> {/* Side Bar */}
                <Link href="/" className="relative block w-full h-16"> {/* Logo Image */}
                    <Image
                        src="/multimedia/img/qiski-banner.webp"
                        alt="Qiskit Banner"
                        fill 
                        style={{ objectFit: 'contain' }} 
                    />
                </Link>
                <figure className="border-black border-t-[1px] border-b-[1px] w-full mt-2 mb-2"></figure>
                <p>Overview</p>
                <SidebarButton text="Summary" iconURL="/multimedia/img/auth-bg.jpg" route="/user"/>
                <SidebarButton text="Clients" iconURL="/multimedia/img/auth-bg.jpg" route="/user/clients"/> 
                <SidebarButton text="Projects" iconURL="/multimedia/img/auth-bg.jpg" route="/user/projects"/> 
                <SidebarButton text="Providers" iconURL="/multimedia/img/auth-bg.jpg" route="/user/providers"/> 
                <SidebarButton text="Settings" iconURL="/multimedia/img/auth-bg.jpg" route="/user/settings"/>
                <figure className="flex justify-end w-full h-fit "> {/* Hide bar button - Abajo del todo? */}
                    <div className="block bg-yellow-400 w-12 h-12 rounded-md">

                    </div>
                </figure>
            </NavBar>
            <section> {/* Main Content */}
                <nav> {/* Top Bar */}
                    <div> {/* Section description */}

                    </div>
                    <div> {/* Search bar */}

                    </div>
                    <div> {/* Action buttons */}
                        
                    </div>
                </nav>
                {children}
            </section>
        </section>
    );
};