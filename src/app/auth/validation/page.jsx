'use client'
import { validate } from '@/utils/endpoints/auth.js';
import { try_catch } from '@/utils/tools';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Validation(){

    const router = useRouter();

    // Define validation schema
    const validationSchema = Yup.object({
        code: Yup.string().required('Required')
    });

    // Define initial values
    const initialValues = {
        code: ''
    };

    const handleValidate = async (values) => {        
        
        const [_, error] = await try_catch(validate(values));

        if(error) alert('Invalid credentials')
        else router.push('/');
    }

    return (
        <>
            <h1>Validate</h1>
            <Formik 
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleValidate}
            >
                <Form>
                    
                    {/* Code Field */}
                    <div>
                        <label htmlFor="code">Code</label>
                        <Field name="code" type="text" placeholder="123456" />
                        <ErrorMessage name="code" component="div" style={{ color: 'red' }} />
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button type="submit">Validate</button>
                    </div>
                </Form>
            </Formik>
            <Link href="/auth/login">Already have an account?</Link>
        </> 
    );
}