import type { ChangeEvent } from 'react';

interface LabeledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type: string;
  id: string;
}

export default function LabeledInput({
  label,
  placeholder,
  onChange,
  type,
  id,
}: LabeledInputType) {
  return (
    <div>
      <label
        htmlFor={id}
        className='block mb-1 text-md font-medium text-gray-900 ml-1 '>
        {/** dark:text-white */}
        {label}
      </label>
      <input
        type={type}
        id={id}
        onChange={onChange}
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-blue-500 focus:outline-1 block w-full p-2.5 '
        placeholder={placeholder}
        required
      />
      {/**dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 */}
    </div>
  );
}
