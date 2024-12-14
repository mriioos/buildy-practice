'use client'
import { login } from '@/utils/endpoints/auth.js';
import { try_catch } from '@/utils/tools';
import * as Yup from 'yup'
import Link from "next/link";
import { useRouter } from 'next/navigation';
import EasyForm from '@/components/triggers/forms/EasyForm.jsx';

// Login fields definition
const fields = {
    email : {
        label : 'Email',
        type : 'email',
        placeholder : ' johndoe@example.ext',
        initial : '',
        validation : Yup.string().email('Invalid email').required('Required')
    },
    password : {
        label : 'Password',
        type : 'password',
        placeholder : ' ********',
        initial : '',
        validation : Yup.string().required('Required')
    }
}

export default function Login(){

    const router = useRouter();

    const handleLogin = async (values) => {

        const [success, error] = await try_catch(login(values));

        if(success){
            localStorage.setItem('bildyJWT', success.token);
            router.push('/');
        }
        else alert(error.message)
    }

    return (
        <>
            <EasyForm
                title="Login"
                fields={fields}
                handleSubmit={handleLogin}
                submit_button_text="Submit" 
                custom_styles={null}
                toFormikValidationSchema={Yup.object}
            />
            
            <Link href="/auth/signup" className="m-auto w-fit block mt-4">Don't have an account?</Link>
        </>
    )
}