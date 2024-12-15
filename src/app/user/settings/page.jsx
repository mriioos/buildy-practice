'use client'

import { useEffect, useState } from 'react';

import MainContentLayout from '../MainContentLayout.jsx';

export default function Settings(){
    
    // Check if user is logged in
    const [jwt, setJwt] = useState(null);

    return (
        <MainContentLayout title="Settings" subtitle="Account settings" setJwt={setJwt}> 

        </MainContentLayout>
    );
}