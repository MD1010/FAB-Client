import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Spinner from 'src/components/shared/Spinner';
import './NewLogin.style.scss';

type Inputs = {
  email: string;
  password: string;
};

export default function LaunchAccountModal() {
  const { register, handleSubmit, errors, reset } = useForm<Inputs>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const spinner = isLoading && <Spinner />;

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    reset();
    setIsLoading(true);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
        <label>Email</label>
        <input name='email' placeholder='youremail@email.com' ref={register({ required: true })} />
        {errors.email && <div className='error-message'>This field is required</div>}
        <label>Password</label>
        <input name='password' type='password' ref={register({ required: true })} />
        {errors.password && <div className='error-message'>This field is required</div>}
        {isLoading ? (
          <div style={{ marginTop: '30px' }}>
            <Spinner />
          </div>
        ) : (
          <button type='submit' className='submit-form'>
            Login
          </button>
        )}
      </form>
    </>
  );
}
