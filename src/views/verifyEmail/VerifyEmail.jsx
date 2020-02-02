import React, { useEffect } from "react";
import CustomButton from "../../components/customButton";
import { connect } from "react-redux";
import { sendVerificationMail } from "../../store/action";

function VerifyEmail({ email, sendVerificationMail, history }) {
  useEffect(() => {
    if (email !== "") {
      sendVerificationMail();
    }
  }, [email]);
  return (
    <div className="email-verification-block">
      <div className="block-content">
        <div className="header-block">
          <h2>Email verification</h2>
        </div>
        <div className="text-content">
          <div className="info-block bg-red">
            <h2>Your email is not verified</h2>
            <span>Please verify your email address.</span>
          </div>
          <div className="details-block">
            <p>
              We have sent the verification mail-to
              <span className="email"> {email}</span>. If you cannot find the{" "}
              <i>email verification</i> mail in the index folder. Please check
              the Junk/Spam folder.
            </p>
            <p>
              If you did not receive the <i>email verification</i> mail, please
              click on the resend button.
            </p>
          </div>
        </div>
        <div className="button-holder">
          <CustomButton
            click={sendVerificationMail}
            bgColor="#ff4b2b"
            text="Resend Verification mail"
          >
            <i className="icon-arrow-right"></i>
          </CustomButton>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  const { email } = state;

  return {
    email
  };
};

export default connect(mapStateToProps, { sendVerificationMail })(VerifyEmail);
