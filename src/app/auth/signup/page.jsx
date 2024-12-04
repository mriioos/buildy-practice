'use client'
import { signup } from '@/utils/users.js';
import { try_catch } from '@/utils/tools';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignUp(){

    const router = useRouter();

    // Define validation schema
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().min(6, 'Must be 6 characters or more').required('Required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required')
    });

    // Define initial values
    const initialValues = {
        email: '',
        password: '',
        confirmPassword: ''
    }

    const handleSignup = async (values) => {

        const [_, error] = await try_catch(signup(values));

        if(error) alert('Invalid credentials')
        else router.push('/auth/validation');
    }

    return (
        <>
            <h1>Sign Up</h1>
            <Formik 
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSignup}
            >
                <Form>
                    
                    {/* Name Field */}
                    <div>
                        <label htmlFor="name">Name</label>
                        <Field name="name" type="text" placeholder="John" />
                        <ErrorMessage name="name" component="div" style={{ color: 'red' }} />
                    </div>

                    {/* Last name Field */}
                    <div>
                        <label htmlFor="lastname">Last name</label>
                        <Field name="lastname" type="text" placeholder="Doe" />
                        <ErrorMessage name="lastname" component="div" style={{ color: 'red' }} />
                    </div>

                    {/* Email Field */}
                    <div>
                        <label htmlFor="email">Email</label>
                        <Field name="email" type="email" placeholder="johndoe@example.ext" />
                        <ErrorMessage name="email" component="div" style={{ color: 'red' }} />
                    </div>

                    {/* Password Field */}
                    <div>
                        <label htmlFor="password">Password</label>
                        <Field name="password" type="password" placeholder="********" />
                        <ErrorMessage name="password" component="div" style={{ color: 'red' }} />
                    </div>

                    {/* Confirm Password Field */}
                    <div>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <Field name="confirmPassword" type="password" placeholder="********" />
                        <ErrorMessage name="confirmPassword" component="div" style={{ color: 'red' }} />
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button type="submit">Sign up</button>
                    </div>
                </Form>
            </Formik>
            <Link href="/auth/login">Already have an account?</Link>
        </> 
    );
}