'use client'

import { useEffect, useState } from 'react';

import MainContentLayout from '../MainContentLayout.jsx';

export default function Notes(){

    // Check if user is logged in
    const [jwt, setJwt] = useState(null);
    
    return (
        <MainContentLayout title="Notes" subtitle="Generate a new note" setJwt={setJwt}> 
        
        </MainContentLayout>
    );
}