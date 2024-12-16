import CreateClientButton from "@/components/triggers/buttons/DefaultButton.jsx";
import ClientCard from "./ClientCard.jsx";
import Alert from "@/components/actuators/banners/Alert.jsx";
import NoClients from "@/components/actuators/banners/NoX.jsx";
import ContentPad from '@/components/actuators/figures/ContentPad.jsx';

import { projects_api } from "@/utils/endpoints/projects.js";
import { deliverynotes_api } from "@/utils/endpoints/deliverynotes.js";
import { try_catch } from "@/utils/tools.js";

import { useState, useEffect } from 'react';

// Component for clients overview
const ClientsOverview = ({ clients, openCreateClientDialog, jwt, reloadClients }) => {
    
    const [alert, setAlert] = useState({ visible : false, message : '', iconURL : null });

    function closeAlert(){
        setAlert({ ...alert, visible : false });
    }

    const [client, setClient] = useState(null);
    const [projects, setProjects] = useState([]);
    const [notes, setNotes] = useState([]);

    // Fetch projects and notes data
    useEffect(() => {
        
        console.log(client);

        if(!jwt) return;
        if(!client) return;

        // Fetch data using an async IIFE
        (async () => {

            const [projects_all, projects_error] = await try_catch(projects_api.get.all_by_client(client, jwt));
            
            if(projects_error) return console.error(projects_error);  
            
            setProjects(projects_all);

            const flattened_notes = (await Promise.all(projects_all.map(async project => {
                const [notes_all, notes_error] = await try_catch(deliverynotes_api.get.all_by_project(project._id, jwt))
                
                if(notes_error) return console.error(notes_error);

                return notes_all;
            })))
            .flat();

            console.log(flattened_notes);

            setNotes(flattened_notes);
        })();

    }, [jwt, client]);


    return (
        <>
            {alert.visible && <Alert message={alert.message} iconURL={alert.iconURL} close={closeAlert} />}
            {!clients?.length
            ? <ContentPad><NoClients openCreateDialog={openCreateClientDialog} img_src="/multimedia/img/client.png" label="Clients"/></ContentPad>
            : <>
                <div className="flex-grow max-w-[60%] flex flex-col">
                    <ContentPad>
                        <div className="flex flex-col gap-y-4 max-h-[65vh] overflow-y-auto pr-2">
                            {clients.map((client, index) => <ClientCard key={index} client={client} setAlert={({ message, iconURL }) => { setAlert({ visible : true, message : message, iconURL : iconURL }); reloadClients(); }} setClient={setClient} jwt={jwt}/>)}
                        </div>
                        <CreateClientButton onClick={() => openCreateClientDialog()} text="Create new!" className="w-[20%] mt-4"/>
                    </ContentPad>
                </div>
                <div className="flex-grow max-w-[40%] flex flex-col">
                    <ContentPad>
                        <h1 className="text-xl text-center">Projects</h1>
                        <div className="h-full overflow-y-auto">
                            {projects.map((project, index) => 
                            <div key={index} className="border-b-2 border-gray-200 p-2">
                                <div className="flex justify-between items-center">
                                    <h1 className="text-lg">{project.name}</h1>
                                    <p className={`text-lg font-bold ${project.active ? 'text-yellow-600' : 'text-green-600'}`}>{project.active ? 'PENDING' : 'COMPLETED'}</p>
                                </div> 
                                <p className="text-lg text-slate-600 text-d">({project._id})</p>
                                <p className="text-slate-600">{project.address.street} {project.address.number}, {project.address.postal} {project.address.city}, {project.address.province}</p>
                                <p className="text-slate-600">Last update: {
                                (() => {
                                    const date = new Date(project.updatedAt);
                                    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
                                })()}
                                </p>
                            </div>)}
                        </div>
                    </ContentPad>
                    <ContentPad>
                        <h1 className="text-xl text-center">Notes</h1>
                        <div className="h-full overflow-y-auto">
                            {notes.map((note, index) => 
                            <div key={index} className="border-b-2 border-gray-200 p-2">
                                <div className="flex justify-between items-center">
                                    <h1 className="text-lg">{note.name || 'No name available'}</h1>
                                    <p className={`text-lg font-bold ${note.pending ? 'text-yellow-600' : 'text-green-600'}`}>{note.pending ? 'PENDING' : 'COMPLETED'}</p>
                                </div>
                                <p className="text-lg text-slate-600 text-d">({note._id})</p>
                                <p className="text-slate-600">Format: {note.format}</p>
                                <p className="text-slate-600">Last update: {
                                (() => {
                                    const date = new Date(note.updatedAt);
                                    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
                                })()}
                                </p>
                            </div>)}
                        </div>
                    </ContentPad>
                    <ContentPad>
                        <h1>Providers</h1>
                        <p>???</p>
                    </ContentPad>
                </div>
            </>}
        </>
    )
};

export default ClientsOverview;