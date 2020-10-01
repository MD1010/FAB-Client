import Alert from '@material-ui/lab/Alert/Alert';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { unregister } from 'src/serviceWorker';
import './NewLogin.style.scss';

type FormFields = {
  email: string;
  password: string;
  code: string;
};

interface ILogin {
  email: string;
  password: string;
}

interface ICode {
  code: string;
}
enum LoginState {
  unAuthenticated,
  WaitingForCode,
  LoggedIn,
}
export default function LaunchAccountModal(props) {
  const { register, handleSubmit, errors, unregister } = useForm<FormFields>({ mode: 'onChange' });
  const [loginMessage, setInfoMessage] = useState<string | null>(null);
  const [loginState, setLoginState] = useState<LoginState>(LoginState.unAuthenticated);
  const { isLoading, setIsLoading } = props;

  const launchAccount: SubmitHandler<FormFields> = (data: ILogin) => {
    console.log(2);
    console.log(data);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setLoginState(LoginState.WaitingForCode);

      setInfoMessage('Enter the code you received');
    }, 1000);
    // api call
    // setCredentialsCorrect(true)
  };
  // console.log(11);
  
  // unregister('email');
  // unregister('password');
  const sendCode: SubmitHandler<FormFields> = (data: ICode) => {
    console.log(1);

    console.log(data);

    setIsLoading(true);
    setInfoMessage('Launching Web App. Please wait...');
    setLoginState(LoginState.LoggedIn);
  };

  const loginWithEmailAndPassword = () => (
    <form onSubmit={handleSubmit(launchAccount)} autoComplete='off'>
      <label>Email</label>
      <input name='email' placeholder='youremail@email.com' ref={register({ required: true })} />
      {errors.email && <div className='error-message'>This field is required</div>}

      <label>Password</label>
      <input name='password' type='password' ref={register({ required: true })} />
      {errors.password && <div className='error-message'>This field is required</div>}

      <button type='submit' className='submit-form'>
        Login
      </button>
    </form>
  );

  const loginWithAuthCode = () => (
    <form onSubmit={handleSubmit(sendCode)} autoComplete='off'>
      <label>Code</label>
      <input name='code' type='password' ref={register({ required: true })} />
      {errors.code && <div className='error-message'>This field is required</div>}

      <button type='submit' className='submit-form'>
        Send Code
      </button>
    </form>
  );

  const accountLoginForm = () => {
    switch (loginState) {
      case LoginState.unAuthenticated: {
        if (!isLoading) return loginWithEmailAndPassword();
        break;
      }
      case LoginState.WaitingForCode: {
        if (!isLoading) return loginWithAuthCode();
        break;
      }
      default:
        return null;
    }
  };

  return (
    <>
      {loginMessage ? (
        <Alert severity={'info'} style={{ marginBottom: '20px' }}>
          {loginMessage}
        </Alert>
      ) : null}
      {accountLoginForm()}
    </>
  );
}
