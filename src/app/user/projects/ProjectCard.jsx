import EasyForm from '@/components/triggers/forms/EasyForm';
import DeleteProjectButton from "@/components/triggers/buttons/DefaultButton.jsx";
import Image from 'next/image';
import * as Yup from 'yup'
import { useState } from 'react';
import { try_catch } from '@/utils/tools.js';
import { projects_api } from '@/utils/endpoints/projects';

export default function ProjectCard({ project, setAlert, jwt }){

    const [isOpen, setIsOpen] = useState(false);

    const fields = {
        name : {
            label : 'Name of the project',
            type : 'text',
            placeholder : 'Example project',
            initial : project.name,
            validation : Yup.string().required('Required')
        },
        projectCode : {
            label : 'Project code',
            type : 'text',
            placeholder : '123456',
            initial : project.projectCode,
            validation : Yup.string().required('Required')
        },
        email : {
            label : 'Email',
            type : 'text',
            placeholder : 'youremail@yourdomain.com',
            initial : project.email,
            validation : Yup.string().email('Invalid email').required('Required')
        },
        "Address" : {
            province : {
                label : '',
                type : 'text',
                placeholder : 'Province Name',
                initial : project.address.province,
                validation : Yup.string().required('Required')
            },
            city : {
                label : '',
                type : 'text',
                placeholder : 'City Name',
                initial : project.address.city,
                validation : Yup.string().required('Required')
            },  
            street : {
                label : '',
                type : 'text',
                placeholder : 'Street Name',
                initial : project.address.street,
                validation : Yup.string().required('Required')
            },
            number : {
                label : '',
                type : 'text',
                placeholder : 'House number',
                initial : project.address.number,
                validation : Yup.string().required('Required')
            },
            postal : {
                label : '',
                type : 'text',
                placeholder : 'Postal Code',
                initial : project.address.postal,
                validation : Yup.string().required('Required')
            }
        },
        code : {
            label : 'Internal code',
            type : 'text',
            placeholder : '123456',
            initial : project.code,
            validation : Yup.string().required('Required')
        },
        clientId : {
            label : 'Client ID',
            type : 'text',
            placeholder : '123456',
            initial : project.clientId,
            validation : Yup.string().required('Required')
        }
    }

    const editProject = async (values) => {

        // Ensure jwt is available
        if(!jwt) return;

        setIsOpen(false);
        
        const [_, error] = await try_catch(projects_api.put.one(project._id, {
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
            message : 'An error occurred while creating the project',
            iconURL : '/multimedia/img/icons/delete.svg'
        }); 
        else setAlert({ // Show success message
            message : 'Project updated successfully',
            iconURL : '/multimedia/img/icons/confirm.svg'
        }); 
    }

    const deleteProject = async () => {

        // Ensure jwt is available
        if(!jwt) return;

        setIsOpen(false);

        const [_, error] = await try_catch(projects_api.delete.one(project._id, jwt));

        if(error) setAlert({ // Show error message
            message : 'An error occurred while deleting the project',
            iconURL : '/multimedia/img/icons/delete.svg'
        }); 
        else setAlert({ // Show success message
            message : 'Project deleted successfully',
            iconURL : '/multimedia/img/icons/confirm.svg'
        });
    }
    
    return (
        <div className="flex flex-col w-full h-fit p-2 rounded-md border-2">
            <div className="flex flex-row w-full h-fit">
                <div className="w-full h-fit mr-6">
                    <div className="flex justify-between items-center">
                        <h1 className="text-lg">{project.name}</h1>
                        <p className="text-lg text-slate-600 text-d">({project._id})</p>
                        <p className={`text-lg font-bold ${project.active ? 'text-yellow-600' : 'text-green-600'}`}>{project.active ? 'PENDING' : 'COMPLETED'}</p>
                    </div> 
                    <p className="text-slate-600">{project.address.street} {project.address.number}, {project.address.postal} {project.address.city}, {project.address.province}</p>
                    <p className="text-slate-600">Last update: {
                    (() => {
                        const date = new Date(project.updatedAt);
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
                    <div className="w-full h-fit flex justify-center items-center mt-4"> 
                        <EasyForm
                            title=""
                            fields={fields}
                            handleSubmit={editProject}
                            submit_button_text="Save" 
                            custom_styles={null}
                            toFormikValidationSchema={Yup.object}
                        />
                    </div>
                    <DeleteProjectButton onClick={deleteProject} text="Delete" className="w-[15%] mt-4 to-red-500"/>
                </>
            }
        </div>
    );
}