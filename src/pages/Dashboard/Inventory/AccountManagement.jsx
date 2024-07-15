import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  Typography,
  Modal,
  TextField,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#242565",
    },
  },
});

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 4,
};

export default function AccountManagement() {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    role: "vendor",
  });

  useEffect(() => {
    axios
      .get("https://668e540abf9912d4c92dcd67.mockapi.io/login")
      .then((response) => {
        const dataWithStatus = response.data
          .filter((user) => user.role === "vendor")
          .map((user) => ({
            ...user,
            status: user.status || "Inactive",
          }));
        setUsers(dataWithStatus);
      });
  }, []);

  const handleStatusToggle = (id) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id
          ? {
              ...user,
              status: user.status === "Active" ? "Inactive" : "Active",
            }
          : user
      )
    );

    const updatedUser = users.find((user) => user.id === id);
    axios.put(`https://668e540abf9912d4c92dcd67.mockapi.io/login/${id}`, {
      ...updatedUser,
      status: updatedUser.status === "Active" ? "Inactive" : "Active",
    });
  };

  const handleCreateAccount = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://668e540abf9912d4c92dcd67.mockapi.io/login", newUser)
      .then((response) => {
        setUsers([...users, response.data]);
        setNewUser({ username: "", password: "", role: "vendor" });
        setOpen(false);
      });
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ p: 4 }}>
        <Typography
          variant="h4"
          color="primary"
          align="center"
          gutterBottom
          fontWeight="bold"
        >
          Account Management
        </Typography>
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <button
            className="bg-[#393939] text-white font-bold py-2 px-4 w-[182px] h-[60px] text-[16px] cursor-pointer rounded-full shadow-[0_10px_50px_rgba(61,55,241,0.25)] font-DmSans"
            onClick={handleCreateAccount}
          >
            Create Account
          </button>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Password</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, index) => (
                <TableRow key={user.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.password}</TableCell>
                  <TableCell>
                    <Typography
                      color={user.status === "Active" ? "green" : "red"}
                    >
                      {user.status}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <button
                      className="bg-[#393939] text-white font-bold py-2 px-4 w-[182px] h-[60px] text-[16px] cursor-pointer rounded-full shadow-[0_10px_50px_rgba(61,55,241,0.25)] font-DmSans"
                      onClick={() => handleStatusToggle(user.id)}
                    >
                      Toggle Status
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2">
            Create New Account
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Username"
              name="username"
              value={newUser.username}
              onChange={handleInputChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={newUser.password}
              onChange={handleInputChange}
              margin="normal"
              required
            />
            <Box mt={2} display="flex" justifyContent="flex-end">
              <button
                className="bg-[#393939] text-white font-bold py-2 px-4 w-[182px] h-[60px] text-[16px] cursor-pointer rounded-full shadow-[0_10px_50px_rgba(61,55,241,0.25)] font-DmSans"
                type="submit"
              >
                Create Account
              </button>
            </Box>
          </form>
        </Box>
      </Modal>
    </ThemeProvider>
  );
}
