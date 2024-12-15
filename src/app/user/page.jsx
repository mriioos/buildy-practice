'use client'

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import MainContentLayout from './MainContentLayout.jsx';
import ContentPad from '@/components/actuators/figures/ContentPad.jsx';

export default function UserSummary(){
    const router = useRouter();

    // Check if user is logged in
    let jwt;
    useEffect(() => {
        jwt = localStorage.getItem('bildyJWT');
        if(!jwt) router.push('/auth/login');
    }, []);

    return (
        <MainContentLayout title="Summary" subtitle="Everything you need"> 
        <div className="flex-grow flex">
            <ContentPad>

            </ContentPad>
            <ContentPad>

            </ContentPad>
        </div>
        </MainContentLayout>
    );
}