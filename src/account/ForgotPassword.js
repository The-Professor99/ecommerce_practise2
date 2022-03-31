import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import './ForgotPassword.css';

function ForgotPassword() {    
    const initialValues = {
        email: ''
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required')
    });

    function onSubmit({ email }, { setSubmitting }) {
        alertService.clear();
        accountService.forgotPassword(email)
            .then(() => alert('Please check your email for password reset instructions'))
            .catch(error => alert(error))
            .finally(() => setSubmitting(false));
    }

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ errors, touched, isSubmitting }) => (
                <Form className='ForgotPassword  txt-black-white w-75 m-auto'>
                    <h3 className="card-header text-center">Forgot Password</h3>
                    <div className="card-body">
                        <div className="form-group mt-2">
                            <label>Email</label>
                            <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                            <ErrorMessage name="email" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-row mt-2">
                            <div className="form-group col">
                                <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                                    {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                    Submit
                                </button>
                                <Link to="/account/login" className="btn btn-link">Cancel</Link>
                            </div>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>  
    )
}

export { ForgotPassword }