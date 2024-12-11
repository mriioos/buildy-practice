'use client'

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {

    const router = useRouter();

    useEffect(() => {

        // Check for JWT
        const jwt = localStorage.getItem('bildyJWT');

        router.push(jwt ? '/user' : '/auth/login');
    }, []);

    return (<></>)
}
