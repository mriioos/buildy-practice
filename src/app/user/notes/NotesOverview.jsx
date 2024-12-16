import CreateNoteButton from "@/components/triggers/buttons/DefaultButton.jsx";
import Alert from "@/components/actuators/banners/Alert.jsx";
import NoNotes from "@/components/actuators/banners/NoX.jsx";
import NoteCard from "./NoteCard.jsx";

import { useState } from 'react';

// Component for notes overview
const NotesOverview = ({ notes, openCreateNoteDialog, jwt, reloadNotes }) => {
    
    const [alert, setAlert] = useState({ visible : false, message : '', iconURL : null });

    function closeAlert(){
        setAlert({ ...alert, visible : false });
    }

    return (
        <>
            {alert.visible && <Alert message={alert.message} iconURL={alert.iconURL} close={closeAlert} />}
            {!notes?.length
            ? <NoNotes openCreateDialog={openCreateNoteDialog} img_src="/multimedia/img/note.png" label="Note"/> 
            : <>
                <div className="flex flex-col gap-y-4 h-[65vh] overflow-y-auto pr-2">
                    {notes.map((note, index) => <NoteCard key={index} note={note} setAlert={({ message, iconURL }) => { setAlert({ visible : true, message : message, iconURL : iconURL }); reloadNotes(); }} jwt={jwt}/>)}
                </div>
                <CreateNoteButton onClick={() => openCreateNoteDialog()} text="Create new!" className="w-[20%] mt-4"/>
            </>}
        </>
    )
};

export default NotesOverview;