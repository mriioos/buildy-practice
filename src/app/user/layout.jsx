import "@/app/globals.css";
import React from 'react';

import SideBar from '@/components/actuators/bars/SideBar.jsx';

export const metadata = {
    title: "Dash Board",
    description: "Generated by me",
};

export default function DashBoardLayout({ children }){

    return (
        <section className="h-full w-full flex">
            <SideBar/> {/* Side Bar */}
            <section className="flex flex-col w-full h-full"> {/* Main Content */}
                {children}
            </section>
        </section>
    );
};