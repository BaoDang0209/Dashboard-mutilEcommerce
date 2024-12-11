import React, { useEffect, useState } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { get_customer,messageClear } from '../../store/Reducers/customerReducer';
import toast from 'react-hot-toast';

const CustomerDetails = () => {

    const dispatch = useDispatch()
    const { customer,successMessage} = useSelector(state=> state.customer)
    const { customerId } = useParams()

    useEffect(() => {
        dispatch(get_customer(customerId))

    },[customerId])

    const [status, setStatus] =  useState('')
    const submit = (e) => {
        e.preventDefault()
        console.log("Submitted status:", status);
    }


    useEffect(() => { 
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())  
        } 
    },[successMessage])

    useEffect(() => { 
        if (customer) { 
            setStatus(customer.status)
        } 
    },[customer])

    return (
        <div className='px-2 lg:px-7 pt-5'>
      <h1 className='text-[20px] font-bold mb-3'>  Customer Details </h1>
      <div className='w-full p-4 bg-[#b1addf] rounded-md'>

        <div className='w-full flex flex-wrap text-[#000000]'>
            <div className='w-3/12 flex justify-center items-center py-3'>
                <div>
                   {
                    customer?.image ?  <img className='w-full h-[230px]' src="http://localhost:3000/images/demo.jpg" alt="" /> :
                    <span>Image Not Uploaded </span>
                   }
                </div> 
            </div>

            <div className='w-4/12'>
                <div className='px-0 md:px-5 py-2'>
                    <div className='py-2 text-lg'>
                        <h2>Basic Info</h2>
                    </div>

    <div className='flex justify-between text-sm flex-col gap-2 p-4 bg-[#b1addf] rounded-md'>
        <div className='flex gap-2 font-bold text-[#000000]'>
            <span>Name : </span>
            <span>{ customer?.name } </span> 
        </div>
        <div className='flex gap-2 font-bold text-[#000000]'>
            <span>Email : </span>
            <span>{ customer?.email }</span> 
        </div>

        <div className='flex gap-2 font-bold text-[#000000]'>
            <span>Gender : </span>
            <span>{ customer?.gender }  </span> 
        </div>
        
        <div className='flex gap-2 font-bold text-[#000000]'>
            <span> Phone Number : </span>
            <span>{ customer?.phoneNumber } </span> 
        </div>

    </div> 
         </div> 
            </div>


            <div className='w-4/12'>
                <div className='px-0 md:px-5 py-2'>
                    <div className='py-2 text-lg'>
                        <h2>Details</h2>
                    </div>

    <div className='flex justify-between text-sm flex-col gap-2 p-4 bg-[#b1addf] rounded-md'>
        <div className='flex gap-2 font-bold text-[#000000]'>
            <span>Address : </span>
            <span>{customer?.address} </span> 
        </div>
        <div className='flex gap-2 font-bold text-[#000000]'>
            <span>Date Created : </span>
            <span>{new Date(customer?.createdAt).toISOString().split('T')[0]} </span> 
        </div>

        <div className='flex gap-2 font-bold text-[#000000]'>
            <span>Date Updated : </span>
            <span>{new Date(customer?.updatedAt).toISOString().split('T')[0]}  </span> 
        </div>
        <div className='flex gap-2 font-bold text-[#000000]'>
            <span>Status : </span>
            <span>{ customer?.status } </span> 
        </div>
        

    </div> 
         </div> 
            </div>
 
        </div> 


        <div> 
            <form onSubmit={submit} >
                <div className='flex gap-4 py-3'>
                    <select value={status} onChange={(e)=>setStatus(e.target.value)} className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#b1addf] border border-slate-700 rounded-md text-[#000000]' name="" id="" required>
                        <option value="">--Select Status--</option>
                        <option value="active">Active</option>
                        <option value="deactive">Deactive</option>
                    </select>
                    <button className='bg-red-500 w-[170px] hover:shadow-red-500/40 hover:shadow-md text-white rounded-md px-7 py-2'>Submit</button>

                </div>
            </form>
        </div>
        </div> 
        </div>
    );
};

export default CustomerDetails;