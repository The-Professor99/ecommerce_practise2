import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import { accountService } from '@/_services';
import { Alert } from '@/_components'
import { alertService } from '../_services/alert.service';

function ResetPassword() {
    const TokenStatus = {
        Validating: 'Validating',
        Valid: 'Valid',
        Invalid: 'Invalid'
    }

    const [show2, setShow2] = useState(false);
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const [token, setToken] = useState(null);
    const [tokenStatus, setTokenStatus] = useState(TokenStatus.Validating);

    let [searchParams] = useSearchParams();
    

    useEffect(() => {

        let token = searchParams.get("token") || '';

        console.log(token)
        // remove token from url to prevent http referer leakage
        navigate(location.pathname, { replace: true });

        accountService.validateResetToken(token)
            .then(() => {
                setToken(token);
                setTokenStatus(TokenStatus.Valid);
            })
            .catch(() => {
                setTokenStatus(TokenStatus.Invalid);
            });
    }, []);

    function getForm() {
        const initialValues = {
            password: '',
            confirmPassword: ''
        };

        const validationSchema = Yup.object().shape({
            password: Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .required('Password is required'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Confirm Password is required'),
        });

        function onSubmit({ password, confirmPassword }, { setSubmitting }) {
            alertService.clear();
            accountService.resetPassword({ token, password, confirmPassword })
                .then(() => {
                    alertService('Password reset successful, you can now login', { keepAfterRouteChange: true });
                    navigate('/account/login');
                })
                .catch(error => {
                    setSubmitting(false);
                    alertService.error(error);
                });
        }

        return (
            <>
            <Alert />
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {({ errors, touched, isSubmitting }) => (
                    <Form className="ResetPassword  txt-black-white w-75 m-auto">
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
                        <div className="form-row mt-2">
                            <div className="form-group col">
                                <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                                    {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                    Reset Password
                                </button>
                                <Link to="/account/login" className="btn btn-link">Cancel</Link>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
            </>
        );
    }

    function getBody() {
        switch (tokenStatus) {
            case TokenStatus.Valid:
                return getForm();
            case TokenStatus.Invalid:
                return <div>Token validation failed, if the token has expired you can get a new one at the <Link to="/account/forgot-password">forgot password</Link> page.</div>;
            case TokenStatus.Validating:
                return <div>Validating token...</div>;
        }
    }

    return (
        <div>
            <h3 className="card-header txt-black-white text-center">Reset Password</h3>
            <div className="card-body txt-black-white">{getBody()}</div>
        </div>
    )
}

export { ResetPassword }; 