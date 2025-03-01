import React, { useEffect, useState } from "react";
import ComplaintCard from "../components/ComplaintCard";
import BackButton from "../components/BackButton";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getComplaints } from "../features/complaint/complaintSlice";
import { getAllComplaints } from "../features/admin/adminSlice";
import Loader from "../components/Loader";

const AllComplaints = () => {
  const { user } = useSelector((state) => state.auth);
  const { allComplaints } = useSelector((state) => state.admin);
  const { complaints, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.complaint
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user?.isAdmin) {
      dispatch(getComplaints());
    } else {
      dispatch(getAllComplaints());
    }

    if (isError && message) {
      toast.error(message);
    }
  }, [isError, message, user]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen p-10">
      <BackButton url={"/"} />

      <h1 className="text-center text-2xl mb-4  font-bold">All Complaint</h1>

      <div className="grid grid-cols-1 md:grid-cols-3  gap-4">
        {user.isAdmin
          ? allComplaints.map((complaint) => (
              <ComplaintCard key={complaint._id} complaint={complaint} />
            ))
          : complaints.map((complaint) => (
              <ComplaintCard key={complaint._id} complaint={complaint} />
            ))}
      </div>
    </div>
  );
};

export default AllComplaints;
