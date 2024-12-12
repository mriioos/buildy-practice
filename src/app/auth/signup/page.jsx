'use client'

import "@/app/globals.css";

import { signup } from '@/utils/endpoints/auth.js';
import { try_catch } from '@/utils/tools';

import * as Yup from 'yup'
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import EasyForm from '@/components/triggers/forms/EasyForm.jsx';

// Sign up fields definition

const fields = {
    "Complete name" : {
        name : {
            label : '',
            type : 'text',
            placeholder : ' John',
            initial : '',
            validation : Yup.string().required('Required')
        },
        lastname : {
            label : '',
            type : 'text',
            placeholder : ' Doe',
            initial : '',
            validation : Yup.string().required('Required')
        }
    },
    email : {
        label : 'Email',
        type : 'email',
        placeholder : ' johndoe@example.ext',
        initial : '',
        validation : Yup.string().email('Invalid email').required('Required')
    },
    "" : { // Aquí se puede poner un campo vacío para que no haya un título, pero solo se puede una vez (Habría que cambiarlo)
        password : {
            label : 'Password',
            type : 'password',
            placeholder : ' ********',
            initial : '',
            validation : Yup.string().min(6, 'Must be 6 characters or more').required('Required')
        },
        confirmPassword : {
            label : 'Confirm Password',
            type : 'password',
            placeholder : ' ********',
            initial : '',
            validation : Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Confirm Password is required')
        }
    }
}

export default function SignUp(){

    const router = useRouter();

    const handleSignup = async (values) => {

        const [_, error] = await try_catch(signup(values));

        if(error) alert('Invalid credentials')
        else router.push('/auth/validation');
    }

    return (
        <>
            <EasyForm 
                title="Sign Up"
                fields={fields} 
                handleSubmit={handleSignup} 
                submit_button_text="Sign up" 
                custom_styles={null}
            />

            <Link href="/auth/login" className="m-auto w-fit block mt-4">Already have an account?</Link>
        </> 
    );
}