import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/auth/authSlice";
import Loader from "../components/Loader";
const Register = () => {
  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password != password2) {
      toast.error("Password Mismatched");
    }else{

      dispatch(registerUser(formData));
    }
    setFormData({
      name: "",
      email: "",
      password: "",
      password2: "",
    
    })
  };

  useEffect(() => {
    if (user) {
      navigate("/");
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
      <h1 className="text-center text-2xl  font-bold">Register Here</h1>
      <div className="border p-5 my-5 ">
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            value={name}
            onChange={handleChange}
            type="text"
            placeholder="Enter Name"
            className="my-2 border border-gray-300 p-3 w-full disabled:bg-sky-100 text-sm"
          />
          <input
            name="email"
            value={email}
            onChange={handleChange}
            type="text"
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
          <input
            name="password2"
            value={password2}
            onChange={handleChange}
            type="password"
            placeholder="Confirm Password"
            className="my-2 border border-gray-300 p-3 w-full disabled:bg-sky-100 text-sm"
          />

          <button className="bg-black text-lg my-2 text-white font-semibold p-3 text-center w-full hover:bg-white hover:text-black hover:border duration-150">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
