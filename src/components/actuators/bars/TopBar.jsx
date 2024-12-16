'use client'

import "@/app/globals.css";

import PageDescription from "@/components/actuators/figures/PageDescription.jsx";
import SearchBar from "@/components/triggers/searchbars/SearchBar.jsx";
import NavButton from "@/components/triggers/buttons/TopBarButton";
import Profile from "@/components/actuators/figures/Profile.jsx";

export default function TopBar({ page_title, page_subtitle, searchItems, similarityFunction, searchGet }) {

    const similarityAcceptance = 0.03;
    const limit = 5;

    return (
        <nav className='w-full h-fit'>
            <div className={`p-4 h-fit flex flex-row w-full bg-white transition-all justify-between`}>
                <PageDescription title={page_title} subtitle={page_subtitle}/> {/* Section description */}
                <div className="w-1/3 pl-2 pr-2 flex justify-center items-center"> {/* Search bar */}
                    <SearchBar placeholder="Search..." searchItems={searchItems} similarityFunction={similarityFunction} similarityAcceptance={similarityAcceptance} limit={limit} searchGet={searchGet}/>
                </div>
                <div className="flex justify-center gap-x-2 items-center"> {/* Action buttons */}
                    <NavButton iconURL="/multimedia/img/icons/letter.svg" width={28}/>
                    <NavButton iconURL="/multimedia/img/icons/bell.svg" width={28}/>
                </div>
                <Profile/> {/* User Profile */}
            </div>
        </nav>
    );
}