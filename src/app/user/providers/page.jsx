'use client'

import { useEffect, useState } from 'react';

import MainContentLayout from '../MainContentLayout.jsx';

export default function Provider(){
    
    const [providers, setProviders] = useState([]);

    // Check if user is logged in
    const [jwt, setJwt] = useState(null);

    const searchGet = (selected_item) => ({});
    
    return (
        <MainContentLayout title="Providers" subtitle="Your providers" setJwt={setJwt} searchItems={[]} searchGet={searchGet}> 
        
        </MainContentLayout>
    );
}