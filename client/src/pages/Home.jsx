import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);


  useEffect(() => {
    
    if (!user) {
      navigate("/login");
    } else if(user.isAdmin) {
      navigate("/admin");
    } else{
      navigate('/')
    }
  }, [user]);

  return (
    <div className="min-h-screen p-10">
      <h1 className="text-center text-2xl  font-bold">Welcome User</h1>
      <div className="border p-5 my-5 flex flex-col">
        <Link
          to={"/raise-complaint"}
          className="bg-black text-lg my-2 text-white font-semibold p-4 text-center w-full hover:bg-white hover:text-black hover:border duration-150"
        >
          Raise Complaint
        </Link>
        <Link
          to={"/complaints"}
          className="bg-black text-lg my-2 text-white font-semibold p-4 text-center w-full hover:bg-white hover:text-black hover:border duration-150"
        >
          My Complaints
        </Link>
      </div>
    </div>
  );
};

export default Home;
