import React, { useState, useEffect } from "react";
import axios from "axios";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Footer from "../../../components/Footer";
import a_1 from "../../../assets/images/a_1.png";
import "react-datepicker/dist/react-datepicker.css";
import "./Shop.scss";
import { RiEditCircleFill } from "react-icons/ri";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { storage } from "../../../firebaseConfig"; // Correct path to firebaseConfig.js
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; // Import necessary Firebase Storage functions

const Shop = () => {
  const [shops, setShops] = useState([]);
  const [editingShop, setEditingShop] = useState(null);

  const fetchShops = async () => {
    try {
      const response = await axios.get(
        "https://668e540abf9912d4c92dcd67.mockapi.io/Shop"
      );
      setShops(response.data);
    } catch (error) {
      console.error("Error fetching shops:", error);
    }
  };

  useEffect(() => {
    fetchShops();
  }, []);

  const handleEdit = (shop) => {
    setEditingShop(shop);
  };

  const handleSave = async (updatedShop) => {
    try {
      if (updatedShop.id) {
        await axios.put(
          `https://668e540abf9912d4c92dcd67.mockapi.io/Shop/${updatedShop.id}`,
          updatedShop
        );
        setShops((prevShops) =>
          prevShops.map((shop) =>
            shop.id === updatedShop.id ? updatedShop : shop
          )
        );
      } else {
        const response = await axios.post(
          "https://668e540abf9912d4c92dcd67.mockapi.io/Shop",
          updatedShop
        );
        setShops([...shops, response.data]);
      }
    } catch (error) {
      console.error("Error saving shop:", error);
    }
    setEditingShop(null);
  };

  const handleCreateShopClick = () => {
    setEditingShop({
      id: null,
      title: "",
      description: "",
      image: "",
    });
  };

  return (
    <div className="">
      <CreateShopSection onCreateShopClick={handleCreateShopClick} />
      <div className="w-full mt-10 flex justify-center mb-10">
        <div className="text-[#242565] text-center font-dmSansBold text-[40px] font-bold">
          CÁC CỬA HÀNG
        </div>
      </div>
      <div className="shop-list">
        {shops.map((shop) => (
          <ShopItem key={shop.id} item={shop} onEdit={handleEdit} />
        ))}
      </div>
      {editingShop && (
        <ShopForm
          item={editingShop}
          onSave={handleSave}
          onCancel={() => setEditingShop(null)}
        />
      )}
      <Footer />
    </div>
  );
};

const ShopItem = ({ item, onEdit }) => {
  const { id, image, title, description } = item;

  return (
    <div className="shop-item">
      <div className="shop-item-img-container">
        <img className="shop-item-image" src={image} alt={title} />
      </div>
      <div className="shop-item-info">
        <div className="shop-item-header">
          <div className="shop-item-name">
            <p>{title}</p>
          </div>
        </div>
        <div className="shop-item-desc">
          <RiEditCircleFill
            className="shop-item-button"
            onClick={() => onEdit(item)}
          ></RiEditCircleFill>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

const ShopForm = ({ item, onSave, onCancel }) => {
  const { id, title, description, image } = item;
  const [shopTitle, setShopTitle] = useState(title || "");
  const [shopDescription, setShopDescription] = useState(description || "");
  const [shopImage, setShopImage] = useState(image || "");
  const [shopImageUrl, setShopImageUrl] = useState(image || "");
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const storageRef = ref(storage, `shop_images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setUploadProgress(progress);
        },
        (error) => {
          console.error("Upload error:", error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setShopImageUrl(downloadURL);
        }
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...item,
      title: shopTitle,
      description: shopDescription,
      image: shopImageUrl,
    });
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">
            {id ? "Chỉnh sửa cửa hàng" : "Thêm cửa hàng"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4 flex gap-5">
              <label
                htmlFor="shopTitle"
                className="flex items-center text-sm font-medium text-gray-700 w-1/4"
              >
                Tiêu đề cửa hàng
              </label>
              <input
                type="text"
                id="shopTitle"
                name="shopTitle"
                value={shopTitle}
                onChange={(e) => setShopTitle(e.target.value)}
                className="mt-1 border border-gray-300 rounded-md w-full"
                required
              />
            </div>
            <div className="mb-4 flex gap-5">
              <label
                htmlFor="shopDescription"
                className="flex items-center text-sm font-medium text-gray-700 w-1/4"
              >
                Thông tin cửa hàng
              </label>
              <textarea
                id="shopDescription"
                name="shopDescription"
                value={shopDescription}
                onChange={(e) => setShopDescription(e.target.value)}
                className="mt-1 text-sm p-2 border border-gray-300 rounded-md w-full h-24 resize-none"
                required
              ></textarea>
            </div>
            <div className="mb-4 flex gap-5">
              <label
                htmlFor="shopImage"
                className="flex items-center text-sm font-medium text-gray-700 w-1/4"
              >
                Hình ảnh cửa hàng
              </label>
              <input
                type="file"
                id="shopImage"
                name="shopImage"
                onChange={handleImageUpload}
                className="mt-1 border border-gray-300 rounded-md w-full"
                accept="image/*"
              />
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
            <div className="border-b mb-4"></div>
            <div className="flex justify-end gap-5">
              <button
                type="button"
                className="w-full text-[#0adc5d] border rounded-lg text-xl"
                onClick={onCancel}
              >
                Hủy bỏ
              </button>
              <button
                type="submit"
                className="w-full bg-[#0adc5d] text-white p-2 rounded-lg text-xl"
              >
                Xác nhận
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const CreateShopSection = ({ onCreateShopClick }) => {
  return (
    <div className="flex justify-center items-center bg-[#C5E3FF] p-10 mt-10 space-x-10">
      <img className="h-64 w-80" src={a_1} alt="People sitting on a sofa" />
      <div>
        <h2 className="text-4xl font-bold font-DmSans text-gray-900 mb-4">
          Danh sách cửa hàng
        </h2>
        <button
          className="bg-[#4F4F4F] text-white font-bold py-2 px-4 w-[182px] h-[60px] text-[16px] cursor-pointer rounded-full shadow-[0_10px_50px_rgba(61,55,241,0.25)] font-DmSans"
          onClick={onCreateShopClick}
        >
          Thêm cửa hàng
        </button>
      </div>
    </div>
  );
};

export default Shop;
