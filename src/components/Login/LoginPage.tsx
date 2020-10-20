import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, TextField } from '@material-ui/core';
import { makeRequest } from '../common/makeRequest';
import { LOGIN_ENDPOINT } from '../../consts/endpoints';
import { RequestMethod } from 'src/types/RequestMethod';
import { setLocalStorageFields } from './utils/loginUtils';

export default function LoginPage() {
  const { register, handleSubmit, errors } = useForm();
  const [loginError, setLoginError] = useState('');
  const onSubmit = async (loginFields) => {
    let userName: string = loginFields.username;
    let password: string = loginFields.password;
    const [data, error] = await makeRequest({
      url: LOGIN_ENDPOINT,
      method: RequestMethod.POST,
      body: { username: userName, password: password },
    });
    if (data) {
      setLocalStorageFields(data.access_token, data.refresh_token, userName);
      console.log(localStorage.getItem('jwtAccess'));
    } else {
      setLoginError(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        id='standart-basic'
        label='UserName'
        type='text'
        name='username'
        inputRef={register({ required: true })}
      />
      {errors.UserName && errors.UserName.type === 'required' && (
        <p>UserName is required</p>
      )}
      <TextField
        id='standart-basic'
        label='password'
        type='password'
        name='password'
        inputRef={register({
          required: true,
        })}
      />
      {errors.Password && errors.Password.type === 'required' && (
        <p>Password is required</p>
      )}
      <Button type='submit' variant='contained'>
        Login
      </Button>
      {loginError && <p>Login failed, check your cradentials and try again!</p>}
    </form>
  );
}
