import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, TextField } from '@material-ui/core';
import { makeRequest } from '../common/makeRequest';
import { LOGIN_ENDPOINT } from '../../consts/endpoints';
import { RequestMethod } from 'src/types/RequestMethod';
import IloginFields from './interfaces/IloginFields.interface';

const setLocalStorageFields = (
  access_token: string,
  refresh_token: string,
  userName: string
) => {
  localStorage.setItem('jwtAccess', access_token);
  localStorage.setItem('jwtRefresh', refresh_token);
  localStorage.setItem('userName', userName);
};

export default function LoginPage() {
  const { register, handleSubmit, errors } = useForm();
  const [loginError, setLoginError] = useState('');
  const onSubmit = async (loginFields: IloginFields) => {
    let userName: string = loginFields.UserName;
    let password: string = loginFields.Password;
    const [data, error] = await makeRequest({
      url: LOGIN_ENDPOINT,
      method: RequestMethod.POST,
      body: { username: userName, password: password },
    });
    if (data) {
      setLocalStorageFields(data.access_token, data.refresh_token, userName);
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
        <p>UserName is required</p>
      )}
      <TextField
        id='standart-basic'
        label='Password'
        type='text'
        name='Password'
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
