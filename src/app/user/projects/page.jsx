'use client'

import { useRouter } from 'next/navigation';

import MainContentLayout from '../MainContentLayout.jsx';

export default function Projects(){
    
    const router = useRouter();

    // Check if user is logged in
    const jwt = localStorage.getItem('bildyJWT');
    if(!jwt) router.push('/auth/login');

    return (
        <MainContentLayout title="Projects" subtitle="All projects"> 
        
        </MainContentLayout>
    );
}