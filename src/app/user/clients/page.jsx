'use client'

import { useEffect, useState } from 'react';

import { clients_api } from '@/utils/endpoints/clients.js';
import { try_catch, select } from '@/utils/tools.js';


import MainContentLayout from '../MainContentLayout.jsx';
import ContentPad from '@/components/actuators/figures/ContentPad.jsx';

import ClientsOverview from './ClientsOverview.jsx';
import CreateClientDialog from './CreateClientDialog.jsx';

export default function Clients(){

    const [reload, setReload] = useState(false);
    function reloadClients(){
        setReload(!reload);
    }

    const [clients, setClients] = useState([]);

    // Current of the page controller (overview of clients or creating client)
    const [page_state, setPageState] = useState('overview');
    //let state = 'overview';

    // Check if user is logged in
    const [jwt, setJwt] = useState(null);
    
    // Fetch clients data
    useEffect(() => {
    
        // Ensure jwt is available
        if(!jwt) return;

        // Fetch data using an async IIFE
        (async () => {

            const [clients_all, clients_error] = await try_catch(clients_api.get.all(jwt));

            if(clients_error) console.error(clients_error);

            setClients(clients_all);
        })();

    }, [jwt, reload]);

    return (
        <MainContentLayout title="Clients" subtitle="Name, email and CIF" setJwt={setJwt}> 
            {
                (select(page_state, {
                    'overview' : <ContentPad><ClientsOverview clients={clients} openCreateClientDialog={() => setPageState('create')} jwt={jwt} reloadClients={reloadClients}/></ContentPad>,
                    'create' : <CreateClientDialog closeDialog={() => setPageState('overview')} jwt={jwt}/>
                }))
            }
        </MainContentLayout>
    );
}