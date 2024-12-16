import EasyForm from '@/components/triggers/forms/EasyForm';
import DeleteClientButton from "@/components/triggers/buttons/DefaultButton.jsx";
import Image from 'next/image';
import * as Yup from 'yup'
import { useState } from 'react';
import { clients_api } from '@/utils/endpoints/clients.js';
import { try_catch } from '@/utils/tools.js';

export default function ClientCard({ client, setAlert, jwt }){

    const [isOpen, setIsOpen] = useState(false);

    const fields = {
        name : {
            label : 'Name of the client or company',
            type : 'text',
            placeholder : 'John Doe',
            initial : client.name,
            validation : Yup.string().required('Required')
        },
        "Tax domicile" : {
            province : {
                label : '',
                type : 'text',
                placeholder : 'Province Name',
                initial : client.address.province,
                validation : Yup.string().required('Required')
            },
            city : {
                label : '',
                type : 'text',
                placeholder : 'City Name',
                initial : client.address.city,
                validation : Yup.string().required('Required')
            },  
            street : {
                label : '',
                type : 'text',
                placeholder : 'Street Name',
                initial : client.address.street,
                validation : Yup.string().required('Required')
            },
            number : {
                label : '',
                type : 'text',
                placeholder : 'House number',
                initial : client.address.number,
                validation : Yup.string().required('Required')
            },
            postal_code : {
                label : '',
                type : 'text',
                placeholder : 'Postal Code',
                initial : client.address.postal,
                validation : Yup.string().required('Required')
            }
        },
        cif : {
            label : 'NIF (optional)',
            type : 'text',
            placeholder : '12345678A',
            initial : client.cif,
            validation : Yup.string()
        }
    }

    const editClient = async (values) => {

        // Ensure jwt is available
        if(!jwt) return;

        setIsOpen(false);
        
        const [_, error] = await try_catch(clients_api.put.one(client._id, { 
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
            message : 'An error occurred while creating the client',
            iconURL : '/multimedia/img/icons/delete.svg'
        }); 
        else setAlert({ // Show success message
            message : 'Client updated successfully',
            iconURL : '/multimedia/img/icons/confirm.svg'
        }); 
    }

    const deleteClient = async () => {

        // Ensure jwt is available
        if(!jwt) return;

        setIsOpen(false);

        const [_, error] = await try_catch(clients_api.delete.one(client._id, jwt));

        if(error) setAlert({ // Show error message
            message : 'An error occurred while deleting the client',
            iconURL : '/multimedia/img/icons/delete.svg'
        }); 
        else setAlert({ // Show success message
            message : 'Client deleted successfully',
            iconURL : '/multimedia/img/icons/confirm.svg'
        });
    }

    return (
        <div className="flex flex-col w-full h-fit p-2 rounded-md border-2">
            <div className="flex flex-row w-full h-fit">
                <div className="w-full h-fit mr-6">
                    <div className="flex justify-between items-center">
                        <h1 className="text-lg">{client.name}</h1>
                        <p className="text-lg">{client.cif}</p>
                    </div> 
                    <p className="text-slate-600 text-d">{client.address.street} {client.address.number}, {client.address.postal} {client.address.city}, {client.address.province}</p>
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
                            fields={fields}
                            handleSubmit={editClient}
                            submit_button_text="Save" 
                            custom_styles={null}
                            toFormikValidationSchema={Yup.object}
                        />
                    </div>
                    <DeleteClientButton onClick={deleteClient} text="Delete" className="w-[15%] mt-4 to-red-500"/>
                </>
            }
        </div>
    );
}