import React from "react";
import { Link } from "react-router-dom";

const ComplaintCard = ({ complaint }) => {
  return (
    <div className="relative p-4  border border-gray-400 flex flex-col ">
      <div
        className={
          complaint?.status === "close"
            ? "absolute top-3 right-3 bg-red-500 rounded-full text-center p-3 text-white font-bold"
            : complaint.status === "pending"
            ? "absolute top-3 right-3 bg-yello-500 rounded-full text-center p-3 text-white font-bold"
            : "absolute top-3 right-3 bg-green-500 rounded-full text-center p-3 text-white font-bold"
        }
      >
        {complaint?.status}
      </div>
      <h1 className="font-bold my-2 uppercase">
        Product : {complaint?.laptop}
      </h1>
      <p className="text-sm my-2 font-semibold text-gray-400">
        Date : {new Date(complaint.createdAt).toLocaleDateString("en-IN")}
      </p>
      <Link
        to={`/complaints/${complaint?._id}`}
        className="bg-black my-3 text-white text-center p-2 font-bold w-full hover:bg-white hover:text-black hover:border duration-150"
      >
        View More
      </Link>
    </div>
  );
};

export default ComplaintCard;
