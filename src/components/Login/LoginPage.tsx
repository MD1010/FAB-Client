import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, TextField } from "@material-ui/core";
import { LOGIN_ENDPOINT } from "../../consts/endpoints";
import { RequestMethod } from "src/types/RequestMethod";
import { setLocalStorageFields } from "./loginUtils";
import { makeRequest } from "src/common/makeRequest";
import "./LoginForm.style.scss";

export default function LoginPage() {
  const { register, handleSubmit, errors } = useForm();
  const [loginError, setLoginError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const onSubmit = async (loginFields) => {
    setIsSubmitting(true);
    const { username, password } = loginFields;
    const [data, error] = await makeRequest({
      url: LOGIN_ENDPOINT,
      method: RequestMethod.POST,
      body: { username: username, password: password },
    });
    setIsSubmitting(false);
    if (data) {
      setLocalStorageFields(data.access_token, data.refresh_token, username);
      alert(localStorage.getItem("access_token"));
    } else {
      setLoginError(error);
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
