import CreateClientButton from "@/components/triggers/buttons/DefaultButton.jsx";
import Image from 'next/image';
import ClientCard from "./ClientCard.jsx";
import Alert from "@/components/actuators/banners/Alert.jsx";

import { useState } from 'react';

// Default component if there are no clients
const NoClients = ({ openCreateClientDialog }) => (
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
        <CreateClientButton onClick={openCreateClientDialog} text="Create new!" className="w-[20%] mt-4"/>
    </div>
);

// Component for clients overview
const ClientsOverview = ({ clients, openCreateClientDialog, jwt, reloadClients }) => {
    
    const [alert, setAlert] = useState({ visible : false, message : '', iconURL : null });

    function closeAlert(){
        setAlert({ ...alert, visible : false });
    }

    return (
        <>
            {alert.visible && <Alert message={alert.message} iconURL={alert.iconURL} close={closeAlert} />}
            {!clients.length
            ? <NoClients openCreateClientDialog={openCreateClientDialog}/> 
            : <>
                <div className="flex flex-col gap-y-4 h-[65vh] overflow-y-auto pr-2">
                    {clients.map((client, index) => <ClientCard key={index} client={client} setAlert={({ message, iconURL }) => { setAlert({ visible : true, message : message, iconURL : iconURL }); reloadClients(); }} jwt={jwt}/>)}
                </div>
                <CreateClientButton onClick={() => openCreateClientDialog()} text="Create new!" className="w-[20%] mt-4"/>
            </>}
        </>
    )
};

export default ClientsOverview;