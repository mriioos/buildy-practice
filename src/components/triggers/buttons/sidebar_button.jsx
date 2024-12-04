'use client'
import { useRouter } from 'next/navigation';

export default function SidebarButton({ text, imageURL, route }) {
    const router = useRouter();
    return (
        <div>
            <div onClick={() => router.push(route)} className={`bg-[url('${imageURL}')] bg-cover bg-center`}></div>
            <p>{text}</p>
        </div>
    );
}