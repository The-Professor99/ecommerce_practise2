import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { accountService, alertService } from "@/_services";
import { Alert } from "@/_components";
import "./Login.css";

function Login() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  function onSubmit({ email, password }, { setSubmitting }) {
    alertService.clear();
    accountService
      .login(email, password)
      .then(() => {
        const { from } = location.state || { from: { pathname: "/profile/" } };
        navigate(from);
      })
      .catch((error) => {
        setSubmitting(false);
        alertService.error(error);
      });
  }

  return (
    <>
      <Alert />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="Login  txt-black-white w-75 m-auto">
            <h3 className="card-header  text-center">Login</h3>
            <div className="card-body">
              <div className="form-group mt-2">
                <label>Email</label>
                <Field
                  name="email"
                  type="text"
                  className={
                    "form-control" +
                    (errors.email && touched.email ? " is-invalid" : "")
                  }
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-group mt-2">
                <label>Password</label>
                <Field
                  name="password"
                  type={show ? "text" : "password"}
                  className={
                    "d-none password form-control" +
                    (errors.password && touched.password ? " is-invalid" : "")
                  }
                />
                <div className="d-flex">
                  <Field
                    name="password"
                    type={show ? "text" : "password"}
                    className={
                      "password form-control" +
                      (errors.password && touched.password ? " is-invalid" : "")
                    }
                  />
                  <div className="toggle-eye" onClick={() => setShow(!show)}>
                    <span className="eye">
                      {!show ? (
                        <i className="fas fa-eye"></i>
                      ) : (
                        <i className="eye fas fa-eye-slash"></i>
                      )}
                    </span>
                    {/* <span><i className="eye fas fa-eye-slash"></i></span> */}
                  </div>
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-row mt-2">
                <div className="form-group col">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary"
                  >
                    {isSubmitting && (
                      <span className="spinner-border spinner-border-sm mr-1"></span>
                    )}
                    Login
                  </button>
                  <Link to="/account/register" className="btn btn-link">
                    Register
                  </Link>
                </div>
                <div className="form-group col text-right">
                  <Link
                    to="/account/forgot-password"
                    className="btn btn-link pr-0"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export { Login };
