import TopBar from "@/components/actuators/bars/TopBar"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Component that wraps the main content of the layout to add the top bar with the page name
 * @param {*} page_title 
 */
// Este patrón me parece terrible pero no se me ocurre otra forma de hacer lo que quiero sin sacrificar mil horas de trabajo
export default function MainContentLayout({ title, subtitle, setJwt, searchItems, searchGet, children }){

    const router = useRouter();

    // Check if user is logged in
    useEffect(() => {
        const stored_jwt = localStorage.getItem('bildyJWT');

        if(!stored_jwt) router.push('/auth/login');
        setJwt(stored_jwt);
    }, []);

    return (
        <>
            <TopBar page_title={title} page_subtitle={subtitle} searchItems={searchItems} similarityFunction={null} searchGet={searchGet}/> {/* Top Bar */}
            <section className="flex-grow flex p-4"> {/* Main Content */}
                {children}
            </section>
        </>
    )
}