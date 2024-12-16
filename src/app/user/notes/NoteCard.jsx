import EasyForm from '@/components/triggers/forms/EasyForm';
import DeleteNoteButton from "@/components/triggers/buttons/DefaultButton.jsx";
import Image from 'next/image';
import * as Yup from 'yup'
import { useState } from 'react';
import { try_catch } from '@/utils/tools.js';
import { notes_api } from '@/utils/endpoints/deliverynotes.js';

export default function NoteCard({ note, setAlert, jwt }){

    const [isOpen, setIsOpen] = useState(false);


    const getFields = (format) => select(format, {
        'material' : {
            // Format debe ser un field no editable (Añadir esa funcionalidad)
            name : {
                label : 'Name of the note',
                type : 'text',
                placeholder : 'Example note',
                initial : null,
                validation : Yup.string().required('Required')
            },
            quantity : {
                label : 'Note code',
                type : 'text',
                placeholder : '300',
                initial : null,
                validation : Yup.string().required('Required')
            },
            unit : {
                label : 'Email',
                type : 'text',
                placeholder : 'Kg',
                initial : null,
                validation : Yup.string().required('Required')
            },
            price : {
                label : 'Email',
                type : 'text',
                placeholder : '2',
                initial : null,
                validation : Yup.string().required('Required')
            }
        },
        'hours' : {
            name : {
                label : 'Name of the note',
                type : 'text',
                placeholder : 'Francisco Gutierrez',
                initial : null,
                validation : Yup.string().required('Required')
            },
            hours : {
                label : 'Note code',
                type : 'text',
                placeholder : '8',
                initial : null,
                validation : Yup.string().required('Required')
            },
            description : {
                label : 'Email',
                type : 'text',
                placeholder : 'albañilería',
                initial : null,
                validation : Yup.string().required('Required')
            },
            price : {
                label : 'Email',
                type : 'text',
                placeholder : '20',
                initial : null,
                validation : Yup.string().required('Required')
            }
        }
    });

    const editNote = async (values) => {

        // Ensure jwt is available
        if(!jwt) return;

        setIsOpen(false);
        
        const [_, error] = await try_catch(notes_api.put.one(note._id, {
            name : values.name,
            noteCode : values.noteCode,
            email : values.email,
            address : {
                street : values.street,
                number : values.number,
                postal : values.postal,
                city : values.city,
                province : values.province
            },
            code : values.code,
            clientId : values.clientId
        }, 
        jwt));

        if(error) setAlert({ // Show error message
            message : 'An error occurred while creating the note',
            iconURL : '/multimedia/img/icons/delete.svg'
        }); 
        else setAlert({ // Show success message
            message : 'Note updated successfully',
            iconURL : '/multimedia/img/icons/confirm.svg'
        }); 
    }

    const deleteNote = async () => {

        // Ensure jwt is available
        if(!jwt) return;

        setIsOpen(false);

        const [_, error] = await try_catch(notes_api.delete.one(note._id, jwt));

        if(error) setAlert({ // Show error message
            message : 'An error occurred while deleting the note',
            iconURL : '/multimedia/img/icons/delete.svg'
        }); 
        else setAlert({ // Show success message
            message : 'Note deleted successfully',
            iconURL : '/multimedia/img/icons/confirm.svg'
        });
    }

    return (
        <div className="flex flex-col w-full h-fit p-2 rounded-md border-2">
            <div className="flex flex-row w-full h-fit">
                <div className="w-full h-fit mr-6">
                    <div className="flex justify-between items-center">
                        <h1 className="text-lg">{note.name}</h1>
                        <p className="text-lg">{note.cif}</p>
                    </div> 
                    <p className="text-slate-600 text-d">{note.address.street} {note.address.number}, {note.address.postal} {note.address.city}, {note.address.province}</p>
                </div>
                <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer flex justify-center items-center w-fit h-fit">
                    <Image
                        src={`/multimedia/img/icons/${isOpen ? 'delete' : 'edit'}.svg`}
                        alt="Edit Icon"
                        height={25}
                        width={25}
                    />
                </div>
            </div>
            {isOpen &&
                <>
                    <div className="w-full h-fit flex justify-center items-center mt-4"> 
                        <EasyForm
                            title=""
                            fields={getFields(note.format)}
                            handleSubmit={editNote}
                            submit_button_text="Save" 
                            custom_styles={null}
                            toFormikValidationSchema={Yup.object}
                        />
                    </div>
                    <DeleteNoteButton onClick={deleteNote} text="Delete" className="w-[15%] mt-4 to-red-500"/>
                </>
            }
        </div>
    );
}