// import React, { useState, useEffect } from "react";
// import { CartProvider, useCart } from "./CartContext";
// import axios from "axios";
// import "./product.scss";
// import Footer from "../../components/Footer";
// import PizzaHeader from "../../assets/images/margherita-pizza_3.png";
// import { FaCirclePlus } from "react-icons/fa6";
// import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
// import DeleteIcon from "@mui/icons-material/Delete";
// import Navbar from "../../admin/Navbar";

// const ProductCart = ({ data }) => {
//   const { image, name, price } = data;
//   const { addToCart } = useCart();

//   const handleAddToCart = () => {
//     addToCart(data);
//   };

//   return (
//     <div
//       className="bg-white p-5 rounded-xl m-2 flex flex-col items-center"
//       style={{ boxShadow: "0 10px 50px rgba(181, 179, 255, 0.25)" }}
//     >
//       <img
//         src={image}
//         alt={name}
//         className="w-full h-60 object-cover object-center drop-shadow-[0_10px_15px_rgba(0,0,0,0.3)] rounded-md"
//       />
//       <h3 className="text-xl py-3 text-center font-medium mt-6">{name}</h3>
//       <div className="flex justify-between items-center w-full">
//         <p className="text-lg font-semibold mt-3">
//           {price.toLocaleString("vi-VN", { minimumFractionDigits: 0 })} VND
//         </p>
//         <button
//           className="p-2 rounded-md text-lg hover:bg-gray-300 flex items-center justify-center"
//           onClick={handleAddToCart}
//         >
//           <FaCirclePlus />
//         </button>
//       </div>
//     </div>
//   );
// };

// const SalesShopOrderContent = () => {
//   const [showPopup, setShowPopup] = useState(false);
//   const [products, setProducts] = useState([]);
//   const { cart, incrementQuantity, decrementQuantity, removeItem } = useCart();

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get(
//           "https://668e540abf9912d4c92dcd67.mockapi.io/Product"
//         );
//         setProducts(response.data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };

//     fetchProducts();
//     const interval = setInterval(fetchProducts, 5000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div>
//       <div className="header">
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

//       <div className="salesshop-order relative">
//         <div
//           className="mb-4 font-bold product-name uppercase text-center"
//           style={{ fontFamily: "Poppins, sans-serif", color: "#00AEFF" }}
//         >
//           sản phẩm
//         </div>
//         <div className="absolute top-14 right-20">
//           <button className="relative" onClick={() => setShowPopup(!showPopup)}>
//             <ShoppingCartCheckoutIcon fontSize="large" />
//             {cart.length > 0 && (
//               <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
//                 {cart.reduce((total, item) => total + item.quantity, 0)}
//               </span>
//             )}
//           </button>
//         </div>
//         <div className="product-list-wrapper relative">
//           <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
//             {products.map((product) => (
//               <ProductCart key={product.id} data={product} />
//             ))}
//           </div>
//         </div>
//       </div>
//       <Footer />
//       {showPopup && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-5 rounded-lg shadow-lg max-w-lg w-full">
//             <h2 className="text-2xl font-bold mb-4">Giỏ Hàng</h2>
//             <ul>
//               {cart.map((product, index) => (
//                 <li
//                   key={index}
//                   className="mb-2 flex items-center justify-between"
//                 >
//                   <img
//                     src={product.image}
//                     alt={product.name}
//                     className="w-16 h-16 object-cover rounded-md mr-4"
//                   />
//                   <div className="flex-1">
//                     <p className="font-bold">{product.name}</p>
//                     <div className="flex items-center">
//                       <button
//                         className="bg-gray-300 px-2 rounded"
//                         onClick={() => decrementQuantity(product.id)}
//                       >
//                         -
//                       </button>
//                       <span className="mx-2">{product.quantity}</span>
//                       <button
//                         className="bg-gray-300 px-2 rounded"
//                         onClick={() => incrementQuantity(product.id)}
//                       >
//                         +
//                       </button>
//                     </div>
//                     <p>
//                       Giá:{" "}
//                       {(product.price * product.quantity).toLocaleString(
//                         "vi-VN",
//                         { minimumFractionDigits: 0 }
//                       )}{" "}
//                       VND
//                     </p>
//                   </div>
//                   <button
//                     className="bg-red-500 text-white px-2 py-1 rounded-md ml-2"
//                     onClick={() => removeItem(product.id)}
//                   >
//                     <DeleteIcon />
//                   </button>
//                 </li>
//               ))}
//             </ul>
//             <div className="mt-4 text-center">
//               <p className="font-bold">
//                 Tổng cộng:{" "}
//                 {cart
//                   .reduce(
//                     (total, item) => total + item.price * item.quantity,
//                     0
//                   )
//                   .toLocaleString("vi-VN", { minimumFractionDigits: 0 })}{" "}
//                 VND
//               </p>
//               <div className="flex justify-center space-x-4">
//                 <button
//                   className="bg-gray-500 text-white px-4 py-2 rounded-md mt-4"
//                   onClick={() => setShowPopup(false)}
//                 >
//                   HỦY
//                 </button>
//                 <button
//                   className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
//                   onClick={() => (window.location.href = "/payment")}
//                 >
//                   THANH TOÁN
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// const SalesShopOrder = () => {
//   return (
//     <CartProvider>
//       <SalesShopOrderContent />
//     </CartProvider>
//   );
// };

// export default SalesShopOrder;

import React, { useState, useEffect } from "react";
import { useCart } from "./CartContext";
import axios from "axios";
import "./product.scss";
import Footer from "../../components/Footer";
import PizzaHeader from "../../assets/images/margherita-pizza_3.png";
import { FaCirclePlus } from "react-icons/fa6";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import DeleteIcon from "@mui/icons-material/Delete";
import Navbar from "../../admin/Navbar";

const ProductCart = ({ data }) => {
  const { image, name, price } = data;
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(data);
  };

  return (
    <div
      className="bg-white p-5 rounded-xl m-2 flex flex-col items-center"
      style={{ boxShadow: "0 10px 50px rgba(181, 179, 255, 0.25)" }}
    >
      <img
        src={image}
        alt={name}
        className="w-full h-60 object-cover object-center drop-shadow-[0_10px_15px_rgba(0,0,0,0.3)] rounded-md"
      />
      <h3 className="text-xl py-3 text-center font-medium mt-6">{name}</h3>
      <div className="flex justify-between items-center w-full">
        <p className="text-lg font-semibold mt-3">
          {price.toLocaleString("vi-VN", { minimumFractionDigits: 0 })} VND
        </p>
        <button
          className="p-2 rounded-md text-lg hover:bg-gray-300 flex items-center justify-center"
          onClick={handleAddToCart}
        >
          <FaCirclePlus />
        </button>
      </div>
    </div>
  );
};

