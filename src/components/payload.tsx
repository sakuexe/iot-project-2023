import { useEffect } from 'react';
import { FC } from 'react';

interface payloadProps {
  payloads: {object: number, ambient: number}[];
}

const Payload:FC<payloadProps> = ({payloads}) => {
  if (payloads.length > 4) {
    payloads.shift();
  }
  return (
    <div className='payload flex flex-col justify-start'>
      <ul className='mx-auto shadow-xl'>
        {/* loop through payloads and add list item for each */}
        {payloads.map(temperatures => (

          <li className='px-5 py-3 even:bg-neutral-800'>
            <p className='flex items-center gap-x-2 font-semibold'>
              <span className='text-sm'>Time:</span>
              {new Date().toLocaleTimeString('fi-FI')}
            </p>
            <p className='flex items-center justify-between gap-x-4 font-semibold'>
              <span className='text-sm'>OT:</span>
              {temperatures.object}&#8451;
            </p>
            <p className='flex items-center justify-between font-semibold'>
              <span className='text-sm'>AT:</span>
              {temperatures.ambient}&#8451;
            </p>
          </li>

        ))}
      </ul>
    </div>
  );
}

export default Payload;
