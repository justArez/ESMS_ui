// import React, { useState } from "react";
// import "./product.scss";
// import Coca from "../../assets/images/Coca.png";
// import Pizza from "../../assets/images/Pizza.png";
// import noodle from "../../assets/images/noodle.png";
// import nuggets from "../../assets/images/nuggets.png";
// import tiramisu from "../../assets/images/tiramisu.png";
// import gimbap from "../../assets/images/gimbap.png";
// import qr_code from "../../assets/images/qr_code.png";
// // import Hero from "../hero/Hero";
// import Footer from "../../components/Footer";
// import Logo from "../../assets/images/esms 4.png";
// import LogoutIcon from "@mui/icons-material/Logout";
// import PersonIcon from "@mui/icons-material/Person";
// import PizzaHeader from "../../assets/images/margherita-pizza_3.png";
// import DeleteIcon from "@mui/icons-material/Delete";
// import Navbar from "../../admin/Navbar";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import CloseIcon from "@mui/icons-material/Close";

// const PaymentOrder = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

//   const handleCheckoutClick = () => {
//     setIsModalOpen(true);
//   };

//   const handleConfirmPaymentClick = () => {
//     setIsModalOpen(false);
//     setIsPaymentSuccessful(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <div>
//       <div className="header ">
//         <Navbar />
//         <div className="flex flex-row py-4 justify-between relative">
//           <div className="h-bot flex flex-col items-start px-20">
//             <h1>
//               <span className="h-title">
//                 <p
//                   style={{ fontFamily: "Poppins, sans-serif" }}
//                 >{`CHÀO MỪNG ĐẾN VỚI `}</p>
//                 <p className="mt-1">FEV - SHOP</p>
//               </span>
//             </h1>
//             <h3
//               className="h-content mt-3"
//               style={{ fontFamily: "Poppins, sans-serif" }}
//             >
//               Vị ngon trên từng hương vị.
//             </h3>
//             <button
//               className="bg-[#00AEFF] text-white py-5 px-10 rounded-full tracking-widest mt-8"
//               style={{ fontSize: "24px", marginRight: "475px" }}
//             >
//               <b>TẠO ĐƠN HÀNG</b>
//             </button>
//           </div>

//           <div className="flex relative">
//             <div className="white-blur"></div>
//             <img
//               style={{ width: "800px" }}
//               loading="lazy"
//               alt=""
//               src={PizzaHeader}
//             />
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         <div className="bg-white p-6 ">
//           <h2 className="text-2xl font-semibold mb-4">Đơn hàng của bạn</h2>
//           <h3>
//             Bạn có <span style={{ color: "#0adc5d" }}>3</span> sản phẩm trong
//             giỏ hàng
//           </h3>
//           <ul>
//             <div className="card-product flex justify-between items-center p-10 gap-10 rounded-lg  bg-white shadow">
//               <img src={Pizza} alt="" className="w-32" />
//               <div className="flex flex-col items-start ml-4">
//                 <span className="text-base font-bold">Pizza</span>
//                 <span className="text-sm">Food</span>
//               </div>
//               <span className="text-lg">1</span>
//               <div className="flex flex-col items-end">
//                 <span className="text-base">10.000 VND</span>
//               </div>
//               <span>
//                 <DeleteIcon />
//               </span>
//             </div>
//             <div className="card-product flex justify-between items-center p-10 gap-10 rounded-lg  bg-white shadow">
//               <img src={Coca} alt="" className="w-32" />
//               <div className="flex flex-col items-start ml-4">
//                 <span className="text-base font-bold">Coca Cola</span>
//                 <span className="text-sm">Drink</span>
//               </div>
//               <span className="text-lg">1</span>
//               <div className="flex flex-col items-end">
//                 <span className="text-base">10.000 VND</span>
//               </div>
//               <span>
//                 <DeleteIcon />
//               </span>
//             </div>
//             <div className="card-product flex justify-between items-center p-10 gap-10 rounded-lg  bg-white shadow">
//               <img src={noodle} alt="" className="w-32" />
//               <div className="flex flex-col items-start ml-4">
//                 <span className="text-base font-bold">Noodle</span>
//                 <span className="text-sm">Food</span>
//               </div>
//               <span className="text-lg">1</span>
//               <div className="flex flex-col items-end">
//                 <span className="text-base">10.000 VND</span>
//               </div>
//               <span>
//                 <DeleteIcon />
//               </span>
//             </div>
//           </ul>
//         </div>

