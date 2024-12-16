import { clients_api } from '@/utils/endpoints/clients.js';
import { try_catch } from '@/utils/tools.js';
import Image from 'next/image';
import * as Yup from 'yup'
import EasyForm from '@/components/triggers/forms/EasyForm.jsx';
import Alert from '@/components/actuators/banners/Alert.jsx';
import ContentPad from '@/components/actuators/figures/ContentPad.jsx';

import { useState } from 'react';

// Alternative page component for creating a new client
export default function CreateClientDialog({ closeDialog, jwt }){

    const [alert, setAlert] = useState({ visible : false, message : '', iconURL : null });

    const fields = {
        name : {
            label : 'Name of the client or company',
            type : 'text',
            placeholder : 'John Doe',
            initial : '',
            validation : Yup.string().required('Required')
        },
        "Tax domicile" : {
            province : {
                label : '',
                type : 'text',
                placeholder : 'Province Name',
                initial : '',
                validation : Yup.string().required('Required')
            },
            city : {
                label : '',
                type : 'text',
                placeholder : 'City Name',
                initial : '',
                validation : Yup.string().required('Required')
            },  
            street : {
                label : '',
                type : 'text',
                placeholder : 'Street Name',
                initial : '',
                validation : Yup.string().required('Required')
            },
            number : {
                label : '',
                type : 'text',
                placeholder : 'House number',
                initial : '',
                validation : Yup.string().required('Required')
            },
            postal_code : {
                label : '',
                type : 'text',
                placeholder : 'Postal Code',
                initial : '',
                validation : Yup.string().required('Required')
            }
        },
        cif : {
            label : 'NIF (optional)',
            type : 'text',
            placeholder : '12345678A',
            initial : '',
            validation : Yup.string()
        }
    }

    const createClient = async (values) => {

        if(!jwt) return;

        const [_, error] = await try_catch(clients_api.post.one({ 
            name : values.name,
            cif : values.cif,
            address : {
                street : values.street,
                number : values.number,
                postal : values.postal_code,
                city : values.city,
                province : values.province
            }
        }, 
        jwt));

        if(error) setAlert({ // Show error message
            visible : true,
            message : 'An error occurred while creating the client',
            iconURL : '/multimedia/img/icons/delete.svg'
        }); 
        else setAlert({ // Show success message
            visible : true,
            message : 'Client created successfully',
            iconURL : '/multimedia/img/icons/confirm.svg'
        }); 
    }

    function closeAlert(){
        setAlert({ ...alert, visible : false });
        closeDialog();
    }

    return(
        <>
            {alert.visible && <Alert message={alert.message} iconURL={alert.iconURL} close={closeAlert} />}
            <ContentPad className="relative max-w-[60%] h-fit">
                <div onClick={() => closeDialog()} className="absolute flex justify-center items-center top-4 left-4 cursor-pointer">
                    <Image
                        src="/multimedia/img/icons/back.svg"
                        alt="Client image"
                        height={35}
                        width={35}
                    />
                </div>
                <h1 className="text-2xl text-center">New client</h1>
                <div className="w-[90%] ml-auto mr-auto mt-4 mb-2">
                    <EasyForm
                        title=""
                        fields={fields}
                        handleSubmit={createClient}
                        submit_button_text="Save" 
                        custom_styles={null}
                        toFormikValidationSchema={Yup.object}
                    />
                </div>
            </ContentPad>
            <div className="flex-grow max-w-[40%] flex flex-col">
                <ContentPad>
                    <p>???</p>
                </ContentPad>
                <ContentPad>
                    <p>???</p>
                </ContentPad>
                <ContentPad>
                    <p>???</p>
                </ContentPad>
            </div>
        </>
    )
};