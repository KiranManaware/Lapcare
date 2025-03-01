import React, { useEffect } from "react";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { getAllComments } from "../features/admin/adminSlice";

const AllComment = () => {
  const { allComments ,isError,message} = useSelector((state) => state.admin);
  const dispatch=useDispatch();

  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
      dispatch(getAllComments());
    

    if (isError && message) {
      toast.error(message);
    }
  }, [isError, message]);
  return (
    <div className="min-h-screen p-10">
      <h1 className="text-center text-2xl  font-bold">All Comments</h1>
      {allComments.map((comment) => {
        return (
          <div
            className={
              comment?.user === user?.id
                ? "relative my-3 p-5  bg-green-200   "
                : "relative my-3 p-5  bg-gray-300   "
            }
          >
            <div className="absolute top-3  md:right-4  bg-blue-500 rounded-full text-center p-3 text-white font-bold">
              {comment?.user === user?.id ? "By Admin" : "By user"}
            </div>
            <h1 className="text-2xl mt-15 md:mt-0 font-bold">
              {comment?.message}
            </h1>
            <p className="text-sm text-gray-600 font-semibold my-2">
              Date :{new Date(comment.createdAt).toLocaleDateString("en-IN")}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default AllComment;
