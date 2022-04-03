import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import { accountService } from "@/_services";
import { Alert } from "@/_components";
import { alertService } from "../_services/alert.service";

function VerifyEmail() {
  const EmailStatus = {
    Verifying: "Verifying",
    Failed: "Failed",
  };

  const [emailStatus, setEmailStatus] = useState(EmailStatus.Verifying);
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();

  let token = searchParams.get("token") || "";
  useEffect(() => {
    // remove token from url to prevent http referer leakage
    navigate(location.pathname, { replace: true });

    accountService
      .verifyEmail(token)
      .then(() => {
        alertService.success("Verification successful, you can now login", {
          keepAfterRouteChange: true,
        });
        navigate("/account/login");
      })
      .catch(() => {
        setEmailStatus(EmailStatus.Failed);
      });
  }, []);

  function getBody() {
    switch (emailStatus) {
      case EmailStatus.Verifying:
        return <div>Verifying...</div>;
      case EmailStatus.Failed:
        return (
          <div>
            Verification failed, you can also verify your account using the{" "}
            <Link to="forgot-password">forgot password</Link> page.
          </div>
        );
    }
  }

  return (
    <>
      <Alert />
      <div className="w-75 m-auto">
        <h3 className="card-header txt-black-white">Verify Email</h3>
        <div className="card-body txt-black-white">{getBody()}</div>
      </div>
    </>
  );
}

export { VerifyEmail };
