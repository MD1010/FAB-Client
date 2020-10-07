import React, { useState } from 'react';

import { useForm } from 'react-hook-form';
import { Button, TextField } from '@material-ui/core';
import { makeRequest } from '../common/makeRequest';
import { LOGIN_ENDPOINT } from '../../consts/endpoints';
import { RequestMethod } from 'src/types/RequestMethod';

export default function LoginPage() {
  const { register, handleSubmit, errors } = useForm();
  const [loginError, setLoginError] = useState('');

  interface IloginFields {
    userName: string;
    password: string;
  }
  const onSubmit = async (loginFields) => {
    let userName: string = loginFields.UserName;
    let password: string = loginFields.Password;
    const [data, error] = await makeRequest({
      url: LOGIN_ENDPOINT,
      method: RequestMethod.POST,
      body: { username: userName, password: password },
    });
    if (data) {
      localStorage.setItem('jwtAccess', data.access_token);
      localStorage.setItem('jwtRefresh', data.refresh_token);
      localStorage.setItem('userName', userName);
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
        name='UserName'
        inputRef={register({ required: true, maxLength: 80 })}
      />
      {errors.UserName && errors.UserName.type === 'required' && (
        <p color='red'>UserName is required</p>
      )}
      <TextField
        id='standart-basic'
        label='Password'
        type='text'
        name='Password'
        inputRef={register({
          required: true,
          minLength: 8,
          maxLength: 12,
        })}
      />
      {errors.Password && errors.Password.type === 'required' && (
        <p>Password is required</p>
      )}
      {errors.Password && errors.Password.type === 'minLength' && (
        <p>Password required min lenght of 8</p>
      )}
      {errors.Password && errors.Password.type === 'maxLength' && (
        <p>Password required max lenght of 12</p>
      )}
      <Button type='submit' variant='contained'>
        Login
      </Button>
      {loginError && (
        <p>Login in failed, check your cradentials and try again!</p>
      )}
    </form>
  );
}
