import CreateProjectButton from "@/components/triggers/buttons/DefaultButton.jsx";
import Alert from "@/components/actuators/banners/Alert.jsx";
import NoProjects from "@/components/actuators/banners/NoX.jsx";
import ProjectCard from "./ProjectCard.jsx";

import { useState } from 'react';

// Component for projects overview
const ProjectsOverview = ({ projects, openCreateProjectDialog, jwt, reloadProjects }) => {
    
    const [alert, setAlert] = useState({ visible : false, message : '', iconURL : null });

    function closeAlert(){
        setAlert({ ...alert, visible : false });
    }

    return (
        <>
            {alert.visible && <Alert message={alert.message} iconURL={alert.iconURL} close={closeAlert} />}
            {!projects?.length
            ? <NoProjects openCreateDialog={openCreateProjectDialog} img_src="/multimedia/img/project.png" label="Project"/> 
            : <>
                <div className="flex flex-col gap-y-4 h-[65vh] overflow-y-auto pr-2">
                    {projects.map((project, index) => <ProjectCard key={index} project={project} setAlert={({ message, iconURL }) => { setAlert({ visible : true, message : message, iconURL : iconURL }); reloadProjects(); }} jwt={jwt}/>)}
                </div>
                <CreateProjectButton onClick={() => openCreateProjectDialog()} text="Create new!" className="w-[20%] mt-4"/>
            </>}
        </>
    )
};

export default ProjectsOverview;