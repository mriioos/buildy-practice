import CreateNoteButton from "@/components/triggers/buttons/DefaultButton.jsx";
import Alert from "@/components/actuators/banners/Alert.jsx";
import NoNotes from "@/components/actuators/banners/NoX.jsx";
import NoteCard from "./NoteCard.jsx";

import { useState } from 'react';
import ContentPad from "@/components/actuators/figures/ContentPad.jsx";

// Component for notes overview
const NotesOverview = ({ notes, openCreateNoteDialog, jwt, reloadNotes }) => {
    
    const [alert, setAlert] = useState({ visible : false, message : '', iconURL : null });

    function closeAlert(){
        setAlert({ ...alert, visible : false });
    }
    
    const [note, setNote] = useState(notes[0]);

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
                        
                    </ContentPad>
                    <ContentPad>
                        <p>???</p>
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