export default function Navbar() {
  return (
    <div className='w-screen bg-white p-5'>
      <div className='flex w-full justify-between'>
        <div className='flex items-center'>
          <div>icon</div>
          <span>UpToDate</span>
        </div>
        <div className='flex gap-5'>
          <span>Homepage</span>
          <span>About us</span>
          <span>Feaatures</span>
          <span>Blogs</span>
          <span>Contact us</span>
          <div className='flex gap-5'>
            <button >Login</button>
            <button>Register</button>
          </div>
        </div>
      </div>
    </div>
  );
}
