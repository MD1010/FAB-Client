import { Alert } from "@material-ui/lab";
import React, { FunctionComponent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Spinner from "../shared/Spinner";
import "./AddAccountModal.css";

type FormFields = {
  email: string;
};

type AddAccountModalProps = {
  addAccount: Function;
};

const AddAccountModal: FunctionComponent<AddAccountModalProps> = ({
  addAccount,
}) => {
  const { register, handleSubmit, errors } = useForm<FormFields>({
    mode: "onChange",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const addEaAccount: SubmitHandler<FormFields> = async (data) => {
    setIsLoading(true);
    const { email } = data;
    const { res, error } = await addAccount(email);
    if (error) {
      setIsLoading(false);
      setErrorMessage(error.msg);
    }
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <h1>Add New Account</h1>
          {errorMessage ? (
            <Alert severity="error" style={{ marginBottom: "20px" }}>
              {errorMessage}
            </Alert>
          ) : null}
          <form onSubmit={handleSubmit(addEaAccount)}>
            <label>Email</label>
            <input
              name="email"
              placeholder="youremail@email.com"
              ref={register({ required: true })}
            />
            {errors.email && (
              <div className="error-message">This field is required</div>
            )}
            <button type="submit" className="submit-form">
              {" "}
              Add Account{" "}
            </button>
          </form>
        </>
      )}
    </>
  );
};

export default AddAccountModal;
