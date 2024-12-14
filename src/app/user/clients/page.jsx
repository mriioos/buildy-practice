'use client'

import { useRouter } from 'next/navigation';

export default function Clients(){
    const router = useRouter();

    // Check if user is logged in
    const jwt = localStorage.getItem('bildyJWT');
    if(!jwt) router.push('/auth/login');

    return (
        <>
            Clients!
        </>
    );
}