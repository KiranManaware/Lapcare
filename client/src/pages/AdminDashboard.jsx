import React from 'react'
import {toast} from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom'

const AdminDashboard = () => {
  return (
    <div className="min-h-screen p-10">
    <h1 className="text-center text-2xl  font-bold">Welcome Admin</h1>
    <div className="border p-5 my-5 flex flex-col">
      <Link
        to={"/admin/users"}
        className="bg-black text-lg my-2 text-white font-semibold p-4 text-center w-full hover:bg-white hover:text-black hover:border duration-150"
      >
        All User
      </Link>
      <Link
        to={"/complaints"}
        className="bg-black text-lg my-2 text-white font-semibold p-4 text-center w-full hover:bg-white hover:text-black hover:border duration-150"
      >
        All Complaints
      </Link>
      <Link
        to={"/admin/comments"}
        className="bg-black text-lg my-2 text-white font-semibold p-4 text-center w-full hover:bg-white hover:text-black hover:border duration-150"
      >
        All Comments
      </Link>
    </div>
  </div>
  )
}

export default AdminDashboard
