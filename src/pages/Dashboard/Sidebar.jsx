import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import EventIcon from "@mui/icons-material/Event";
import InventoryIcon from "@mui/icons-material/Inventory";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import "./sidebar.scss";

export default function Sidebar({ setActiveComponent }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any stored user information (e.g., token, user details)
    localStorage.removeItem("userToken");
    localStorage.removeItem("userAvatar");

    // Redirect to the login page
    navigate("/login");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmLogout = () => {
    handleLogout();
    handleClose();
  };

  const icons = [
    AttachMoneyIcon,
    InventoryIcon,
    EventIcon,
    DraftsIcon,
    SendIcon,
  ];
  const menuItems = [
    { text: "Thống kê doanh thu", component: "SalesOverview" },
    { text: "Quản Lí Tài Khoản", component: "AccountManagement" },
    { text: "Sự kiện", component: "EventsManagement" },
  ];

  const DrawerList = (
    <Box
      sx={{
        width: 300,
        background: "#1e2d48",
        color: "white",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        border: "none",
      }}
      role="presentation"
    >
      <div
        className="nav-logo flex justify-center p-6"
        style={{ width: "100%" }}
      >
        <h1 className="text-xl font-bold">Dashboard</h1>
      </div>

      <List sx={{ flexGrow: 1 }}>
        {menuItems.map(({ text, component }, index) => {
          const IconComponent = icons[index % icons.length];
          return (
            <ListItem key={text} disablePadding>
              <ListItemButton
                onClick={() => setActiveComponent(component)}
                sx={{
                  "&:hover": {
                    backgroundColor: "#2c394f",
                    "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
                      color: "white",
                    },
                  },
                }}
              >
                <ListItemIcon sx={{ color: "white" }}>
                  <IconComponent />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <div className="flex justify-between text-end my-5 p-2">
        <div className="flex gap-3 justify-center items-center">
          <AccountCircleIcon sx={{ fontSize: 40 }} />
          <h1 className="">Admin</h1>
        </div>

        <MoreHorizIcon
          sx={{ fontSize: 40, cursor: "pointer" }}
          onClick={handleClickOpen}
        />
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
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
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button onClick={handleConfirmLogout} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );

  return (
    <Box
      sx={{
        "&:hover": {
          backgroundColor: "#1e293b",
        },
        transition: "background-color 0.3s",
      }}
    >
      <Drawer
        variant="permanent"
        sx={{
          width: 300,
          flexShrink: 0,
        }}
      >
        {DrawerList}
      </Drawer>
    </Box>
  );
}
