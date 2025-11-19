import React from 'react'
import { FaBeer } from 'react-icons/fa'

const Box = ({title, text}) => {
  return (
    <div className='box-border shadow-md w-[30vw] h-[30vh] rounded-2xl border-2 bg-green-800 border-transparent border-green-600 rounded shadow-[0_0_20px_4px_rgba(37,99,235,0.2)] hover:border-green-400 hover:shadow-green-800'>
      <div className='flex items-center justify-center h-full flex-col p-4 text-center'>
        {/* <FaBeer size={40} className='mb-2' color='white'/> */}
        <h2 className='text-2xl text-white mb-2'>{title}</h2>
        <p className='text-sm text-gray-400'>{text}</p>
      </div>
    </div>
  )
}

export default Box;
