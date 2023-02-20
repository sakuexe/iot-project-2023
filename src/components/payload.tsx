import { FC, useEffect } from 'react';

interface payloadProps {
  payloads: {object: number, ambient: number, time: string}[];
}

const Payload:FC<payloadProps> = ({payloads}) => {
  let isDown = false;
  let startX : number;
  let scrollLeft : number;

  return (
    <div className='payload flex'>
      <ul className='mx-auto flex justify-center overflow-x-auto pb-2 select-none
      md:flex-col hover:cursor-grab'
      // mouse events for scrolling the list horizontally with mouse drag
      onMouseDown={(event) => {
        isDown = true;
        const target = event.currentTarget;
        target.closest('ul')?.classList.add('hover:cursor-grabbing');
        startX = event.pageX - event.currentTarget.offsetLeft;
        scrollLeft = event.currentTarget.scrollLeft;
      }}
      onMouseLeave={(event) => {
        isDown = false;
        const target = event.currentTarget;
        target.closest('ul')?.classList.remove('hover:cursor-grabbing');
      }}
      onMouseUp={(event) => {
        isDown = false;
        const target = event.currentTarget;
        target.closest('ul')?.classList.remove('hover:cursor-grabbing');
      }}
      onMouseMove={(event) => {
        if (!isDown) return;
        event.preventDefault();
        const x = event.pageX - event.currentTarget.offsetLeft;
        const SCROLL_SPEED = 1;
        const walk = (x - startX) * SCROLL_SPEED;
        event.currentTarget.scrollLeft = scrollLeft - walk;
      }}>

        {/* 
          loop through payloads and add list item for each 
          slice the payloads to only take the last 4 items
        */}
        {payloads.slice(-4).map((temperatures) => (

          <li className='px-5 py-3 shadow-xl transition-all
          even:bg-neutral-800 hover:brightness-125'>
            <p className='flex items-center gap-x-2 font-semibold'>
              <span className='text-sm'>Time:</span>
              {temperatures.time}
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