const SalesShopOrderContent = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [products, setProducts] = useState([]);
  const { cart, incrementQuantity, decrementQuantity, removeItem } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://668e540abf9912d4c92dcd67.mockapi.io/Product"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
    const interval = setInterval(fetchProducts, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="header">
        <Navbar />
        <div className="flex flex-row py-4 justify-between relative">
          <div className="h-bot flex flex-col items-start px-20">
            <h1>
              <span className="h-title">
                <p
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >{`CHÀO MỪNG ĐẾN VỚI `}</p>
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

      <div className="salesshop-order relative">
        <div
          className="mb-4 font-bold product-name uppercase text-center"
          style={{ fontFamily: "Poppins, sans-serif", color: "#00AEFF" }}
        >
          sản phẩm
        </div>
        <div className="absolute top-14 right-20">
          <button className="relative" onClick={() => setShowPopup(!showPopup)}>
            <ShoppingCartCheckoutIcon fontSize="large" />
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                {cart.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </button>
        </div>
        <div className="product-list-wrapper relative">
          <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
            {products.map((product) => (
              <ProductCart key={product.id} data={product} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
      {showPopup && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-4">Giỏ Hàng</h2>
            <ul>
              {cart.map((product, index) => (
                <li
                  key={index}
                  className="mb-2 flex items-center justify-between"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-md mr-4"
                  />
                  <div className="flex-1">
                    <p className="font-bold">{product.name}</p>
                    <div className="flex items-center">
                      <button
                        className="bg-gray-300 px-2 rounded"
                        onClick={() => decrementQuantity(product.id)}
                      >
                        -
                      </button>
                      <span className="mx-2">{product.quantity}</span>
                      <button
                        className="bg-gray-300 px-2 rounded"
                        onClick={() => incrementQuantity(product.id)}
                      >
                        +
                      </button>
                    </div>
                    <p>
                      Giá:{" "}
                      {(product.price * product.quantity).toLocaleString(
                        "vi-VN",
                        { minimumFractionDigits: 0 }
                      )}{" "}
                      VND
                    </p>
                  </div>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded-md ml-2"
                    onClick={() => removeItem(product.id)}
                  >
                    <DeleteIcon />
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-4 text-center">
              <p className="font-bold">
                Tổng cộng:{" "}
                {cart
                  .reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  )
                  .toLocaleString("vi-VN", { minimumFractionDigits: 0 })}{" "}
                VND
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded-md mt-4"
                  onClick={() => setShowPopup(false)}
                >
                  HỦY
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
                  onClick={() => (window.location.href = "/payment")}
                >
                  THANH TOÁN
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const SalesShopOrder = () => {
  return <SalesShopOrderContent />;
};

export default SalesShopOrder;
