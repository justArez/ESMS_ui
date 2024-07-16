import React, { useState, useEffect } from "react";
import axios from "axios";
import "./product.scss";
import Navbar from "../../admin/Navbar";
import Footer from "../../components/Footer";
import PizzaHeader from "../../assets/images/margherita-pizza_3.png";

const CartProduct = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [shopNames, setShopNames] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const shops = await fetchAllShopNames();
        const orders = await fetchOrders();
        setShopNames(shops);
        setOrders(orders);
        calculateProductStatistics(orders, shops);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `https://668e540abf9912d4c92dcd67.mockapi.io/orders`
      );
      console.log("Fetched orders:", response.data);
      if (response.data && Array.isArray(response.data)) {
        return response.data;
      } else {
        console.error("Invalid data format:", response.data);
        return [];
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      return [];
    }
  };

  const fetchAllShopNames = async () => {
    try {
      const response = await axios.get(
        `https://668e540abf9912d4c92dcd67.mockapi.io/Shop`
      );
      const shops = response.data.reduce((acc, shop) => {
        acc[shop.id] = shop.title;
        return acc;
      }, {});
      console.log("Shop names fetched:", shops);
      return shops;
    } catch (error) {
      console.error("Error fetching shop names:", error);
      return {};
    }
  };

  const calculateProductStatistics = (orders, shops) => {
    const productStatistics = {};
    let total = 0;

    orders.forEach((order) => {
      if (order.products && Array.isArray(order.products)) {
        order.products.forEach((product) => {
          if (!productStatistics[product.id]) {
            productStatistics[product.id] = {
              ...product,
              totalQuantity: 0,
              shopName: shops[order.shopId] || "Unknown Shop",
            };
          }
          productStatistics[product.id].totalQuantity += product.quantity;
          total += product.price * product.quantity;
        });
      }
    });

    console.log("Product statistics:", productStatistics);
    setProducts(Object.values(productStatistics));
    setTotalRevenue(total);
  };

  if (loading) {
    return <div></div>;
  }

  return (
    <div>
      <div className="header">
        <Navbar />
        <div className="flex flex-row py-4 justify-between relative">
          <div className="h-bot flex flex-col items-start px-20">
            <h1>
              <span className="h-title">
                <p style={{ fontFamily: "Poppins, sans-serif" }}>
                  CHÀO MỪNG ĐẾN VỚI
                </p>
                <p className="mt-1">SHOP</p>
              </span>
            </h1>
            <h3
              className="h-content mt-3"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Vị ngon trên từng hương vị.
            </h3>
          </div>
          <div className="flex relative">
            <div className="white-blur"></div>
            <img
              style={{ width: "800px" }}
              loading="lazy"
              alt=""
              src={PizzaHeader}
            />
          </div>
        </div>
      </div>

      <div className="abc">
        <div className="product-list-wrapper">
          <div className="product-list ">
            <div className="flex justify-between w-full">
              <h3 className="mb-4 text-2xl font-bold product-name ">
                SẢN PHẨM ĐÃ BÁN
              </h3>
            </div>
          </div>
        </div>

        <div className="flex justify-end text-xl text-[#00AEFF] font-bold pr-36 pb-20">
          <h3>TỔNG DOANH THU: {totalRevenue.toLocaleString("vi-VN")} VND</h3>
        </div>
        <div className="table-container flex justify-center text-center ">
          <table className="product-table ">
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên sản phẩm</th>
                <th>Hình ảnh</th>
                <th>Thông tin chi tiết</th>
                <th>Loại sản phẩm</th>
                <th>Tên Shop</th>
                <th>Số lượng</th>
                <th>Giá</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td className="image-cell">
                    <img src={product.image} alt={product.name} />
                  </td>
                  <td>{product.description}</td>
                  <td>{product.category}</td>
                  <td>{product.shopName}</td>
                  <td>{product.totalQuantity}</td>
                  <td>{product.price.toLocaleString("vi-VN")} VND</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CartProduct;
