'use client'

import "@/app/globals.css";

import Image from 'next/image';
import Link from 'next/link';

import { useState } from 'react';
import SidebarButton from "@/components/triggers/buttons/SideBarButton.jsx";
import Divider from "@/components/actuators/figures/Divider.jsx";
import SideBarSection from "../figures/SideBarSection";

export default function SideBar() {

    const [isOpen, setIsOpen] = useState(true);

    return (
        <nav className='flex-shrink-0 w-fit h-full'> {/* Side Bar */}
            <div className={`p-4 h-full flex flex-col w-fit bg-white transition-all`}>
                <Link href="/" className="relative block w-full h-16"> {/* Logo Image */}
                    <Image
                        src={`/multimedia/img/${isOpen ? 'qiski-banner.webp' : 'qiskit-logo.jpg'}`}
                        alt="Qiskit Banner"
                        fill 
                        style={{ objectFit: 'contain', transform: isOpen ? 'unset' : 'scale(0.7)'}}
                    />
                </Link>
                <div className="h-full w-fit overflow-y-auto scrollbar-hide"> {/* Sidebar Content */}
                    <Divider direction="h" color="slate-300" width="1px" length="100%" margin="2"/> {/* Divider */}
                    <SideBarSection isOpen={isOpen} title="Overview"> {/* Section */}
                        <SidebarButton isOpen={isOpen} text="Summary" height={35} iconURL="/multimedia/img/icons/rating.svg" route="/user"/>
                        <SidebarButton isOpen={isOpen} text="Clients" height={35} iconURL="/multimedia/img/icons/doodle.svg" route="/user/clients"/> 
                        <SidebarButton isOpen={isOpen} text="Projects" height={35} iconURL="/multimedia/img/icons/diagram.svg" route="/user/projects"/> 
                        <SidebarButton isOpen={isOpen} text="Notes" height={35} iconURL="/multimedia/img/icons/document.svg" route="/user/notes"/> 
                        <SidebarButton isOpen={isOpen} text="Providers" height={35} iconURL="/multimedia/img/icons/pulse.svg" route="/user/providers"/> 
                    </SideBarSection>
                    <SideBarSection isOpen={isOpen} title="User"> {/* Section */}
                        <SidebarButton isOpen={isOpen} text="Settings" height={35} iconURL="/multimedia/img/icons/settings.svg" route="/user/settings"/>
                    </SideBarSection>
                </div>
                <div className={`w-full h-fit flex justify-${isOpen ? 'end' : 'center'} mt-auto self-end`}> {/* Close Bar Button */}
                    <figure onClick={() => setIsOpen(!isOpen)} className="cursor-pointer flex justify-end items-center w-fit h-fit border-2 rounded-md p-2"> 
                        <Image
                            src="/multimedia/img/icons/back.svg"
                            alt={`Close Icon`}
                            height={35}
                            width={35}
                            className={`transition-all rotate-${isOpen ? '0' : '180'}`}
                        />
                    </figure>
                </div>
            </div>
        </nav>
    );
}