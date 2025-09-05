import React from 'react';
import { ThreeDots } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className='flex h-[30rem] w-full flex-col items-center justify-center'>
      <ThreeDots 
        height="80" 
        width="80" 
        radius="9"
        color="#7EB024" 
        ariaLabel="three-dots-loading"
        visible={true}
      />
    </div>
  );
};

export default Loader;