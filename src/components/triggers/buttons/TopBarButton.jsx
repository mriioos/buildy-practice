'use client'

import Image from 'next/image';

export default function NavButton({ iconURL, width }) {
    const height = width;
    
    return (
        <div className={`relative cursor-pointer flex h-fit w-full items-center p-2`}>
            <Image
                src={iconURL}
                alt="Icon"
                width={width} // Set width
                height={height} // Set height
            />
            <div className="absolute h-[0.65rem] w-[0.65rem] bg-orange-600 bottom-[0.65rem] right-[0.4rem] rounded-full"></div>
        </div>
    );
}   