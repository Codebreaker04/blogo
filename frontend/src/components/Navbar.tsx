import Button from './Button';
import { Link } from 'react-router-dom';
import Logo from './Logo';

export default function Navbar() {
  return (
    <div className='bg-white p-4 px-10 shadow-sm relative z-50'>
      <div className='flex w-full justify-between'>
        <div className='flex flex-col items-center'>
          <Logo size={8} />
          <span className='text-sm font-medium text-gray-600'>UpToDate</span>
        </div>
        <div className='flex gap-5 items-center'>
          <Link
            to='/'
            className='font-medium text-lg cursor-pointer hover:text-gray-600 transition-colors'>
            Homepage
          </Link>
          <Link
            to='/about'
            className='font-medium text-lg cursor-pointer hover:text-gray-600 transition-colors'>
            About us
          </Link>
          <Link
            to='/features'
            className='font-medium text-lg cursor-pointer hover:text-gray-600 transition-colors'>
            Features
          </Link>
          <Link
            to='/blogs'
            className='font-medium text-lg cursor-pointer hover:text-gray-600 transition-colors'>
            Blogs
          </Link>
          <Link
            to='/contact'
            className='font-medium text-lg cursor-pointer hover:text-gray-600 transition-colors'>
            Contact us
          </Link>
          <div className='flex gap-5'>
            <Link to='/login'>
              <Button variant='primary'>Login</Button>
            </Link>
            <Button variant='secondary'>Register</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
