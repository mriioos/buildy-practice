'use client'

import { useRouter } from 'next/navigation';

export default function Home() {

  const router = useRouter();

  // Check for JWT
  const jwt = localStorage.getItem('bildyJWT');
  if(!jwt){

    // Route to login page
    router.push('/auth/login');
  }
  
  return (
    <>
      <h1>¡Esto es el home!</h1>
    </>
  )
}
