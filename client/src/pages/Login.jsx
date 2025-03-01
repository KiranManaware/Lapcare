import React, { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../features/auth/authSlice";
import Loader from "../components/Loader";

const Login = () => {
  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(loginUser(formData));
    setFormData({
      email: "",
      password: "",
    })
  };
  useEffect(() => {
    if (user && isSuccess ) {
      navigate("/");
    }
    if(user?.isAdmin){
      navigate('/admin')
    }

    if (isError && message) {
      toast.error(message);
    }
  }, [isError, message, user]);
  if(isLoading){
    return <Loader/>
  }
  return (
    <div className="min-h-screen p-10">
      <h1 className="text-center text-2xl  font-bold">Login Here</h1>
      <div className="border p-5 my-5 ">
        <form onSubmit={handleSubmit}>
          <input
            name="email"
            value={email}
            onChange={handleChange}
            type="email"
            placeholder="Enter Email"
            className="my-2 border border-gray-300 p-3 w-full disabled:bg-sky-100 text-sm"
          />
          <input
            name="password"
            value={password}
            onChange={handleChange}
            type="password"
            placeholder="Enter Password"
            className="my-2 border border-gray-300 p-3 w-full disabled:bg-sky-100 text-sm"
          />

          <button className="bg-black text-lg my-2 text-white font-semibold p-3 text-center w-full hover:bg-white hover:text-black hover:border duration-150">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
