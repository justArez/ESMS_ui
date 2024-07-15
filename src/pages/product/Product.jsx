import React, { useState, useEffect } from "react";
import { CartProvider, useCart } from "./CartContext";
import axios from "axios";
import "./product.scss";
import Footer from "../../components/Footer";
import PizzaHeader from "../../assets/images/margherita-pizza_3.png";
import { FaCirclePlus } from "react-icons/fa6";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import DeleteIcon from "@mui/icons-material/Delete";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import Navbar from "../../admin/Navbar";
import { useParams, useNavigate } from "react-router-dom";
import { RiEditCircleFill } from "react-icons/ri";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebaseConfig"; // Ensure this path is correct

const ProductCart = ({ data, onEdit }) => {
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
        <button
          className="p-2 rounded-md text-lg hover:bg-gray-300 flex items-center justify-center ml-2"
          onClick={() => onEdit(data)}
        >
          <RiEditCircleFill />
        </button>
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

const SalesShopOrderContent = ({ shopId }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [products, setProducts] = useState([]);
  const { cart, incrementQuantity, decrementQuantity, removeItem } = useCart();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [productImageUrl, setProductImageUrl] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `https://668e540abf9912d4c92dcd67.mockapi.io/Product?shopId=${shopId}`
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (shopId) {
      fetchProducts();
      const interval = setInterval(fetchProducts, 5000);
      return () => clearInterval(interval);
    }
  }, [shopId]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const storageRef = ref(storage, `product_images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setUploadProgress(progress);
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.error("Upload error:", error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setProductImageUrl(downloadURL);
        }
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newProduct = {
        name: productName,
        price: parseInt(price),
        image: productImageUrl,
        category,
        status,
        description,
        quantity: parseInt(quantity),
        shopId, // Include shopId here
      };

      if (isEdit) {
        await axios.put(
          `https://668e540abf9912d4c92dcd67.mockapi.io/Product/${editProductId}`,
          newProduct
        );
        setIsEdit(false);
        setEditProductId(null);
      } else {
        await axios.post(
          "https://668e540abf9912d4c92dcd67.mockapi.io/Product",
          newProduct
        );
      }

      setShowForm(false);
      clearFormFields();
    } catch (error) {
      console.error("Error submitting product:", error);
    }
  };

  const handleCreateProductClick = () => {
    setShowForm(true);
    setIsEdit(false);
    clearFormFields();
  };

  const handleEditProductClick = (product) => {
    setShowForm(true);
    setIsEdit(true);
    setEditProductId(product.id);
    setProductName(product.name);
    setPrice(product.price);
    setProductImageUrl(product.image);
    setCategory(product.category);
    setStatus(product.status);
    setDescription(product.description);
    setQuantity(product.quantity);
  };

  const clearFormFields = () => {
    setProductName("");
    setPrice("");
    setProductImageUrl("");
    setCategory("");
    setStatus("");
    setDescription("");
    setQuantity(0);
    setUploadProgress(0);
  };

  const handleCheckoutClick = () => {
    navigate(`/payment`, { state: { shopId } });
  };

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
                >{`CHÀO MỪNG ĐẾN VỚI`}</p>
                <p className="mt-1">FEV - SHOP</p>
              </span>
            </h1>
            <h3
              className="h-content mt-3"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Vị ngon trên từng hương vị.
            </h3>
            <div className="flex gap-5">
              <button
                className="add-to-cart-wrapper mt-2 bg-blue-500 text-white text-sm p-2 rounded hover:bg-blue-600 transition duration-300"
                onClick={handleCreateProductClick}
              >
                <div className="add-to-cart" style={{ fontSize: "bold" }}>
                  Thêm sản phẩm
                </div>
              </button>
            </div>
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
              <ProductCart
                key={product.id}
                data={product}
                onEdit={handleEditProductClick}
              />
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
                  onClick={handleCheckoutClick}
                >
                  THANH TOÁN
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showForm && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative w-1/2 max-w-lg">
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-4 text-center">
                {isEdit ? "Chỉnh sửa sản phẩm" : "Tạo mới sản phẩm"}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4 flex items-center">
                  <label
                    htmlFor="productName"
                    className="text-sm font-medium text-gray-700 w-1/4"
                  >
                    Tên sản phẩm
                  </label>
                  <input
                    type="text"
                    id="productName"
                    name="productName"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="mt-1 border border-gray-300 rounded-md w-3/4"
                    required
                  />
                </div>
                <div className="mb-4 flex items-center">
                  <label
                    htmlFor="price"
                    className="text-sm font-medium text-gray-700 w-1/4"
                  >
                    Giá cả
                  </label>
                  <input
                    type="text"
                    id="price"
                    name="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="mt-1 border border-gray-300 rounded-md w-3/4"
                    required
                  />
                </div>
                <div className="mb-4 flex items-center">
                  <label
                    htmlFor="quantity"
                    className="text-sm font-medium text-gray-700 w-1/4"
                  >
                    Số lượng
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="mt-1 border border-gray-300 rounded-md w-3/4"
                    required
                  />
                </div>
                <div className="border-b-2 mb-4"></div>
                <div className="mb-4 flex items-center">
                  <label
                    htmlFor="productImage"
                    className="text-sm font-medium text-gray-700 w-1/4"
                  >
                    Hình ảnh sản phẩm
                  </label>
                  <input
                    type="file"
                    id="eventImage"
                    name="eventImage"
                    onChange={handleImageUpload}
                    className="hidden"
                    accept="image/*"
                  />
                  <label
                    htmlFor="eventImage"
                    className="cursor-pointer p-2 border border-gray-300 rounded-md w-3/4 text-center hover:bg-gray-100 transition duration-300"
                  >
                    <AddPhotoAlternateIcon />
                  </label>
                </div>
                {uploadProgress > 0 && (
                  <div className="w-full bg-gray-200 rounded-full mt-2">
                    <div
                      className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                      style={{ width: `${uploadProgress}%` }}
                    >
                      {uploadProgress}%
                    </div>
                  </div>
                )}
                <div className="border-b-2 mb-4"></div>
                <div className="mb-4 flex items-center">
                  <label
                    htmlFor="category"
                    className="text-sm font-medium text-gray-700 w-1/4"
                  >
                    Loại sản phẩm
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-3/4 text-sm"
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="Food">Food</option>
                    <option value="Drink">Drink</option>
                    <option value="Snack">Snack</option>
                  </select>
                </div>
                <div className="mb-4 flex items-center">
                  <label
                    htmlFor="status"
                    className="text-sm font-medium text-gray-700 w-1/4"
                  >
                    Trạng thái
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-3/4 text-sm"
                    required
                  >
                    <option value="">Chọn trạng thái</option>
                    <option value="Active">Còn hàng</option>
                    <option value="Inactive">Hết hàng</option>
                  </select>
                </div>
                <div className="mb-4 flex items-center">
                  <label
                    htmlFor="description"
                    className="text-sm font-medium text-gray-700 w-1/4"
                  >
                    Thông tin sản phẩm
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-1 text-sm p-2 border border-gray-300 rounded-md w-3/4 h-24 resize-none"
                    required
                  ></textarea>
                </div>
                <div className="border-b mb-4"></div>
                <div className="flex justify-between mt-4">
                  <button
                    type="button"
                    className="w-1/3 text-[#00AEFF] border rounded-lg text-xl"
                    onClick={() => setShowForm(false)}
                  >
                    Hủy bỏ
                  </button>
                  <button
                    type="submit"
                    className="w-1/3 bg-[#00AEFF] text-white p-2 rounded-lg text-xl"
                  >
                    Xác nhận
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const SalesShopOrder = () => {
  const { shopId } = useParams();

  return (
    <CartProvider>
      <SalesShopOrderContent shopId={shopId} />
    </CartProvider>
  );
};

export default SalesShopOrder;
