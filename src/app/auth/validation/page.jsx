'use client'
import { validate } from '@/utils/endpoints/auth.js';
import { try_catch } from '@/utils/tools';

import * as Yup from 'yup'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import EasyForm from '@/components/triggers/forms/EasyForm.jsx';

// Validation fields definition
const fields = {
    code : {
        label : 'Code',
        type : 'text',
        placeholder : ' 123456',
        initial : '',
        validation : Yup.string().required('Required')
    }
}

export default function Validation(){

    const router = useRouter();

    const handleValidate = async (values) => {        
        
        const [_, error] = await try_catch(validate(values));

        if(error) alert('Invalid credentials')
        else router.push('/');
    }

    return (
        <>
            <EasyForm
                title="Validation"
                fields={fields}
                handleSubmit={handleValidate}
                submit_button_text="Submit"
            />
            <Link href="/auth/login" className="m-auto w-fit block mt-4">Already have an account?</Link>
        </> 
    );
}