//         <div className="p-20 rounded-3xl max-h-20 ">
//           <div className="p-6 rounded-lg shadow-md bg-[#00AEFF] text-white font-semibold">
//             <h1 className="text-5xl font-semibold mb-6 text-white">
//               Thông tin đơn hàng
//             </h1>
//             <form className="flex flex-col space-y-4 text-xl">
//               <div className="flex flex-col mb-4">
//                 <label htmlFor="username" className="text-white font-medium ">
//                   Tên khách hàng
//                 </label>
//                 <input
//                   type="text"
//                   id="username"
//                   name="username"
//                   placeholder="Thông tin khách hàng"
//                   className="mt-1 p-2 border bg-[#C5E3FF] rounded-md font-semibold text-black"
//                 />
//               </div>
//               <div className="flex flex-col mb-4">
//                 <label
//                   htmlFor="phone-number"
//                   className="font-medium text-white"
//                 >
//                   Số điện thoại
//                 </label>
//                 <input
//                   type="text"
//                   id="phone-number"
//                   name="phone-number"
//                   placeholder="Số điện thoại"
//                   className="mt-1 p-2 border bg-[#C5E3FF] rounded-md font-semibold text-black"
//                 />
//               </div>
//               <div className="border-b border-gray-300 mb-4"></div>
//               <div className="flex justify-between mb-4">
//                 <p>3 sản phẩm</p>
//                 <p> 30.000 VNĐ </p>
//               </div>
//               <div className="flex justify-between mb-4">
//                 <p>Tổng cộng</p>
//                 <p> 30.000 VNĐ </p>
//               </div>
//               <div className="flex justify-between mb-4">
//                 <button
//                   type="button"
//                   onClick={handleCheckoutClick}
//                   className="w-full bg-white text-[#0adc5d] py-2 px-4 rounded-md text-4xl font-bold"
//                   style={{ backgroundColor: "white", color: "black" }}
//                 >
//                   THANH TOÁN
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>

//       {isModalOpen && (
//         <div className="modal-overlay">
//           <div className="modal">
//             <button onClick={handleCloseModal} className="close-icon">
//               <CloseIcon />
//             </button>
//             <h2 className="font-bold">QR Code</h2>
//             <img src={qr_code} alt="QR Code" />
//             <button
//               onClick={handleConfirmPaymentClick}
//               className="bg-[#0ADC5D] text-white font-bold"
//             >
//               THANH TOÁN
//             </button>
//           </div>
//         </div>
//       )}

//       {isPaymentSuccessful && (
//         <div className="modal-overlay">
//           <div className="modal success-modal">
//             <button
//               onClick={() => setIsPaymentSuccessful(false)}
//               className="close-icon"
//             >
//               <CloseIcon />
//             </button>
//             <div className="success-content">
//               <CheckCircleIcon
//                 style={{ color: "#0ADC5D", fontSize: "100px" }}
//               />
//             </div>
//             <h2 className="success-text font-bold">THANH TOÁN THÀNH CÔNG</h2>
//           </div>
//         </div>
//       )}

//       <Footer />
//     </div>
//   );
// };

