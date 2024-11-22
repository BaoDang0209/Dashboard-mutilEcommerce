import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../Pagination';
import { FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { get_customers } from '../../store/Reducers/customerReducer';

const Customers = () => {

    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const [parPage, setParPage] = useState(5);

    const { customers, totalCustomer } = useSelector(state => state.customer);

    useEffect(() => {
        const obj = {
            parPage: parseInt(parPage),
            page: parseInt(currentPage),
            searchValue
        };
        dispatch(get_customers(obj));
    }, [searchValue, currentPage, parPage]);

    return (
        <div className='px-2 lg:px-7 pt-5'>
            <h1 className='text-[20px] font-bold mb-3'>Customers</h1>
            <div className='w-full p-4 bg-[#b1addf] rounded-md'>

                <div className='flex justify-between items-center'>
                    <select onChange={(e) => setParPage(parseInt(e.target.value))} className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#b1addf] border border-slate-700 rounded-md text-[#000000]'>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                    </select>
                    <input
                        onChange={e => setSearchValue(e.target.value)}
                        value={searchValue}
                        className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#b1addf] border border-slate-700 rounded-md text-[#000000]'
                        type="text"
                        placeholder='Search'
                    />
                </div>

                <div className='relative overflow-x-auto'>
                    <table className='w-full text-sm text-left text-[#000000]'>
                        <thead className='text-sm text-[#000000] uppercase border-b border-slate-700'>
                            <tr>
                                <th scope='col' className='py-3 px-4'>No</th>
                                <th scope='col' className='py-3 px-4'>Image</th>
                                <th scope='col' className='py-3 px-4'>Name</th>
                                <th scope='col' className='py-3 px-4'>Email</th>
                                <th scope='col' className='py-3 px-4'>Phone Number</th>
                                <th scope='col' className='py-3 px-4'>Address</th>
                                <th scope='col' className='py-3 px-4'>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                customers.map((customer, index) => (
                                    <tr key={index}>
                                        <td className='py-1 px-4 font-medium whitespace-nowrap'>{index + 1}</td>
                                        <td className='py-1 px-4 font-medium whitespace-nowrap'>
                                            <img className='w-[45px] h-[45px]' src={customer.image} alt="" />
                                        </td>
                                        <td className='py-1 px-4 font-medium whitespace-nowrap'>{customer.name}</td>
                                        <td className='py-1 px-4 font-medium whitespace-nowrap'>{customer.email}</td>
                                        <td className='py-1 px-4 font-medium whitespace-nowrap'>{customer.phoneNumber}</td>
                                        <td className='py-1 px-4 font-medium whitespace-nowrap'>{customer.address}</td>
                                        <td className='py-1 px-4 font-medium whitespace-nowrap'>
                                            <div className='flex justify-start items-center gap-4'>
                                                <Link to={`/admin/dashboard/customer/details/${customer._id}`} className='p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50'>
                                                    <FaEye />
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>

                {
                    totalCustomer > parPage &&
                    <div className='w-full flex justify-end mt-4 bottom-4 right-4'>
                        <Pagination
                            pageNumber={currentPage}
                            setPageNumber={setCurrentPage}
                            totalItem={totalCustomer}
                            parPage={parPage}
                            showItem={4}
                        />
                    </div>
                }
            </div>
        </div>
    );
};

export default Customers;
