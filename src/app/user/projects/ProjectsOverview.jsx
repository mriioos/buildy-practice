import CreateProjectButton from "@/components/triggers/buttons/DefaultButton.jsx";
import Alert from "@/components/actuators/banners/Alert.jsx";
import NoProjects from "@/components/actuators/banners/NoX.jsx";
import ProjectCard from "./ProjectCard.jsx";

import ContentPad from "@/components/actuators/figures/ContentPad.jsx";

import { clients_api } from "@/utils/endpoints/clients.js";
import { projects_api } from "@/utils/endpoints/projects.js";
import { deliverynotes_api } from "@/utils/endpoints/deliverynotes.js";
import { try_catch } from "@/utils/tools.js";

import { useState, useEffect } from 'react';

// Component for projects overview
const ProjectsOverview = ({ projects, openCreateProjectDialog, jwt, reloadProjects }) => {
    
    const [alert, setAlert] = useState({ visible : false, message : '', iconURL : null });

    function closeAlert(){
        setAlert({ ...alert, visible : false });
    }
    
    const [project, setProject] = useState(null);
    const [notes, setNotes] = useState([]);
    const [clients, setClients] = useState([]);

    // Fetch client and notes data
    useEffect(() => {
            
        if(!jwt) return;
        if(!project) return;

        // Fetch data using an async IIFE
        (async () => {

            const [clients_all, clients_error] = await try_catch(clients_api.get.one(project.clientId, jwt));

            if(clients_error) return console.error(projects_error);  

            setClients([clients_all]);

            const project_notes = await deliverynotes_api.get.all_by_project(project._id, jwt);

            setNotes(project_notes);
        })();

    }, [jwt, project]);

    return (
        <>
            {alert.visible && <Alert message={alert.message} iconURL={alert.iconURL} close={closeAlert} />}
            {!projects?.length
            ? <ContentPad><NoProjects openCreateDialog={openCreateProjectDialog} img_src="/multimedia/img/project.png" label="Project"/> </ContentPad>
            : <>
                <div className="flex-grow max-w-[60%] flex flex-col">
                    <ContentPad>
                        <div className="flex flex-col gap-y-4 max-h-[65vh] overflow-y-auto pr-2">
                            {projects.map((project, index) => <ProjectCard key={index} project={project} setAlert={({ message, iconURL }) => { setAlert({ visible : true, message : message, iconURL : iconURL }); reloadProjects(); }} setProject={setProject} jwt={jwt}/>)}
                        </div>
                        <CreateProjectButton onClick={() => openCreateProjectDialog()} text="Create new!" className="w-[20%] mt-4"/>
                    </ContentPad>
                </div>
                <div className="flex-grow max-w-[40%] flex flex-col">
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
                        <p>???</p>
                    </ContentPad>
                </div>
            </>}
        </>
    )
};

export default ProjectsOverview;