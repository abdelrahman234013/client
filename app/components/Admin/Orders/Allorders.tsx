"use client";
import {
  useDeleteOrderMutation,
  useGetAllOrdersQuery,
} from "@/app/redux/features/orders/orderApi";
import { styles } from "@/app/styles/style";
import Heading from "@/app/utils/Heading";
import { Box, Button, Modal } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

const Allorders = () => {
  const [open, setOpen] = useState(false);
  const [orderId, setOrderId] = useState("");

  const { isLoading, data, error, refetch } = useGetAllOrdersQuery(
    {},
    { refetchOnMountOrArgChange: true },
  );
  const [
    deleteOrder,
    { error: deleteError, isSuccess: deleteSuccess, isLoading: deleteLoading },
  ] = useDeleteOrderMutation<any>();
  const ordersData = (data as Array<object>) || [];

  const columns = [
    { field: "id", headerName: "ID", flex: 0.2 },
    { field: "orderNumber", headerName: "OrderNumber", flex: 0.4 },
    { field: "email", headerName: "Email", flex: 0.5 },
    { field: "phoneNumber", headerName: "PhoneNumber", flex: 0.5 },
    { field: "city", headerName: "City", flex: 0.4 },
    { field: "orderStatus", headerName: "OrderStatus", flex: 0.5 },
    { field: "totalPrice", headerName: "TotalPrice", flex: 0.3 },
    {
      field: "  ",
      headerName: "Order Details",
      flex: 0.5,
      renderCell: (params: any) => {
        return (
          <>
            <Link
              href={`/admin/order-details/${params.row.id}`}
              className="flex justify-center items-center mt-3 "
            >
              <FaArrowUpRightFromSquare className="text-white" size={16} />
            </Link>
          </>
        );
      },
    },
    {
      field: "Delete",
      HeaderName: "Delete",
      flex: 0.4,
      renderCell: (params: any) => {
        return (
          <>
            <Button
              onClick={() => {
                setOpen(!open);
                setOrderId(params.row.id);
              }}
            >
              <AiOutlineDelete className="text-white" size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const rows: any = [];

  {
    ordersData &&
      ordersData?.forEach((order: any) => {
        rows.push({
          id: order._id,
          orderNumber: order.orderNumber,
          email: order.userInfo.email,
          phoneNumber: order.userInfo.phone,
          city: order.shippingAddress.city,
          orderStatus: order.orderStatus,
          totalPrice: order.totalPrice,
        });
      });
  }

  useEffect(() => {
    if (deleteError) {
      if ("data" in deleteError) {
        const errorMessage = deleteError as any;
        toast.error(errorMessage.data.message);
      }
    }

    if (deleteSuccess) {
      refetch();
      toast.success("Order Deleted successfully!");
      setOpen(false);
    }
  }, [deleteError, deleteSuccess, refetch]);

  const handleDelete = async () => {
    const id = orderId;
    if (!deleteLoading) {
      await deleteOrder(id);
    }
  };

  return (
    <div className="">
      <Heading title="Orders - limited.eg" />

      <Box m="10px 20px">
        <Box
          m="40px 0 0 0"
          height="80vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              outline: "none",
            },
            "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
              color: "#fff",
            },
            "& .MuiDataGrid-sortIcon": {
              color: "#fff",
            },
            "& .MuiDataGrid-row": {
              color: "#fff",
              borderBottom: "1px solid #631b1b2f!important",
            },
            "& .MuiTablePagination-root": {
              color: "#fff",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none!important",
            },
            "& .name-column--cell": {
              color: "#fff",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#7a3e96",
              borderBottom: "none",
              color: "#000000",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: "#1F2A40",
            },
            "& .MuiDataGrid-footerContainer": {
              color: "#fff",
              borderTop: "none",
              backgroundColor: "#151d2d",
            },
            "& .MuiCheckbox-root": {
              color: `#b7ebde !important`,
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `#fff !important`,
            },
          }}
        >
          <DataGrid rows={rows} columns={columns} />
        </Box>
      </Box>
      {open && (
        <Modal
          open={open}
          onClose={() => setOpen(!open)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white rounded-[8px] shadow p-4 outline-none">
            <h1 className={`${styles.title}`}>
              Are you sure you want to delete this order ?
            </h1>
            <div className="flex w-full items-center justify-between mb-6 mt-4">
              <div
                className={`${styles.button} text-white !w-[120px] h-[30px] bg-[#57c7a3]`}
                onClick={() => setOpen(!open)}
              >
                Cancel
              </div>
              <div
                className={`${styles.button} text-white !w-[120px] h-[30px] bg-[#d63f3f]`}
                onClick={handleDelete}
              >
                Delete
              </div>
            </div>
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default Allorders;
