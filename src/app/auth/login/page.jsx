'use client'
import { login } from '@/utils/users.js';
import { try_catch } from '@/utils/tools';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import Link from "next/link";
import { useRouter } from 'next/navigation';

export default function Login(){

    const router = useRouter();

    // Define validation schema
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().min(6, 'Must be 6 characters or more').required('Required')
    });

    // Define initial values
    const initialValues = {
        email: '',
        password: ''
    }

    const handleLogin = async (values) => {

        const [_, error] = await try_catch(login(values));

        if(error) alert('Invalid credentials')
        else router.push('/');
    }

    return (
        <>
            <h1>Login</h1>
            <Formik 
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleLogin}
            >
                <Form>

                    {/* Email Field */}
                    <div>
                        <label htmlFor="email">Email</label>
                        <Field id="email" name="email" type="email" placeholder="johndoe@example.ext" />
                        <ErrorMessage name="email" component="div" style={{ color: 'red' }} />
                    </div>

                    {/* Password Field */}
                    <div>
                        <label htmlFor="password">Password</label>
                        <Field id="password" name="password" type="password" placeholder="********" />
                        <ErrorMessage name="password" component="div" style={{ color: 'red' }} />
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </Form>
            </Formik>
            <Link href="/auth/signup">Don't have an account?</Link>
        </>
    )
}