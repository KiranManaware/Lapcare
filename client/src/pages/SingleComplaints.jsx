import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import { useDispatch, useSelector } from "react-redux";
import {  getComplaint,closeComplaint } from "../features/complaint/complaintSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { getComments, raiseComment } from "../features/comment/commentSlice";
import Comment from "../components/Comment";

const SingleComplaints = () => {
  const { singleComplaint, isLoading, isSuccess, isError, message } =useSelector((state) => state.complaint);
  const {user}=useSelector(state=>state.auth);
  const {comments}=useSelector(state=>state.comment);

  const dispatch = useDispatch();
  const { id } = useParams();

  const [text,setText]=useState("");

  const handleSumbit=(e)=>{
    e.preventDefault();
    dispatch(raiseComment({id,text}))
  }

  const handleCloseComplaint=(id)=>{
    console.log("closed")
    dispatch(closeComplaint(id))
  }

  useEffect(() => {
    // fetch Complaints
    dispatch(getComplaint(id));

    // fetch Comments
    dispatch(getComments(id));

    if (isError && message) {
      toast.error(message);
    }
  }, [isError, message, id]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen p-10">
      <BackButton url={"/complaints"} />

      <div className="relative my-5 p-5 border border-gray-400 flex  items-center justify-between md:flex-row flex-col ">
        <div
          className={
            singleComplaint?.status === "close"
              ? "absolute top-3 right-3 bg-red-500 rounded-full text-center p-3 text-white font-bold"
              : singleComplaint.status === "pending"
              ? "absolute top-3 right-3 bg-yello-500 rounded-full text-center p-3 text-white font-bold"
              : "absolute top-3 right-3 bg-green-500 rounded-full text-center p-3 text-white font-bold"
          }
        >
          {singleComplaint?.status}
        </div>
        <div className="my-15 md:w-1/2 text-center md:text-left">
          <h1 className="text-2xl uppercase font-bold">
            {singleComplaint?.laptop}
          </h1>
          <p className="text-sm text-gray-600 font-semibold my-2">
            {singleComplaint?.description}
          </p>
          <p className="text-sm text-gray-600 font-semibold my-2">
            Date :{" "}
            {new Date(singleComplaint.createdAt).toLocaleDateString("en-IN")}
          </p>
          <p className="text-sm text-gray-600 font-semibold my-2">
            Complaint ID : {singleComplaint?._id}
          </p>
        </div>
        <div>
          <img src={singleComplaint?.image} alt="" />
        </div>
      </div>

      <div className="my-4 p-5 border border-gray-400">
        <form onSubmit={handleSumbit}>
          <input
            onChange={(e)=>setText(e.target.value)}
            type="text"
            placeholder="Enter Comment"
            className="w-full p-3 border border-gray-400 outline-none"
          />
          <button className="p-2 w-full duration-150 my-2 text-white bg-black hover:bg-white hover:text-black hover:border hover:border-gray-600  ">
            Add Comment
          </button>
        </form>
        {
          comments.map((comment)=><Comment key={comment._id} comment={comment} />)
        }
      </div>

      <button
        className="bg-red-600 p-4 w-full  font-semibold text-white hover:bg-red-500 duration-150 disabled:bg-gray-500 "
        disabled={singleComplaint.status === "close"}
        onClick={()=>handleCloseComplaint(id)}
      >
        {singleComplaint?.status === "open" ? "Close My Complaint" : "closed"}
      </button>
    </div>
  );
};

export default SingleComplaints;
