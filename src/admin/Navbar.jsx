import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/images/esms 4.png";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const navigate = useNavigate();

  const handleToggleDropdown = (index) => {
    if (openDropdown === index) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(index);
    }
  };

  const handleOpenLogoutDialog = () => {
    setOpenLogoutDialog(true);
  };

  const handleCloseLogoutDialog = () => {
    setOpenLogoutDialog(false);
  };

  const handleConfirmLogout = () => {
    // Clear any stored user information (e.g., token, user details)
    localStorage.removeItem("userToken");
    localStorage.removeItem("userAvatar");

    // Redirect to the login page
    navigate("/login");
    handleCloseLogoutDialog();
  };

  const userAvatar = localStorage.getItem("userAvatar");

  const menuItems = [
    // {
    //   title: "SẢN PHẨM",
    //   subItems: [
    //     { name: "Danh sách sản phẩm", url: "/Product" },
    //     { name: "Tạo mới sản phẩm", url: "/Create" },
    //   ],
    // },
    {
      title: "DANH SÁCH",
      subItems: [
        // { name: "Cửa hàng", url: "/shop" },
        { name: "Danh sách mua hàng", url: "/ListOrders" },
        // { name: "Danh sách thẻ", url: "/ListCards" },
        // { name: "Danh sách tài khoản", url: "/ListAccounts" },
      ],
    },
    {
      title: "ĐƠN HÀNG",
      subItems: [
        { name: "Doanh thu", url: "Cart" },
        { name: "Thanh toán", url: "/Payment" },
        { name: "Sản phẩm đã bán", url: "/Cart" },
      ],
    },
    {
      title: "CÀI ĐẶT",
      subItems: [{ name: "Vendor Dashboard", url: "/VendorDash" }],
    },
  ];

  return (
    <div className="header relative z-50 ">
      <div className="navbar flex flex-row justify-between items-center px-20 py-4">
        <div
          className="nav-logo flex flex-row items-center gap-x-4"
          style={{ width: "100px" }}
        >
          <a href="/home">
            <img className="object-cover" loading="lazy" alt="" src={Logo} />
          </a>
        </div>

        <div
          className="flex flex-row justify-between items-center gap-x-10 h-menu"
          style={{ fontFamily: "Poppins", fontSize: "20px" }}
        >
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="relative "
              style={{ fontFamily: "Poppins, sans-serif", fontSize: "20px" }}
            >
              <button
                className="font-semibold flex items-center"
                onClick={() => handleToggleDropdown(index)}
              >
                {item.title}
                {openDropdown === index ? (
                  <ExpandLessIcon className="ml-1" />
                ) : (
                  <ExpandMoreIcon className="ml-1" />
                )}
              </button>
              {openDropdown === index && (
                <div
                  className="absolute mt-2 bg-white shadow-lg rounded-lg z-50 overflow-hidden"
                  style={{ width: "200px" }}
                >
                  {item.subItems.map((subItem, subIndex) => (
                    <a
                      key={subIndex}
                      href={subItem.url}
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                    >
                      {subItem.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          <button
            onClick={handleOpenLogoutDialog}
            className="flex items-center"
          >
            <LogoutIcon />
          </button>
          <PersonIcon />
        </div>
      </div>
      {openDropdown !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-40"
          onClick={() => setOpenDropdown(null)}
        ></div>
      )}
      <Dialog
        open={openLogoutDialog}
        onClose={handleCloseLogoutDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Logout"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to log out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseLogoutDialog} color="primary">
            No
          </Button>
          <Button onClick={handleConfirmLogout} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
