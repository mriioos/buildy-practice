import styles from './auth_form.module.css'

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'

/**
 * @typedef Field
 * @example
 * {
 *  [name : string] : {
 *      label : string,
 *      type : string,
 *      placeholder : string,
 *      initial : string,
 *      validation : Yup
 *  }
 * }
 */

/**
 * Function that extracts a property of each field of an object of fields (maintaining field key)
 * Basically creates a new object with the key of tha field and just the value of that field
 * @example
 * fields = { 
 *  field_name : {
 *      property1 : value1,
 *      property2 : value2
 *  },
 *  field_name_2 : {
 *      property1 : value3,
 *      property2 : value4
 *  } 
 * } 
 * result = reduce_property(fields, property2)
 * result == {
 *  field_name : value2,
 *  field_name_2 : value4
 * }
 * @param {{[name : string] : Field}} object 
 * @param {string} inner_property 
 */
function reduce_property(fields, property){
    Object.keys(fields).reduce((object, key) => object[key] = fields[key][property], {})
}

/**
 * @param {{ [name : string] : Field }} fields
 * @returns 
 */
export default function AuthForm({ fields, handleSubmit }){
    return(
        <Formik 
            initialValues={reduce_property(fields, 'initial')}
            validationSchema={Yup.object(reduce_property(fields, 'validation'))}
            onSubmit={handleSubmit}
        >
            <Form>

                {Object.keys(fields).map(key =>
                    <div className={`${styles['auth-form-field']}`}>
                        <label htmlFor={key} className="">{fields[key].label}</label>
                        <Field name={key} type={fields[key].type} placeholder={fields[key].placeholder} />
                        <ErrorMessage name={key} component="div" style={{ color: 'red' }} />
                    </div>
                )}
                
                {/* Name Field */}
                <div className="auth-form-field">
                    <label className="">Name</label>
                    <Field name="name" type="text" placeholder="John" />
                    <ErrorMessage name="name" component="div" style={{ color: 'red' }} />
                </div>

                {/* Last name Field */}
                <div className="auth-form-field">
                    <label htmlFor="lastname">Last name</label>
                    <Field name="lastname" type="text" placeholder="Doe" />
                    <ErrorMessage name="lastname" component="div" style={{ color: 'red' }} />
                </div>

                {/* Email Field */}
                <div className="auth-form-field">
                    <label htmlFor="email">Email</label>
                    <Field name="email" type="email" placeholder="johndoe@example.ext" />
                    <ErrorMessage name="email" component="div" style={{ color: 'red' }} />
                </div>

                {/* Password Field */}
                <div className="auth-form-field">
                    <label htmlFor="password">Password</label>
                    <Field name="password" type="password" placeholder="********" />
                    <ErrorMessage name="password" component="div" style={{ color: 'red' }} />
                </div>

                {/* Confirm Password Field */}
                <div className="auth-form-field">
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
    )
}