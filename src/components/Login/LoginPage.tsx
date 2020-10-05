import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, TextField } from '@material-ui/core';

export default function LoginPage() {
  const [userName, setUserName] = useState('');
  const [Password, setPassword] = useState('');
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => console.log(data);

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
      </Button>{' '}
    </form>
  );
}
