import { Button, TextField } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { AppContext } from "src/context/AppContext";
import { getLoggedInUser } from "src/services/auth";
import { setToken, TokenType } from "src/services/jwt";
import { httpClient, makeRequest } from "src/services/request";
import { RequestMethod } from "src/types/RequestMethod";
import { LOGIN_ENDPOINT } from "../../consts/endpoints";
import "./LoginForm.style.scss";

export default function LoginPage() {
  const { setLoggedInUser } = useContext(AppContext);
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();
  const [loginError, setLoginError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const onSubmit = async (loginFields) => {
    setIsSubmitting(true);
    const { username, password } = loginFields;
    const [data, error] = await makeRequest({
      url: LOGIN_ENDPOINT,
      method: RequestMethod.POST,
      body: { username, password: password },
    });
    setIsSubmitting(false);
    if (data) {
      setToken(TokenType.ACCESS, data.access_token);
      setToken(TokenType.REFRESH, data.refresh_token);
      httpClient.defaults.headers["Authorization"] =
        "Bearer " + data.access_token;
      setLoggedInUser(getLoggedInUser());
      // history.push("/");
    } else {
      setLoginError(error.msg || error);
    }
  };

  return (
    <form
      className="login-form"
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
    >
      <TextField
        id="standart-basic"
        label="UserName"
        type="text"
        name="username"
        inputRef={register({ required: true })}
      />

      {errors.username && errors.username.type === "required" && (
        <p className="error-message">UserName is required</p>
      )}

      <TextField
        id="standart-basic"
        label="password"
        type="password"
        name="password"
        inputRef={register({
          required: true,
        })}
      />
      {errors.password && errors.password.type === "required" && (
        <p className="error-message">Password is required</p>
      )}
      <Button type="submit" variant="contained" disabled={isSubmitting}>
        Login
      </Button>
      {loginError && <p className="error-message">{loginError}</p>}
    </form>
  );
}
