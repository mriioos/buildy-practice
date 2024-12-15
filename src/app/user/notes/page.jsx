'use client'

import { useRouter } from 'next/navigation';

import MainContentLayout from '../MainContentLayout.jsx';

export default function Notes(){
    
    const router = useRouter();

    // Check if user is logged in
    const jwt = localStorage.getItem('bildyJWT');
    if(!jwt) router.push('/auth/login');
    
    return (
        <MainContentLayout title="Notes" subtitle="Generate a new note"> 
        
        </MainContentLayout>
    );
}