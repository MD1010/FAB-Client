import Alert from '@material-ui/lab/Alert/Alert';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Spinner from 'src/components/shared/Spinner';
import './NewLogin.style.scss';

type Inputs = {
  email: string;
  password: string;
};

export default function LaunchAccountModal() {
  const { register, handleSubmit, errors, reset, formState } = useForm<Inputs>({ mode: 'onChange' });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loginMessage, setLoginMessage] = useState<string | null>(null);
  const spinner = isLoading && <Spinner />;

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    reset();
    setIsLoading(true);
    setLoginMessage('Loging into your UT account. This can take a while...');
  };

  const loader = () => isLoading && <Spinner />;

  const accountLoginForm = () =>
    isLoading ? null : (
      <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
        <label>Email</label>
        <input name='email' placeholder='youremail@email.com' ref={register({ required: true })} />
        {errors.email && <div className='error-message'>This field is required</div>}
        <label>Password</label>
        <input name='password' type='password' ref={register({ required: true })} onChange={() => console.log(formState)} />
        {errors.password && <div className='error-message'>This field is required</div>}

        <button type='submit' className='submit-form' disabled={!formState.isValid || isLoading}>
          Login
        </button>
      </form>
    );

  const infoMessage = () =>
    loginMessage ? (
      <Alert severity='info' style={{ marginBottom: '20px' }}>
        {loginMessage}
      </Alert>
    ) : null;
  return (
    <>
      {/* <Alert severity='info' style={{ marginBottom: '20px' }}>
          Loging into your UT account. This can take a while...
        </Alert> */}
      {/* {<div style={{ marginTop: '20px' }}>
            <Spinner />
          </div>} */}
      {infoMessage()}
      {accountLoginForm()}
      {loader()}
    </>
  );
}
