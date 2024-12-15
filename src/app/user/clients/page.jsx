'use client'

import { useEffect, useState } from 'react';

import { clients_api } from '@/utils/endpoints/clients.js';
import { try_catch, select } from '@/utils/tools.js';

import Image from 'next/image';
import * as Yup from 'yup'

import MainContentLayout from '../MainContentLayout.jsx';
import ContentPad from '@/components/actuators/figures/ContentPad.jsx';
import CreateClientButton from '@/components/triggers/buttons/DefaultButton.jsx';
import EasyForm from '@/components/triggers/forms/EasyForm.jsx';

export default function Clients(){

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

    }, [jwt]);

    // Default omponent if there are no clients
    const NoClients = () => (
        <div className="flex-grow flex flex-col items-center">
            <div className="h-[70%] w-[70%] relative flex justify-center items-center">
                <Image
                    src="/multimedia/img/client.png"
                    alt="Client image"
                    fill
                    style={{ objectFit: 'contain' }}
                />
            </div>
            <h1 className="text-3xl pointer-events-none">Create your first client</h1>
            <p className="text-lg text-center pointer-events-none">And generate digital Delivery Notes</p>
            <CreateClientButton onClick={() => setPageState('create')} text="Create new!" className="w-[20%] mt-4"/>
        </div>
    );

    // Component for clients overview
    const ClientsOverview = () => (
        <></>
    );

    // Component for creating a new client
    const CreateClientDialog = () => {

        const fields = {
            name : {
                label : 'Name of the client or company',
                type : 'text',
                placeholder : 'John Doe',
                initial : '',
                validation : Yup.string().required('Required')
            },
            "Tax domicile" : {
                providence : {
                    label : '',
                    type : 'text',
                    placeholder : 'Providence Name',
                    initial : '',
                    validation : Yup.string().required('Required')
                },
                city : {
                    label : '',
                    type : 'text',
                    placeholder : 'City Name',
                    initial : '',
                    validation : Yup.string().required('Required')
                },  
                street : {
                    label : '',
                    type : 'text',
                    placeholder : 'Street Name',
                    initial : '',
                    validation : Yup.string().required('Required')
                },
                number : {
                    label : '',
                    type : 'text',
                    placeholder : 'House number',
                    initial : '',
                    validation : Yup.string().required('Required')
                },
                postal_code : {
                    label : '',
                    type : 'text',
                    placeholder : 'Postal Code',
                    initial : '',
                    validation : Yup.string().required('Required')
                }
            },
            cif : {
                label : 'NIF (optional)',
                type : 'text',
                placeholder : '12345678A',
                initial : '',
                validation : Yup.string().required('Required')
            }
        }

        const createClient = async (values) => {

            if(!jwt) return;

            const [_, error] = clients_api.post.one({ 
                name : values.name,
                cif : values.cif,
                address : {
                    street : values.street,
                    number : values.number,
                    postal : values.postal_code,
                    city : values.city,
                    providence : values.providence
                }
            }, 
            jwt);

            if(error) ; // Show error message
            else ; // Show success message
        }

        return(
            <>
                <ContentPad className="relative max-w-[60%] h-fit">
                    <div onClick={() => setPageState('overview')} className="absolute flex justify-center items-center top-4 left-4 cursor-pointer">
                        <Image
                            src="/multimedia/img/icons/back.svg"
                            alt="Client image"
                            height={35}
                            width={35}
                        />
                    </div>
                    <h1 className="text-2xl text-center">New client</h1>
                    <div className="w-[90%] ml-auto mr-auto mt-4 mb-2">
                        <EasyForm
                            title=""
                            fields={fields}
                            handleSubmit={createClient}
                            submit_button_text="Save" 
                            custom_styles={null}
                            toFormikValidationSchema={Yup.object}
                        />
                    </div>
                </ContentPad>
                <div className="flex-grow max-w-[40%] flex flex-col">
                    <ContentPad>

                    </ContentPad>
                    <ContentPad>

                    </ContentPad>
                    <ContentPad>

                    </ContentPad>
                </div>
            </>
        )
    };

    return (
        <MainContentLayout title="Clients" subtitle="Name, email and CIF" setJwt={setJwt}> 
            {
                (select(page_state, {
                    'overview' : () => <ContentPad>{clients.length === 0 ? <NoClients/> : <ClientsOverview/>}</ContentPad>,
                    'create' : () => <CreateClientDialog/>
                }))()
            }
        </MainContentLayout>
    );
}