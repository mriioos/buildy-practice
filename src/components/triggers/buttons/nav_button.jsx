'use client'
import { useRouter } from 'next/navigation';

export default function NavButton({ imageURL, route }) {
    const router = useRouter();
    return (
        <></>//<div onClick={() => router.push(route)} className={`bg-[url('${imageURL}')] bg-cover bg-center`}></div>
    );
}   