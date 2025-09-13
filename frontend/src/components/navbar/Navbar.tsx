import Button from '../Button/Button';

export default function Navbar() {
  return (
    <div className=' bg-white p-4 px-10 shadow-sm'>
      <div className='flex w-full justify-between'>
        <div className='flex items-center'>
          <div>icon</div>
          <span>UpToDate</span>
        </div>
        <div className='flex gap-5 items-center'>
          <span className='font-medium text-lg cursor-pointer'>Homepage</span>
          <span className='font-medium text-lg cursor-pointer'>About us</span>
          <span className='font-medium text-lg cursor-pointer'>Features</span>
          <span className='font-medium text-lg cursor-pointer'>Blogs</span>
          <span className='font-medium text-lg cursor-pointer'>Contact us</span>
          <div className='flex gap-5'>
            <Button variant='primary'>Login</Button>
            <Button variant='secondary'>Register</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
