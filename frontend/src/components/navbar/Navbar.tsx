import Button from '../Button/Button';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div className='bg-white p-4 px-10 shadow-sm relative z-50'>
      <div className='flex w-full justify-between'>
        <div className='flex items-center'>
          <div>icon</div>
          <span>UpToDate</span>
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
            <Button variant='primary'>Login</Button>
            <Button variant='secondary'>Register</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
