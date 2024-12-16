'use client'

import { useEffect, useState } from 'react';
import { projects_api } from '@/utils/endpoints/projects.js';
import { try_catch, select } from '@/utils/tools.js';

import MainContentLayout from '../MainContentLayout.jsx';
import ContentPad from '@/components/actuators/figures/ContentPad.jsx';

import ProjectsOverview from './ProjectsOverview.jsx';
import CreateProjectDialog from '../notes/CreateNoteDialog.jsx';

export default function Projects(){

    const [reload, setReload] = useState(false);
    function reloadProjects(){
        setReload(!reload);
    }

    const [projects, setProjects] = useState([]);

    // Check if user is logged in
    const [jwt, setJwt] = useState(null);

    // Current of the page controller (overview of projects or creating project)
    const [page_state, setPageState] = useState('overview');
    
    // Fetch projects data
    useEffect(() => {
    
        // Ensure jwt is available
        if(!jwt) return;

        // Fetch data using an async IIFE
        (async () => {

            const [projects_all, projects_error] = await try_catch(projects_api.get.all(jwt));

            if(projects_error) console.error(projects_error);

            setProjects(projects_all);
        })();

    }, [jwt, reload]);


    const searchGet = (selected_item) => ({
        'Name': selected_item.name,
        'Code': selected_item.code,
        'Created at': selected_item.createdAt,
        'Updated at': selected_item.updatedAt,
        'Address': `${selected_item.address.street} ${selected_item.address.number}, ${selected_item.address.postal} ${selected_item.address.city}, ${selected_item.address.province}`
    });

    return (
        <MainContentLayout title="Projects" subtitle="All projects" setJwt={setJwt}  searchItems={projects} searchGet={searchGet}> 
            {
                (select(page_state, {
                    'overview' : <ContentPad><ProjectsOverview projects={projects} openCreateProjectDialog={() => setPageState('create')} jwt={jwt} reloadProjects={reloadProjects}/></ContentPad>,
                    'create' : <CreateProjectDialog closeDialog={() => setPageState('overview')} jwt={jwt}/>
                }))
            }
        </MainContentLayout>
    );
}