import { deliverynotes_api } from '@/utils/endpoints/deliverynotes.js';
import { try_catch, select } from '@/utils/tools.js';
import Image from 'next/image';
import * as Yup from 'yup'
import EasyForm from '@/components/triggers/forms/EasyForm.jsx';
import Alert from '@/components/actuators/banners/Alert.jsx';
import ContentPad from '@/components/actuators/figures/ContentPad.jsx';

import { useState } from 'react';

// Alternative page component for creating a new note
export default function CreateNoteDialog({ closeDialog, jwt }){

    const [alert, setAlert] = useState({ visible : false, message : '', iconURL : null });

    const getFields = (format) => ({
        clientId : {
            label : 'Client ID',
            type : 'text',
            placeholder : '123456',
            initial : null,
            validation : Yup.string().required('Required')
        },
        projectId : {
            label : 'Project ID',
            type : 'text',
            placeholder : '123456',
            initial : null,
            validation : Yup.string().required('Required')
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
            placeholder : 'Example note',
            initial : '',
            validation : Yup.string().required('Required')
        },
        ...select(format, {
            'material' : {
                quantity : {
                    label : 'Quantity',
                    type : 'text',
                    placeholder : '300',
                    initial : null,
                    validation : Yup.string().required('Required')
                },
                unit : {
                    label : 'Unit',
                    type : 'text',
                    placeholder : 'Kg',
                    initial : null,
                    validation : Yup.string().required('Required')
                }
            },
            'hours' : {
                hours : {
                    label : 'Hours',
                    type : 'text',
                    placeholder : '8',
                    initial : null,
                    validation : Yup.string().required('Required')
                },
                description : {
                    label : 'Description',
                    type : 'text',
                    placeholder : 'albañilería',
                    initial : null,
                    validation : Yup.string().required('Required')
                }
            }
        }), 
        price : {
            label : 'Price',
            type : 'text',
            placeholder : '20',
            initial : null,
            validation : Yup.string().required('Required')
        }
    });

    const createNote = async (values) => {
    
        if(!jwt) return;

        console.log(values);

        const [_, error] = await try_catch(deliverynotes_api.post.one(values, jwt));

        if(error) setAlert({ // Show error message
            visible : true,
            message : 'An error occurred while creating the delivery note',
            iconURL : '/multimedia/img/icons/delete.svg'
        });

        else setAlert({ // Show success message
            visible : true,
            message : 'Delivery note created successfully',
            iconURL : '/multimedia/img/icons/confirm.svg'
        }); 
    }

    function closeAlert(){
        setAlert({ ...alert, visible : false });
        closeDialog();
    }

    const [format, setFormat] = useState('material');

    return(
        <>
            {alert.visible && <Alert message={alert.message} iconURL={alert.iconURL} close={closeAlert} />}
            <ContentPad className="relative h-fit" innerClassName={'max-h-[75vh] overflow-y-scroll'}>
                <div onClick={() => closeDialog()} className="absolute flex justify-center items-center top-4 left-4 cursor-pointer">
                    <Image
                        src="/multimedia/img/icons/back.svg"
                        alt="Note image"
                        height={35}
                        width={35}
                    />
                </div>
                <h1 className="text-2xl text-center">New note</h1>
                <div className="flex justify-center mt-4">
                    <button onClick={() => setFormat('material')} className={`px-4 py-2 ${format === 'material' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                        Material
                    </button>
                    <button onClick={() => setFormat('hours')} className={`px-4 py-2 ml-2 ${format === 'hours' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                        Hours
                    </button>
                </div>
                <div className="w-[90%] ml-auto mr-auto mt-4 mb-2">
                    <EasyForm
                        title=""
                        fields={getFields(format)}
                        handleSubmit={createNote}
                        submit_button_text="Save" 
                        custom_styles={null}
                        toFormikValidationSchema={Yup.object}
                    />
                </div>
            </ContentPad>
        </>
    )
};