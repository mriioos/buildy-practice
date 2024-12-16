import CreateNoteButton from "@/components/triggers/buttons/DefaultButton.jsx";
import Alert from "@/components/actuators/banners/Alert.jsx";
import NoNotes from "@/components/actuators/banners/NoX.jsx";
import NoteCard from "./NoteCard.jsx";

import ContentPad from "@/components/actuators/figures/ContentPad.jsx";

import { clients_api } from "@/utils/endpoints/clients.js";
import { deliverynotes_api } from "@/utils/endpoints/deliverynotes.js";
import { try_catch } from "@/utils/tools.js";

import { useState, useEffect } from 'react';

// Component for notes overview
const NotesOverview = ({ notes, openCreateNoteDialog, jwt, reloadNotes }) => {
    
    const [alert, setAlert] = useState({ visible : false, message : '', iconURL : null });

    function closeAlert(){
        setAlert({ ...alert, visible : false });
    }

    const [note, setNote] = useState(null);
    const [clients, setClients] = useState([]);
    const [projects, setProjects] = useState([])

    // Fetch project and client data
    useEffect(() => {
            
        if(!jwt) return;
        if(!note) return;

        // Fetch data using an async IIFE
        (async () => {

            const [clients_all, clients_error] = await try_catch(clients_api.get.one(note.clientId, jwt));
            
            if(clients_error) return console.error(projects_error);  

            setClients([clients_all]);
        })();

        setProjects([note.projectId]);

    }, [jwt, note]);

    return (
        <>
            {alert.visible && <Alert message={alert.message} iconURL={alert.iconURL} close={closeAlert} />}
            {!notes?.length
            ? <ContentPad><NoNotes openCreateDialog={openCreateNoteDialog} img_src="/multimedia/img/note.png" label="Note"/></ContentPad>
            : <>
                <div className="flex-grow max-w-[60%] flex flex-col">
                    <ContentPad>
                        <div className="flex flex-col gap-y-4 max-h-[65vh] overflow-y-auto pr-2">
                            {notes.map((note, index) => <NoteCard key={index} note={note} setAlert={({ message, iconURL }) => { setAlert({ visible : true, message : message, iconURL : iconURL }); reloadNotes(); }} setNote={setNote} jwt={jwt}/>)}
                        </div>
                        <CreateNoteButton onClick={() => openCreateNoteDialog()} text="Create new!" className="w-[20%] mt-4"/>
                    </ContentPad>
                </div>
                <div className="flex-grow max-w-[40%] flex flex-col">
                    <ContentPad>
                        <h1 className="text-xl text-center">Refering project</h1>
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
                        <h1 className="text-xl text-center">Client owner</h1>
                        <div className="h-full overflow-y-auto">
                            {clients.map((client, index) => 
                            <div key={index} className="border-b-2 border-gray-200 p-2">
                                <div className="flex justify-between items-center">
                                <h1 className="text-lg">{client.name}</h1>
                                <p className="text-lg">{client.cif}</p>
                            </div> 
                            <p className="text-lg text-slate-600 text-d">({client._id})</p>
                            <p className="text-slate-600 text-d">{client.address.street} {client.address.number}, {client.address.postal} {client.address.city}, {client.address.province}</p>
                            </div>)}
                        </div>
                    </ContentPad>
                    <ContentPad>
                        <p>???</p>
                    </ContentPad>
                </div>
            </>}
        </>
    )
};

export default NotesOverview;