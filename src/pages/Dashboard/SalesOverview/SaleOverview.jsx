import * as React from "react";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

const columns = [
  {
    field: "id",
    headerName: "STT",
    width: 70,
    headerClassName: "header-bold",
  },
  {
    field: "shopname",
    headerName: "Tên Shop",
    width: 150,
    headerClassName: "header-bold",
  },
  {
    field: "totalProducts",
    headerName: "Tổng SL Sản phẩm",
    width: 150,
    headerClassName: "header-bold",
  },
  {
    field: "totalRevenue",
    headerName: "Tổng doanh thu",
    type: "number",
    width: 200,
    headerClassName: "header-bold",
    renderCell: (params) => (
      <div style={{ width: "100%" }}>
        {params.value.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        })}
      </div>
    ),
  },
];

export default function SaleOverview() {
  const [rows, setRows] = useState([]);
  const [searchText, setSearchText] = useState("");

  const fetchData = async () => {
    try {
      const shopResponse = await axios.get(
        "https://668e540abf9912d4c92dcd67.mockapi.io/Shop"
      );
      const orderResponse = await axios.get(
        "https://668e540abf9912d4c92dcd67.mockapi.io/orders"
      );

      const shopData = shopResponse.data;
      const orderData = orderResponse.data;

      const shopSummary = shopData.map((shop) => {
        const shopOrders = orderData.filter(
          (order) => order.shopId === shop.id
        );
        const totalProducts = shopOrders.reduce(
          (sum, order) =>
            sum +
            order.products.reduce(
              (productSum, product) => productSum + product.quantity,
              0
            ),
          0
        );
        const totalRevenue = shopOrders.reduce(
          (sum, order) => sum + order.total,
          0
        );

        return {
          id: shop.id,
          shopname: shop.title || "Unknown Shop",
          totalProducts,
          totalRevenue,
        };
      });

      setRows(shopSummary);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData(); // Initial fetch
    const interval = setInterval(fetchData, 10000); // Refresh data every 10 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const filteredRows = rows.filter(
    (row) =>
      row.shopname &&
      row.shopname.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-2xl mb-4 text-start font-bold">Thống kê doanh thu</h2>
      <div className="flex justify-between">
        <TextField
          variant="outlined"
          placeholder="Search..."
          value={searchText}
          onChange={handleSearchChange}
          style={{
            marginBottom: "20px",
            width: "250px",
            borderRadius: "10px",
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <p className="font-bold text-xl">
          Tổng doanh thu:{" "}
          {rows
            .reduce((sum, row) => sum + row.totalRevenue, 0)
            .toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
        </p>
      </div>

      <div style={{ height: 500, width: "70%" }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 100]}
        />
      </div>

      <style jsx>{`
        .header-bold {
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}
