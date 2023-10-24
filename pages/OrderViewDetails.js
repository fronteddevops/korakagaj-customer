import Layout from "../components/layout/Layout";

import "font-awesome/css/font-awesome.min.css";
import { ToastContainer, toast } from "react-toastify";
import React, { useEffect, useState } from "react";

import services from "../services";
import Link from "next/link";

function OrderViewDetails() {
  const [orderDetailsData,setOrderDetailsData] = useState([]);

  const  orderDetials  = async()=>{
    try {
     
      const response = await services.orderDetails.GET_ORDER_DETAILS();
      setOrderDetailsData(response?.data?.data.rows)
    //  console.log("777777777777777777",response.data.data.rows)
    } catch (error) {
      console.log(error);
   
    }
  }

  useEffect(() => {
    orderDetials()
  }, []);



  return (
    <Layout parent="Home" sub="Pages" subChild="View Order Details">
      <div className="container">
        
             <div className="card">
                            <div className="card-header">
                              <h5 className="mb-0">Your Orders</h5>
                            </div>
                            <div className="card-body">
                              <div className="table-responsive">
                                <table className="table">
                                  <thead>
                                    <tr>
                                    <th>Order Id</th>
                                      <th>Date</th>
                                      <th>Tracking Link</th>
                                      <th>Amount</th>
                                      <th>Total Quantity</th>
                                      {/* <th>Actions</th> */}
                                    
                                    
                                      
                                    </tr>
                                  </thead>
                                  <tbody>
                                  {orderDetailsData?.map((item,key)=>{return(
                                      <tr key={key}> 
                                         <td>{item.OrderDetail.trackingId}</td>
                                         <td>{item.OrderDetail.createdAt}</td>
                                         <td>{item.OrderDetail.trackingLink}</td>
                                         <td>{item.OrderDetail.amount}</td>
                                         <td>{item.totalQuantity}</td>
                                        
                                         {/* <td>#1357</td>
                                         <td>#1357</td> */}
                                      </tr>
                                    )})}
                                    {/* <tr>
                                      <td>#1357</td>
                                      <td>March 45, 2020</td>
                                      <td>Processing</td>
                                      <td>Rs.125.00 for 2 item</td>
                                      <td>
                                        <a
                                          href="#"
                                          className="btn-small d-block"
                                        >
                                          View
                                        </a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>#2468</td>
                                      <td>June 29, 2020</td>
                                      <td>Completed</td>
                                      <td>Rs.364.00 for 5 item</td>
                                      <td>
                                        <a
                                          href="#"
                                          className="btn-small d-block"
                                        >
                                          View
                                        </a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>#2366</td>
                                      <td>August 02, 2020</td>
                                      <td>Completed</td>
                                      <td>Rs.280.00 for 3 item</td>
                                      <td>
                                        <a
                                          href="#"
                                          className="btn-small d-block"
                                        >
                                          View
                                        </a>
                                      </td>
                                    </tr> */}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
      </div>
      </Layout>
  );
}

export default OrderViewDetails;
