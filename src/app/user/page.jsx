'use client'
import { clients_api } from '@/utils/endpoints/clients.js';
import { deliverynotes_api } from '@/utils/endpoints/deliverynotes.js';
import { projects_api } from '@/utils/endpoints/projects.js';
import { try_catch, select } from '@/utils/tools';

import { useEffect, useState } from 'react';

import MainContentLayout from './MainContentLayout.jsx';
import ContentPad from '@/components/actuators/figures/ContentPad.jsx';
import Link from 'next/link.js';

export default function UserSummary(){

    const [user_data, setUserData] = useState({ 
        clients : [], 
        deliverynotes : [], 
        projects : []
    });

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

    const UserInfo = ({ title, value, href, className }) => (
        <Link href={href || '#'}>
            <h1 className={`block text-2xl border-[2px] shadow-md p-4 rounded-md animated-gradient text-white overflow-hidden pointer-events-none ${className}`}><span className="font-bold">{value}</span> {title}</h1>
        </Link>
    )

    return (
        <MainContentLayout title="Summary" subtitle="Everything you need" setJwt={setJwt} searchItems={getUserData()} searchGet={searchGet}>
            <ContentPad>
                <h1 className="w-fit text-3xl border-b-[2px] pl-4 pr-4 mt-[5%] mr-auto ml-auto">You currently have a total of</h1>
                <div className="flex-grow flex flex-col gap-y-4 justify-center items-center">
                    <UserInfo title="Clients" value={user_data.clients.length} href="/user/clients" className="[animation-duration:5s!important]"/>
                    <UserInfo title="Delivery notes" value={user_data.deliverynotes.length} href="/user/notes" className="[animation-duration:7s!important]"/>
                    <UserInfo title="Projects" value={user_data.projects.length} href="/user/projects" className="[animation-duration:9s!important]"/>
                </div>
            </ContentPad>
        </MainContentLayout>
    );
}