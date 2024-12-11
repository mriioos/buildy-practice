'use client'
import { useRouter } from 'next/navigation';

// bg: [url('${imageURL}')]

export default function NavButton({ imageURL, route }) {
    const router = useRouter();
    return (
        <div onClick={() => router.push(route)} className={`bg-black bg-cover bg-center`}></div>
    );
}   