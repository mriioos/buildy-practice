'use client'

import { useEffect, useState } from 'react';

import MainContentLayout from '../MainContentLayout.jsx';

export default function Provider(){
    
    // Check if user is logged in
    const [jwt, setJwt] = useState(null);
    

    return (
        <MainContentLayout title="Providers" subtitle="Your providers" setJwt={setJwt}> 
        
        </MainContentLayout>
    );
}