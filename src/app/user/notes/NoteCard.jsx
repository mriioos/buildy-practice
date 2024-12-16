import EasyForm from '@/components/triggers/forms/EasyForm';
import DeleteNoteButton from "@/components/triggers/buttons/DefaultButton.jsx";
import Image from 'next/image';
import * as Yup from 'yup'
import { useState } from 'react';
import { try_catch, select } from '@/utils/tools.js';
import { deliverynotes_api } from '@/utils/endpoints/deliverynotes.js';

export default function NoteCard({ note, setAlert, jwt }){

    const [isOpen, setIsOpen] = useState(false);

    console.log(note);

    const getFields = (format) => ({
        "_ids" : {
            clientId : {
                label : 'Client ID',
                type : 'text',
                placeholder : '123456',
                initial : note.clientId,
                validation : Yup.string().required('Required')
            },
            projectId : {
                label : 'Project ID',
                type : 'text',
                placeholder : '123456',
                initial : note.projectId?._id || 'No project ID available',
                validation : Yup.string().required('Required')
            }
        },
        format : {
            label : 'Format',
            type : 'text',
            placeholder : 'Material',
            initial : format,
            validation : Yup.string().required('Required'),
            readOnly : true,
            hidden : true
        },
        name : {
            label : 'Name of the note',
            type : 'text',
            placeholder : 'No name available (Example note)',
            initial : note.name || '',
            validation : Yup.string().required('Required')
        },
        ...select(format, {
            'material' : {
                quantity : {
                    label : 'Quantity',
                    type : 'text',
                    placeholder : 'No quantity available (300)',
                    initial : note.quantity || '',
                    validation : Yup.string().required('Required')
                },
                unit : {
                    label : 'Unit',
                    type : 'text',
                    placeholder : 'No unit available (Kg)',
                    initial : note.unit || '',
                    validation : Yup.string().required('Required')
                }
            },
            'hours' : {
                hours : {
                    label : 'Hours',
                    type : 'text',
                    placeholder : 'No hours available (8)',
                    initial : note.hours || '',
                    validation : Yup.string().required('Required')
                },
                description : {
                    label : 'Description',
                    type : 'text',
                    placeholder : 'No description available (albañilería)',
                    initial : note.description || '',
                    validation : Yup.string().required('Required')
                }
            }
        }), 
        price : {
            label : 'Price',
            type : 'text',
            placeholder : '20',
            initial : note.price,
            validation : Yup.string().required('Required')
        }
    });

    const editNote = async (values) => {

        // Ensure jwt is available
        if(!jwt) return;

        setIsOpen(false);
        
        const [_, error] = await try_catch(deliverynotes_api.put.one(note._id, values, jwt));

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

        const [_, error] = await try_catch(deliverynotes_api.delete.one(note._id, jwt));

        if(error) setAlert({ // Show error message
            message : 'An error occurred while deleting the note',
            iconURL : '/multimedia/img/icons/delete.svg'
        }); 
        else setAlert({ // Show success message
            message : 'Note deleted successfully',
            iconURL : '/multimedia/img/icons/confirm.svg'
        });
    }

    const [format, setFormat] = useState(note.format);

    return (
        <div className="flex flex-col w-full h-fit p-2 rounded-md border-2">
            <div className="flex flex-row w-full h-fit">
                <div className="w-full h-fit mr-6">
                    <div className="flex justify-between items-center">
                        <h1 className="text-lg">{note.name || 'No name available'}</h1>
                        <p className="text-lg text-slate-600 text-d">({note._id})</p>
                        <p className={`text-lg font-bold ${note.pending ? 'text-yellow-600' : 'text-green-600'}`}>{note.pending ? 'PENDING' : 'COMPLETED'}</p>
                    </div>
                    <p className="text-slate-600">Format: {note.format}</p>
                    <p className="text-slate-600">Last update: {
                    (() => {
                        const date = new Date(note.updatedAt);
                        return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
                    })()}
                    </p>
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
                    <div className="flex justify-center mt-4">
                        <button onClick={() => setFormat('material')} className={`px-4 py-2 ${format === 'material' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                            Material
                        </button>
                        <button onClick={() => setFormat('hours')} className={`px-4 py-2 ml-2 ${format === 'hours' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                            Hours
                        </button>
                    </div>
                    <div className="w-full h-fit flex justify-center items-center mt-4"> 
                        <EasyForm
                            title=""
                            fields={getFields(format)}
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