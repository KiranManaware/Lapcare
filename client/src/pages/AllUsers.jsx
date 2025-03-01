import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import BackButton from "../components/BackButton";
import { getAllUsers } from "../features/admin/adminSlice";
import { useNavigate } from "react-router-dom";

const AllUsers = () => {
  const { user } = useSelector((state) => state.auth);
  const { allUsers, isLoading, isError, message } = useSelector(
    (state) => state.admin
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.isAdmin) {
      navigate("/");
    }
    dispatch(getAllUsers());

    if (isError && message) {
      toast.error(message);
    }
  }, [user, isError, message]);
  return (
    <div className="min-h-screen p-10">
      <BackButton url={"/admin"} />

      <h1 className="text-center text-2xl mb-4  font-bold">All User</h1>

      <div className="grid grid-cols-1 md:grid-cols-3  gap-4">
        {allUsers.map((user) => {
          if(!user?.isAdmin){

            return (
              <div className="relative p-4  border border-gray-400 flex flex-col ">
                <h1 className="font-bold my-2 uppercase">Name : {user?.name}</h1>
                <p className="text-sm my-2 font-semibold text-gray-400">
                  Email : {user?.email}
                </p>
                <p className="text-sm my-2 font-semibold text-gray-400">
                  Date : {new Date(user?.createdAt).toLocaleDateString("en-IN")}
                </p>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default AllUsers;
