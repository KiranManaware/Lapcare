import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import BackButton from '../components/BackButton'
import { useNavigate } from 'react-router-dom';
import { raiseComplaint } from '../features/complaint/complaintSlice';
import { toast } from 'react-toastify';

const RaiseComplaint = () => {
  const{user}=useSelector(state=>state.auth);

  const navigate=useNavigate();
  const dispatch=useDispatch();

  const[formData,setFormData]=useState(
    {
      laptop:"",
      description:"",
      image:""
    }
  )

  const{laptop,description,image}=formData;

  const handleChange=(e)=>{
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    })
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    if(!laptop||!description||!image){
      toast.error("Please Fill All Details")
    }else{
      dispatch(raiseComplaint(formData));
      navigate('/complaints')
    }
  }
  return (
    <div className='min-h-screen p-10'>
      <BackButton url={"/"}/>
      <h1 className="text-center text-2xl  font-bold">Raise Your Complaint</h1>
      <div className="border p-5 my-5 ">
        <form onSubmit={handleSubmit} >
            <input type="text" className='my-2 border border-gray-300 p-3 w-full disabled:bg-sky-100 text-sm' value={user?.name} disabled />
            <input type="text" className='my-2 border border-gray-300 p-3 w-full disabled:bg-sky-100 text-sm' value={user?.email} disabled />
            <select name='laptop' value={laptop} onChange={handleChange} className='w-full my-2 p-3 border border-gray-300' >
                <option value="#">Choose Your Laptop Brand</option>
                <option value="apple">Apple</option>
                <option value="lenovo">Lenovo</option>
                <option value="dell">Dell</option>
                <option value="hp">HP</option>
                <option value="acer">Acer</option>
                <option value="sumsung">Sumsung</option>    
            </select>
            <textarea name='description' value={description} onChange={handleChange} placeholder='Enter description of your problem' className='w-full p-4 border border-gray-300 outline-none' ></textarea>
            <input name='image' value={image} onChange={handleChange} type="text" className='my-2 border border-gray-300 p-3 w-full'placeholder='Image URL'/>
            <button className='bg-black text-lg my-2 text-white font-semibold p-3 text-center w-full hover:bg-white hover:text-black hover:border duration-150'>Raise Complaint</button>

        </form>
      </div>
    </div>
  )
}

export default RaiseComplaint
