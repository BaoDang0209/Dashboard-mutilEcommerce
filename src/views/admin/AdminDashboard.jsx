import React, { useEffect } from 'react';
import { MdCurrencyExchange,MdProductionQuantityLimits } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { TbUser } from "react-icons/tb";
import Chart from 'react-apexcharts'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { get_admin_dashboard_data } from '../../store/Reducers/dashboardReducer';

const AdminDashboard = () => {

    const dispatch = useDispatch()
    const {totalSale,totalCustomers,totalProduct,totalSeller} = useSelector(state=> state.dashboard)




    useEffect(() => {
        dispatch(get_admin_dashboard_data())
    }, [])

    const state = {
        series : [
            {
                name : "Orders",
                data : [23,34,45,56,76,34,23,76,87,78,34,45]
            },
            {
                name : "Revenue",
                data : [67,39,45,56,90,56,23,56,87,78,67,78]
            },
            {
                name : "Sellers",
                data : [34,39,56,56,80,67,23,56,98,78,45,56]
            },
        ],
        options : {
            color : ['#181ee8','#181ee8'],
            plotOptions: {
                radius : 30
            },
            chart : {
                background : 'transparent',
                foreColor : '#000000'
            },
            dataLabels : {
                enabled : false
            },
            strock : {
                show : true,
                curve : ['smooth','straight','stepline'],
                lineCap : 'butt',
                colors : '#f0f0f0',
                width  : .5,
                dashArray : 0
            },
            xaxis : {
                categories : ['Jan','Feb','Mar','Apl','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
            },
            legend : {
                position : 'top'
            },
            responsive : [
                {
                    breakpoint : 565,
                    yaxis : {
                        categories : ['Jan','Feb','Mar','Apl','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
                    },
                    options : {
                        plotOptions: {
                            bar : {
                                horizontal : true
                            }
                        },
                        chart : {
                            height : "550px"
                        }
                    }
                }
            ]
        }
    }




    return (
        <div className='px-2 md:px-7 py-5'>


            <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7'>
                
                <div className='flex justify-between items-center p-5 bg-[#fae8e8] rounded-md gap-3'>
                    <div className='flex flex-col justify-start items-start text-[#5c5a5a]'>
                        <h2 className='text-3xl font-bold'>${totalSale}</h2>
                        <span className='text-md font-medium'>Total Salse</span>
                    </div>

                    <div className='w-[40px] h-[47px] rounded-full bg-[#fa0305] flex justify-center items-center text-xl'>
                    <MdCurrencyExchange className='text-[#fae8e8] shadow-lg' /> 
                    </div> 
                </div>


                <div className='flex justify-between items-center p-5 bg-[#fde2ff] rounded-md gap-3'>
                    <div className='flex flex-col justify-start items-start text-[#5c5a5a]'>
                        <h2 className='text-3xl font-bold'>{totalProduct}</h2>
                        <span className='text-md font-medium'>Products</span>
                    </div>

                    <div className='w-[40px] h-[47px] rounded-full bg-[#760077] flex justify-center items-center text-xl'>
                    <MdProductionQuantityLimits  className='text-[#fae8e8] shadow-lg' /> 
                    </div> 
                </div>


                <div className='flex justify-between items-center p-5 bg-[#e9feea] rounded-md gap-3'>
                    <div className='flex flex-col justify-start items-start text-[#5c5a5a]'>
                        <h2 className='text-3xl font-bold'>{totalSeller}</h2>
                        <span className='text-md font-medium'>Sellers</span>
                    </div>

                    <div className='w-[40px] h-[47px] rounded-full bg-[#038000] flex justify-center items-center text-xl'>
                    <FaUsers  className='text-[#fae8e8] shadow-lg' /> 
                    </div> 
                </div>


                <div className='flex justify-between items-center p-5 bg-[#ecebff] rounded-md gap-3'>
                    <div className='flex flex-col justify-start items-start text-[#5c5a5a]'>
                        <h2 className='text-3xl font-bold'>{totalCustomers}</h2>
                        <span className='text-md font-medium'>Customers</span>
                    </div>

                    <div className='w-[40px] h-[47px] rounded-full bg-[#0200f8] flex justify-center items-center text-xl'>
                    <TbUser  className='text-[#fae8e8] shadow-lg' /> 
                    </div> 
                </div>
 
            </div>

        
        
        <div className='w-full flex flex-wrap mt-7'>
            <div className='w-full lg:w-7/12 lg:pr-3'>
                <div className='w-full bg-[#b1addf] p-4 rounded-md'>
            <Chart options={state.options} series={state.series} type='bar' height={350} />
                </div>
            </div>

        
        <div className='w-full lg:w-5/12 lg:pl-4 mt-6 lg:mt-0'>
            <div className='w-full bg-[#b1addf] p-4 rounded-md text-[#000000]'>
                <div className='flex justify-between items-center'>
                    <h2 className='font-semibold text-lg text-[#000000] pb-3'>Recent Seller Message</h2>
                    <Link className='font-semibold text-sm text-[#000000]'>View All</Link>
                </div>


            </div>
        </div>
        </div>




             
        </div>
    );
};

export default AdminDashboard;