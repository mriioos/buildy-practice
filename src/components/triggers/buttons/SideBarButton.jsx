import Link from 'next/link';

export default function SidebarButton({ text, iconURL, route }) {
    //const classNames = `bg-[url('${iconURL}')]`;
    
    //console.log(classNames); ${classNames}

    return (
        <Link href={route} className="flex">
            <div className={`bg-black bg-cover bg-center`}></div>
            <p>{text}</p>
        </Link>
    );
}