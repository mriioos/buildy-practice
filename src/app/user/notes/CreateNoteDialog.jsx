import { projects_api } from '@/utils/endpoints/projects.js';
import { try_catch } from '@/utils/tools.js';
import Image from 'next/image';
import * as Yup from 'yup'
import EasyForm from '@/components/triggers/forms/EasyForm.jsx';
import Alert from '@/components/actuators/banners/Alert.jsx';
import ContentPad from '@/components/actuators/figures/ContentPad.jsx';

import { useState } from 'react';

// Alternative page component for creating a new project
export default function CreateProjectDialog({ closeDialog, jwt }){

    const [alert, setAlert] = useState({ visible : false, message : '', iconURL : null });

    const fields = {
        name : {
            label : 'Name of the project',
            type : 'text',
            placeholder : 'Example project',
            initial : '',
            validation : Yup.string().required('Required')
        },
        projectCode : {
            label : 'Project code',
            type : 'text',
            placeholder : '123456',
            initial : '',
            validation : Yup.string().required('Required')
        },
        email : {
            label : 'Email',
            type : 'text',
            placeholder : 'youremail@yourdomain.com',
            initial : '',
            validation : Yup.string().email('Invalid email').required('Required')
        },
        "Address" : {
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
            postal : {
                label : '',
                type : 'text',
                placeholder : 'Postal Code',
                initial : '',
                validation : Yup.string().required('Required')
            }
        },
        code : {
            label : 'Internal code',
            type : 'text',
            placeholder : '123456',
            initial : '',
            validation : Yup.string().required('Required')
        },
        clientId : {
            label : 'Client ID',
            type : 'text',
            placeholder : '123456',
            initial : '',
            validation : Yup.string().required('Required')
        }
    }

    const createProject = async (values) => {

        if(!jwt) return;

        const [_, error] = await try_catch(projects_api.post.one({
            name : values.name,
            projectCode : values.projectCode,
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
            visible : true,
            message : 'An error occurred while creating the project',
            iconURL : '/multimedia/img/icons/delete.svg'
        }); 
        else setAlert({ // Show success message
            visible : true,
            message : 'Project created successfully',
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
            <ContentPad className="relative h-fit" innerClassName={'max-h-[75vh] overflow-y-scroll'}>
                <div onClick={() => closeDialog()} className="absolute flex justify-center items-center top-4 left-4 cursor-pointer">
                    <Image
                        src="/multimedia/img/icons/back.svg"
                        alt="Project image"
                        height={35}
                        width={35}
                    />
                </div>
                <h1 className="text-2xl text-center">New project</h1>
                <div className="w-[90%] ml-auto mr-auto mt-4 mb-2">
                    <EasyForm
                        title=""
                        fields={fields}
                        handleSubmit={createProject}
                        submit_button_text="Save" 
                        custom_styles={null}
                        toFormikValidationSchema={Yup.object}
                    />
                </div>
            </ContentPad>
        </>
    )
};