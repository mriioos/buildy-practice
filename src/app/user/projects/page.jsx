'use client'

import { useEffect, useState } from 'react';

import MainContentLayout from '../MainContentLayout.jsx';

export default function Projects(){

    // Check if user is logged in
    const [jwt, setJwt] = useState(null);

    return (
        <MainContentLayout title="Projects" subtitle="All projects" setJwt={setJwt}> 
        
        </MainContentLayout>
    );
}