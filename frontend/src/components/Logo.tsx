export default function Logo({ size = 8 }: { size?: number }) {
  const sizeClasses = {
    6: 'size-6',
    8: 'size-8',
    10: 'size-10',
    12: 'size-12',
    16: 'size-16',
  };

  const sizeClass = sizeClasses[size as keyof typeof sizeClasses] || 'size-8';

  return (
    <div className='flex space-x-1'>
      <div
        className={`${sizeClass} bg-blue-500 transform rotate-12 rounded-sm`}></div>
      <div
        className={`${sizeClass} bg-blue-700 transform -rotate-12 rounded-sm`}></div>
    </div>
  );
}
