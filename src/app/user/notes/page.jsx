'use client'

import { useEffect, useState } from 'react';

import { deliverynotes_api } from '@/utils/endpoints/deliverynotes.js';
import { try_catch, select } from '@/utils/tools.js';

import MainContentLayout from '../MainContentLayout.jsx';

import NotesOverview from './NotesOverview.jsx';
import CreateNoteDialog from './CreateNoteDialog.jsx';

export default function Notes(){

    const [reload, setReload] = useState(false);
    function reloadNotes(){
        setReload(!reload);
    }

    const [notes, setNotes] = useState([]);

    const searchGet = (selected_item) => ({
        'Format' : selected_item.format,
        'Name' : selected_item.name,
        ...select(selected_item.format, {
            'material' : {
                'Quantity' : selected_item.quantity,
                'Unit' : selected_item.unit,
            },
            'hours' : {
                'Hours' : selected_item.hours,
                'Description' : selected_item.description
            }
        }),
        'Price': selected_item.price
    });

    // Current of the page controller (overview of notes or creating note)
    const [page_state, setPageState] = useState('overview');

    // Check if user is logged in
    const [jwt, setJwt] = useState(null);
    
    // Fetch notes data
    useEffect(() => {
    
        // Ensure jwt is available
        if(!jwt) return;

        // Fetch data using an async IIFE
        (async () => {

            const [notes_all, notes_error] = await try_catch(deliverynotes_api.get.all(jwt));

            if(notes_error) console.error(notes_error);

            setNotes(notes_all);
        })();

    }, [jwt, reload]);
    
    return (
        <MainContentLayout title="Notes" subtitle="Generate a new note" setJwt={setJwt} searchItems={notes} searchGet={searchGet}> 
            {
                (select(page_state, {
                    'overview' : <NotesOverview notes={notes} openCreateNoteDialog={() => setPageState('create')} jwt={jwt} reloadNotes={reloadNotes}/>,
                    'create' : <CreateNoteDialog closeDialog={() => setPageState('overview')} jwt={jwt}/>
                }))
            }
        </MainContentLayout>
    );
}