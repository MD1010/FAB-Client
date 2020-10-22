import Alert from "@material-ui/lab/Alert/Alert";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { socket } from "src/services/socketManger";
import Spinner from "src/components/shared/Spinner";

type FormFields = {
  password: string;
  code: string;
};

enum LoginState {
  UnAuthenticated,
  WaitingForCode,
  LoggedIn,
}
type InfoMessage = {
  message: string;
  type: "success" | "info" | "warning" | "error" | undefined;
};
export default function LaunchAccountModal(props) {
  const { register, handleSubmit, errors, unregister } = useForm<FormFields>({
    mode: "onChange",
  });
  const [infoMessage, setInfoMessage] = useState<InfoMessage | null>(null);
  const [loginState, setLoginState] = useState<LoginState>(
    LoginState.UnAuthenticated
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    subscribeEvents();
  }, []);

  const launchAccount: SubmitHandler<FormFields> = async (data) => {
    setInfoMessage(null);
    setIsLoading(true);
    const { password } = data;
    const { res, error } = await props.connectAccount(props.email, password);
    setIsLoading(false);
    if (res) {
      const { codeRequired } = res;
      if (codeRequired === true) {
        setLoginState(LoginState.WaitingForCode);
      }
    } else if (error) {
      setLoginResult(null, error.msg);
    }
  };

  const sendCode: SubmitHandler<FormFields> = async (data) => {
    setInfoMessage(null);
    setIsLoading(true);
    const { res, error } = await props.sendCode(props.email, data.code);
    setIsLoading(false);
    console.log(error);
    if (error) {
      setLoginResult(null, error.error);
    }
  };

  const loginWithEmailAndPassword = () => (
    <form onSubmit={handleSubmit(launchAccount)}>
      <label>Email</label>
      <input name="email" value={props.email} disabled />

      <label>Password</label>
      <input
        name="password"
        type="password"
        ref={register({ required: true })}
      />
      {errors.password && (
        <div className="error-message">This field is required</div>
      )}

      <button type="submit" className="submit-form">
        Login
      </button>
    </form>
  );

  const loginWithAuthCode = () => {
    unregister("password");
    return (
      <form onSubmit={handleSubmit(sendCode)} autoComplete="off">
        <label>Code</label>
        <input
          name="code"
          ref={register({ required: true, pattern: new RegExp("^[0-9]{6,}$") })}
        />
        {errors.code?.type === "required" && (
          <div className="error-message">This field is required</div>
        )}
        {errors.code?.type === "pattern" && (
          <div className="error-message">
            The auth code is min 6 digit number
          </div>
        )}
        <button type="submit" className="submit-form">
          Send Code
        </button>
      </form>
    );
  };

  const accountLoginForm = () => {
    switch (loginState) {
      case LoginState.UnAuthenticated: {
        if (!isLoading) return loginWithEmailAndPassword();
        break;
      }
      case LoginState.WaitingForCode: {
        if (!isLoading) return loginWithAuthCode();
        break;
      }
      default:
        return loginWithEmailAndPassword();
    }
  };

  const subscribeEvents = () => {
    socket?.on("open", (message) => {
      setInfoMessage({ message, type: "info" });
    });
    socket?.on("credentialsCheck", (message) =>
      setInfoMessage({ message, type: "info" })
    );
    socket?.on("correctCredentials", (message) =>
      setInfoMessage({ message, type: "success" })
    );
    socket?.on("captchaCheck", (message) =>
      setInfoMessage({ message, type: "info" })
    );
  };

  const setLoginResult = (message, loginError) => {
    if (loginError) {
      setInfoMessage({ message: loginError, type: "error" });
    }
    if (message) {
      setLoginState(LoginState.LoggedIn);
      setInfoMessage({ message, type: "success" });
    }
  };
  return (
    <>
      {infoMessage ? (
        <Alert severity={infoMessage.type} style={{ marginBottom: "20px" }}>
          {infoMessage.message}
        </Alert>
      ) : null}
      {isLoading ? <Spinner /> : accountLoginForm()}
    </>
  );
}
