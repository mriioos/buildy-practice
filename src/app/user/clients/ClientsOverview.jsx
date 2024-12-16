import CreateClientButton from "@/components/triggers/buttons/DefaultButton.jsx";
import ClientCard from "./ClientCard.jsx";
import Alert from "@/components/actuators/banners/Alert.jsx";
import NoClients from "@/components/actuators/banners/NoX.jsx";

import { useState } from 'react';

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
            ? <NoClients openCreateDialog={openCreateClientDialog} img_src="/multimedia/img/client.png" label="Clients"/> 
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