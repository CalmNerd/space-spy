import Image from 'next/image'
import React from 'react'

const Discussion = () => {
  return (
    <div className='h-full w-full grid md:grid-cols-2 md:gap-16 pt-16'>
      <div className='md:col-span-1 bg-green-900  flex flex-col'>
        <div className='inline-flex gap-5'>
          <Image 
          src="/icons/back-icon.svg"
          height={40}
          width={40}
          alt='back'
          />

          <span>Coin Mentioned</span>

        </div>


        

      </div>
      <div className='md:col-span-1 bg-green-700'>m1</div>
    </div>
  )
}

export default Discussion