// export default PaymentOrder;

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";
import "./product.scss";
import qr_code from "../../assets/images/qr_code.png";
import Navbar from "../../admin/Navbar";
import PizzaHeader from "../../assets/images/margherita-pizza_3.png";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const PaymentOrder = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
  const { cart, incrementQuantity, decrementQuantity, removeItem, saveCart } =
    useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const shopId = location.state?.shopId;

  const handleCheckoutClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmPaymentClick = () => {
    saveCart();
    setIsModalOpen(false);
    setIsPaymentSuccessful(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleBackClick = () => {
    if (shopId) {
      navigate(`/shop/${shopId}/products`);
    }
  };

  const handleAddMoreProductsClick = () => {
    if (shopId) {
      navigate(`/shop/${shopId}/products`);
    }
  };

  return (
    <div>
      <div className="header ">
        <Navbar />
        <div className="flex flex-row py-4 justify-between relative">
          <div className="h-bot flex flex-col items-start px-20">
            <h1>
              <span className="h-title">
                <p style={{ fontFamily: "Poppins, sans-serif" }}>
                  CHÀO MỪNG ĐẾN VỚI
                </p>
                <p className="mt-1">FEV - SHOP</p>
              </span>
            </h1>
            <h3
              className="h-content mt-3"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Vị ngon trên từng hương vị.
            </h3>
            <button
              className="bg-[#00AEFF] text-white py-5 px-10 rounded-full tracking-widest mt-8"
              style={{ fontSize: "24px", marginRight: "475px" }}
            >
              <b>TẠO ĐƠN HÀNG</b>
            </button>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 ">
          <div className="flex items-center mb-4">
            <button onClick={handleBackClick} className="mr-2">
              <ArrowBackIcon />
            </button>
            <h2 className="text-2xl font-semibold">Đơn hàng của bạn</h2>
          </div>
          <h3>
            Bạn có <span style={{ color: "#0adc5d" }}>{cart.length}</span> sản
            phẩm trong giỏ hàng
          </h3>
          <ul>
            {cart.map((product, index) => (
              <div
                key={index}
                className="card-product flex justify-between items-center p-10 gap-10 rounded-lg  bg-white shadow"
              >
                <img src={product.image} alt={product.name} className="w-32" />
                <div className="flex flex-col items-start ml-4">
                  <span className="text-base font-bold">{product.name}</span>
                  <span className="text-sm">{product.category}</span>
                </div>
                <span className="text-lg">{product.quantity}</span>
                <div className="flex flex-col items-end">
                  <span className="text-base">
                    {(product.price * product.quantity).toLocaleString(
                      "vi-VN",
                      {
                        minimumFractionDigits: 0,
                      }
                    )}{" "}
                    VND
                  </span>
                </div>
                <span onClick={() => removeItem(product.id)}>
                  <DeleteIcon />
                </span>
              </div>
            ))}
          </ul>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4"
            onClick={handleAddMoreProductsClick}
          >
            Thêm sản phẩm
          </button>
        </div>

        <div className="p-20 rounded-3xl max-h-20 ">
          <div className="p-6 rounded-lg shadow-md bg-[#00AEFF] text-white font-semibold">
            <h1 className="text-5xl font-semibold mb-6 text-white">
              Thông tin đơn hàng
            </h1>
            <form className="flex flex-col space-y-4 text-xl">
              <div className="flex flex-col mb-4">
                <label htmlFor="username" className="text-white font-medium ">
                  Tên khách hàng
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Thông tin khách hàng"
                  className="mt-1 p-2 border bg-[#C5E3FF] rounded-md font-semibold text-black"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label
                  htmlFor="phone-number"
                  className="font-medium text-white"
                >
                  Số điện thoại
                </label>
                <input
                  type="text"
                  id="phone-number"
                  name="phone-number"
                  placeholder="Số điện thoại"
                  className="mt-1 p-2 border bg-[#C5E3FF] rounded-md font-semibold text-black"
                />
              </div>
              <div className="border-b border-gray-300 mb-4"></div>
              <div className="flex justify-between mb-4">
                <p>{cart.length} sản phẩm</p>
                <p>
                  {cart
                    .reduce(
                      (total, item) => total + item.price * item.quantity,
                      0
                    )
                    .toLocaleString("vi-VN", { minimumFractionDigits: 0 })}{" "}
                  VNĐ
                </p>
              </div>
              <div className="flex justify-between mb-4">
                <p>Tổng cộng</p>
                <p>
                  {cart
                    .reduce(
                      (total, item) => total + item.price * item.quantity,
                      0
                    )
                    .toLocaleString("vi-VN", { minimumFractionDigits: 0 })}{" "}
                  VNĐ
                </p>
              </div>
              <div className="flex justify-between mb-4">
                <button
                  type="button"
                  onClick={handleCheckoutClick}
                  className="w-full bg-white text-[#0adc5d] py-2 px-4 rounded-md text-4xl font-bold"
                  style={{ backgroundColor: "white", color: "black" }}
                >
                  THANH TOÁN
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <button onClick={handleCloseModal} className="close-icon">
              <CloseIcon />
            </button>
            <h2 className="font-bold">QR Code</h2>
            <img src={qr_code} alt="QR Code" />
            <button
              onClick={handleConfirmPaymentClick}
              className="bg-[#0ADC5D] text-white font-bold"
            >
              THANH TOÁN
            </button>
          </div>
        </div>
      )}

      {isPaymentSuccessful && (
        <div className="modal-overlay">
          <div className="modal success-modal">
            <button
              onClick={() => setIsPaymentSuccessful(false)}
              className="close-icon"
            >
              <CloseIcon />
            </button>
            <div className="success-content">
              <CheckCircleIcon
                style={{ color: "#0ADC5D", fontSize: "100px" }}
              />
            </div>
            <h2 className="success-text font-bold">THANH TOÁN THÀNH CÔNG</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentOrder;
