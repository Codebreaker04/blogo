import { useState } from 'react';
import Logo from '../components/Logo';
import LabeledInput from '../components/LabeledInput';
import type { SignupInput } from '@yuvraj04/blogo-common';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../../config';

export default function Register() {
  const navigate = useNavigate();
  const [loginInputs, setLoginInputs] = useState<SignupInput>({
    username: '',
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendRequest();
  };

  async function sendRequest() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/auth/signup`,
        loginInputs
      );
      if (response.status === 200) {
        const jwt = response.data.token;
        localStorage.setItem('token', `Bearer ${jwt}`);
        navigate('/');
      }
    } catch {}
  }

  return (
    <div className='min-h-screen grid grid-cols-1 lg:grid-cols-2'>
      {/*left Column */}
      <div className='flex justify-center items-center'>
        <div className='w-full max-w-md'>
          {/*Logo */}
          <div className='flex justify-center mb-8'>
            <Logo size={10} />
          </div>

          <div className='text-center'>
            <h1 className=' text-3xl text-gray-900 font-bold mb-2'>
              Welcome Back !
            </h1>
            <p className='text-gray-600'>Please enter your details</p>
          </div>

          {/*Login Form */}
          <form onSubmit={handleSubmit}>
            <div className='flex flex-col justify-center py-4 gap-4'>
              <LabeledInput
                id='username'
                label='Username'
                placeholder='Enter your desired username'
                type='text'
                onChange={e => {
                  setLoginInputs(c => ({
                    ...c,
                    username: e.target.value,
                  }));
                }}
              />
              <LabeledInput
                id='email'
                label='Email Address'
                placeholder='Enter your email address'
                type='text'
                onChange={e => {
                  setLoginInputs(c => ({
                    ...c,
                    email: e.target.value,
                  }));
                }}
              />
              <LabeledInput
                id='password'
                label='Password'
                placeholder='Enter your password'
                type='password'
                onChange={e => {
                  setLoginInputs(c => ({
                    ...c,
                    password: e.target.value,
                  }));
                }}
              />
              <Button variant='secondary'>Create Account</Button>
            </div>
          </form>
        </div>
      </div>

      {/* Right Column -> Login Form */}
      <div className='flex justify-center items-center'></div>
    </div>
  );
}
