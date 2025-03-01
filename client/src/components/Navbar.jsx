import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { logoutUser } from '../features/auth/authSlice';

const Navbar = () => {
    const {user}=useSelector((state)=>state.auth);
    const dispatch=useDispatch();
    const handleLogOut=()=>{
        dispatch(logoutUser());
    }
    
  return (
    <nav className='py-4 px-8 border border-b-1 border-gray-200 shadow-sm flex items-center justify-between '>
        <Link  to={'/'} className='text-xl font-bold uppercase'>Lapcare</Link>
        <div>
            {
                !user?(
                    <>
                    <Link to={'/login'} className='bg-sky-500 py-2 mx-3 px-5 font-semibold text-white hover:bg-sky-400 duration-150'>Login</Link>
                    <Link to={'/register'} className='bg-sky-500 py-2 mx-3 px-5 font-semibold text-white hover:bg-sky-400 duration-150'>Register</Link>
                    </>
                ):
                <button onClick={handleLogOut} className='bg-red-600 py-2 mx-3 px-5 font-semibold text-white hover:bg-red-500 duration-150'>Logout</button>

            }
            
        </div>
    </nav>
  )
}

export default Navbar
