import React from 'react'
import {  useSelector } from "react-redux";

const Comment = ({comment}) => {
  

  const {user}=useSelector(state=>state.auth);
  return (
    <div className={comment?.user===user?.id?"relative my-3 p-5  bg-green-200   ":"relative my-3 p-5  bg-gray-300   "}>
      <div className="absolute top-3  md:right-4  bg-blue-500 rounded-full text-center p-3 text-white font-bold">
       {comment?.user===user?.id?"By me":"By you"}
      </div>
      <h1 className="text-2xl mt-15 md:mt-0 font-bold">{comment?.message}</h1>
      <p className="text-sm text-gray-600 font-semibold my-2">
      Date : 
      {new Date(comment.createdAt).toLocaleDateString("en-IN")}
      </p>
    </div>
  )
}

export default Comment
