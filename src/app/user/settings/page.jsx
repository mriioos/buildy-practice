'use client'
import { clients_api } from '@/utils/endpoints/clients.js';
import { deliverynotes_api } from '@/utils/endpoints/deliverynotes.js';
import { projects_api } from '@/utils/endpoints/projects.js';

import { useEffect, useState } from 'react';
import { try_catch, select } from '@/utils/tools';

import MainContentLayout from '../MainContentLayout.jsx';

export default function Settings(){

    const [user_data, setUserData] = useState({ 
        clients : [], 
        deliverynotes : [], 
        projects : []
    });

    // Check if user is logged in
    const [jwt, setJwt] = useState(null);
    
    useEffect(() => {

        // Ensure jwt is available
        if(!jwt) return;

        // Fetch data using an async IIFE
        (async () => {

            const [clients_all, clients_error] = await try_catch(clients_api.get.all(jwt));
            const [deliverynotes_all, deliverynotes_error] = await try_catch(deliverynotes_api.get.all(jwt));
            const [projects_all, projects_error] = await try_catch(projects_api.get.all(jwt));

            setUserData({ 
                clients : clients_error ? 'An error occurred' : clients_all, 
                deliverynotes : deliverynotes_error ? 'An error occurred' : deliverynotes_all, 
                projects : projects_error ? 'An error occurred' : projects_all 
            });
        })();

    }, [jwt]);

    // Function to get user data as a unique array
    function getUserData(){

        // Return all items with their type
        return Object.entries(user_data).map(([key, items]) => {

            // Return items with type on each item
            return items.map(item => ({
                ...item,
                type : key
            }));
        }).flat();
    }

    function searchGet(item){
        return select(item.type, {
            'clients': (selected_item) => ({
                'Name': selected_item.name,
                'CIF': selected_item.cif,
                'Address': `${selected_item.address.street} ${selected_item.address.number}, ${selected_item.address.postal} ${selected_item.address.city}, ${selected_item.address.province}`
            }),
            'deliverynotes': (selected_item) => ({
                'Format': selected_item.format,
                'Hours': selected_item.hours,
                'Description': selected_item.description,
                'Sign': selected_item.sign,
                'Pending': selected_item.pending,
                'Created at': selected_item.createdAt,
                'Updated at': selected_item.updatedAt
            }),
            'projects': (selected_item) => ({
                'Name': selected_item.name,
                'Code': selected_item.code,
                'Created at': selected_item.createdAt,
                'Updated at': selected_item.updatedAt,
                'Address': `${selected_item.address.street} ${selected_item.address.number}, ${selected_item.address.postal} ${selected_item.address.city}, ${selected_item.address.province}`
            })
        })(item);
    }

    return (
        <MainContentLayout title="Settings" subtitle="Account settings" setJwt={setJwt}  searchItems={getUserData()} searchGet={searchGet}> 

        </MainContentLayout>
    );
}