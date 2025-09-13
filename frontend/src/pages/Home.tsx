export default function Home() {
  return (
    <div className='p-10'>
      <div className='flex flex-col items-center h-screen'>
        <div className='grid grid-flow-col grid-cols-3 gap-4 w-full'>
          <div className='col-span-2 text-center'>
            <div className='bg-[url("/test.jpg")]  bg-cover bg-center size- rounded-md'></div>
          </div>
          <div className='col-span-1 text-center '> section 2</div>
        </div>
      </div>
    </div>
  );
}
