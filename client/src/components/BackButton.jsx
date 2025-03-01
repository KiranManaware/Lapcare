import React from 'react'
import { Link } from 'react-router-dom'

const BackButton = ({url}) => {
    return (
        <Link to={url} className='bg-black  px-4 py-2  text-white  hover:bg-gray-800 hover:cursor-pointer duration-150 '>Go Back</Link>
    )
}

export default BackButton
