import Link from 'next/link';
import Image from 'next/image';

export default function SidebarButton({ text, iconURL, height, route, isOpen }) {

    const width = height;

    return (
        <Link href={route} className={`flex h-fit w-full items-center ${isOpen && ' gap-x-2'} border-2 border-transparent hover:border-black transition-all rounded-md p-2`}>
            <Image
                src={iconURL}
                alt={`${text} Icon`}
                width={width} // Set width
                height={height} // Set height
            />
            <p>{isOpen ? text : <>&nbsp;</>}</p>
        </Link>
    );
}