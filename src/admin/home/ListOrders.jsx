import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./Homepage.scss";
import Navbar from "../Navbar";
import Footer from "../../components/Footer";

const ListOrders = () => {
  const [orders, setOrders] = useState([]);
  const location = useLocation();
  const shopId = location.state?.shopId;

  useEffect(() => {
    console.log("Location state:", location.state); // Log the location state
    console.log("Shop ID:", shopId); // Log the shopId

    // Fetch orders from mock API
    axios
      .get(
        `https://668e540abf9912d4c92dcd67.mockapi.io/Shop/1/Product/${shopId}/orders`
      )
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, [shopId]);

  return (
    <div className="div">
      <Navbar />
      <div className="relative w-full mt-10 flex items-center mb-10">
        <div className="text-[#242565] text-left font-dmSansBold text-[40px] font-bold absolute left-[80px]">
          Danh sách mua hàng
        </div>
      </div>
      <div className="flex justify-center mx-auto p-4">
        <table className="w-4/5 divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-2 px-4 border border-gray-200 text-center">
                STT
              </th>
              <th className="py-2 px-4 border border-gray-200 text-center">
                Tên khách hàng
              </th>
              <th className="py-2 px-4 border border-gray-200 text-center">
                Số điện thoại
              </th>
              <th className="py-2 px-4 border border-gray-200 text-center">
                Thời gian
              </th>
              <th className="py-2 px-4 border border-gray-200 text-center">
                Tổng (VNĐ)
              </th>
              <th className="py-2 px-4 border border-gray-200 text-center">
                Sản phẩm
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order, index) => (
              <tr key={order.id} className="text-center">
                <td className="py-2 px-4 border border-gray-200">
                  {index + 1}
                </td>
                <td className="py-2 px-4 border border-gray-200">
                  <span className="bg-gray-100 text-[#242565] px-2 py-1 rounded-full">
                    {order.username}
                  </span>
                </td>
                <td className="py-2 px-4 border border-gray-200">
                  <span className="bg-green-500 text-white px-2 py-1 rounded-full">
                    {order.number}
                  </span>
                </td>
                <td className="py-2 px-4 border border-gray-200">
                  {order.time}
                </td>
                <td className="py-2 px-4 border border-gray-200">
                  {order.total.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </td>
                <td className="py-2 px-4 border border-gray-200">
                  {order.products ? (
                    <ul>
                      {order.products.map((product, idx) => (
                        <li key={idx}>
                          <strong>{product.name}</strong> - {product.quantity} x{" "}
                          {product.price.toLocaleString("vi-VN")} VND
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span>Không có sản phẩm</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
};

export default ListOrders;
