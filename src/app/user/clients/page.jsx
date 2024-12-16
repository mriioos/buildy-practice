'use client'

import { useEffect, useState } from 'react';

import { clients_api } from '@/utils/endpoints/clients.js';
import { try_catch, select } from '@/utils/tools.js';

import MainContentLayout from '../MainContentLayout.jsx';
import ClientsOverview from './ClientsOverview.jsx';
import CreateClientDialog from './CreateClientDialog.jsx';

export default function Clients(){

    const [reload, setReload] = useState(false);
    function reloadClients(){
        setReload(!reload);
    }

    const [clients, setClients] = useState([]);

    const searchGet = (selected_item) => ({
        'Name': selected_item.name,
        'CIF': selected_item.cif,
        'Address': `${selected_item.address.street} ${selected_item.address.number}, ${selected_item.address.postal} ${selected_item.address.city}, ${selected_item.address.province}`
    });

    // Current of the page controller (overview of clients or creating client)
    const [page_state, setPageState] = useState('overview');

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
        <MainContentLayout title="Clients" subtitle="Name, email and CIF" setJwt={setJwt} searchItems={clients} searchGet={searchGet}> 
            {
                (select(page_state, {
                    'overview' : <ClientsOverview clients={clients} openCreateClientDialog={() => setPageState('create')} jwt={jwt} reloadClients={reloadClients}/>,
                    'create' : <CreateClientDialog closeDialog={() => setPageState('overview')} jwt={jwt}/>
                }))
            }
        </MainContentLayout>
    );
}