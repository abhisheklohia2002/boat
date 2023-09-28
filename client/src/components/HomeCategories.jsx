import React from 'react'

export default function HomeCategories({
    poster,name,id
}) {
  return (
    <div key = {id} className='bg-center w-40 justify-center cursor-pointer'>
        <img className='bg-center text-center' src={poster} alt = {name} />
        <h3 className='font-bold text-sm pt-2 text-gray-800 uppercase hover:font-light'>
            {name}
        </h3>
    </div>
  )
}
