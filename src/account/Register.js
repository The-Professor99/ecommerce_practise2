import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { accountService, alertService } from '@/_services';
import { Alert } from '@/_components'

import './Register.css';

function Register() {
    const [show2, setShow2] = useState(false);
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    const initialValues = {
        title: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .required('Title is required'),
        firstName: Yup.string()
            .required('First Name is required'),
        lastName: Yup.string()
            .required('Last Name is required'),
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
        acceptTerms: Yup.bool()
            .oneOf([true], 'Accept Terms & Conditions is required')
    });

    function onSubmit(fields, { setStatus, setSubmitting }) {
        setStatus();
        accountService.register(fields)
            .then(() => {
                alertService.success('Registration successful, please check your email for verification instructions', { keepAfterRouteChange: true });
                navigate('/account/login');
            })
            .catch(error => {
                setSubmitting(false);
                alertService.error(error)
            });
    }

    return (
        <>
        <Alert />
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ errors, touched, isSubmitting }) => (
                <Form className='Register txt-black-white w-75 m-auto'>
                    <h3 className="card-header text-center">Create an Account</h3>
                    <div className="card-body">
                        <div className="form-row d-flex">
                            <div className="form-group col me-2">
                                <label>Title</label>
                                <Field name="title" as="select" className={'form-control' + (errors.title && touched.title ? ' is-invalid' : '')}>
                                    <option value=""></option>
                                    <option value="Mr">Mr</option>
                                    <option value="Mrs">Mrs</option>
                                    <option value="Miss">Miss</option>
                                    <option value="Ms">Ms</option>
                                </Field>
                                <ErrorMessage name="title" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group col-5 me-2">
                                <label>First Name</label>
                                <Field name="firstName" type="text" className={'form-control' + (errors.firstName && touched.firstName ? ' is-invalid' : '')} />
                                <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group col-5">
                                <label>Last Name</label>
                                <Field name="lastName" type="text" className={'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')} />
                                <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
                            </div>
                        </div>
                        <div className="form-group mt-2">
                            <label>Email</label>
                            <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                            <ErrorMessage name="email" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-row mt-2">
                            <div className="form-group col">
                                <label>Password</label>
                                <Field name="password" type={show ? 'text' : 'password'} className={'d-none password form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                <div className='d-flex'>
                                    <Field name="password" type={show ? 'text' : 'password'} className={'password form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                    <div className='toggle-eye' onClick={() => setShow(!show)}>
                                        <span className='eye'>
                                        {!show ? (
                                            <i className="fas fa-eye" ></i>
                                        ) : (
                                            <i className="eye fas fa-eye-slash"></i>
                                        )}
                                        </span> 
                                        {/* <span><i className="eye fas fa-eye-slash"></i></span> */}
                                    </div>
                                </div>
                                <ErrorMessage name="password" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group col mt-2">
                                <label>Confirm Password</label>
                                <Field name="confirmPassword" type={show2 ? 'text' : 'password'} className={'d-none confirm-password form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')} />
                                <div className='d-flex'>
                                    <Field name="confirmPassword" type={show2 ? 'text' : 'password'} className={'confirm-password form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')} />
                                    <div className='toggle-eye' onClick={() => setShow2(!show2)}>
                                        <span className='eye'>
                                        {!show2 ? (
                                            <i className="fas fa-eye" ></i>
                                        ) : (
                                            <i className="eye fas fa-eye-slash"></i>
                                        )}
                                        </span> 
                                        {/* <span><i className="eye fas fa-eye-slash"></i></span> */}
                                    </div>
                                </div>
                                <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                            </div>
                        </div>
                        <div className="form-group form-check mt-2">
                            <Field type="checkbox" name="acceptTerms" id="acceptTerms" className={'form-check-input ' + (errors.acceptTerms && touched.acceptTerms ? ' is-invalid' : 'valid')} />
                            <label htmlFor="acceptTerms" className="form-check-label">Accept <a href='#!'>Terms & Conditions</a></label>
                            <ErrorMessage name="acceptTerms" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group mt-2">
                            <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                                {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                Register
                            </button>
                            <Link to="/account/login" className="btn btn-link">Cancel</Link>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
        </>
    )
}

export { Register };