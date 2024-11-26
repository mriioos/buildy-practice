import { signup } from '@/utils/endpoints.js';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'

export default function SignUp(){

    // Define initial values
    const initialValues = { 
        name : 'John', 
        surname : 'Doe', 
        email: 'johndoe@domain.ext', 
        password: '0123456789acb' 
    }

    // Define validation schema
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().min(6, 'Must be 6 characters or more').required('Required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required')
    });

    return (
        <Formik 
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={signup}
        >
            <Form>
                
                {/* Username Field */}
                <div>
                    <label htmlFor="username">Username</label>
                    <Field name="username" type="text" />
                    <ErrorMessage name="username" component="div" style={{ color: 'red' }} />
                </div>

                {/* Email Field */}
                <div>
                    <label htmlFor="email">Email</label>
                    <Field name="email" type="email" />
                    <ErrorMessage name="email" component="div" style={{ color: 'red' }} />
                </div>

                {/* Password Field */}
                <div>
                    <label htmlFor="password">Password</label>
                    <Field name="password" type="password" />
                    <ErrorMessage name="password" component="div" style={{ color: 'red' }} />
                </div>

                {/* Confirm Password Field */}
                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <Field name="confirmPassword" type="password" />
                    <ErrorMessage name="confirmPassword" component="div" style={{ color: 'red' }} />
                </div>

                {/* Submit Button */}
                <div>
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                </div>
            </Form>
        </Formik>
    );
}