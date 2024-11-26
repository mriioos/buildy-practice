'use client'

import { useRouter } from 'next/navigation';

export default function Home() {

  const router = useRouter();

  // Check for JWT
  const jwt = localStorage.getItem('buildyJWT')
  if(jwt){

    // Try login
    
  }
  
  router('/login');
}
