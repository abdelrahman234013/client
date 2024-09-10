"use client";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Modal } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
// import Image from "next/image";
import { FiEdit2 } from "react-icons/fi";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "@/app/redux/features/products/productApi";
import { styles } from "@/app/styles/style";
import toast from "react-hot-toast";
import Heading from "@/app/utils/Heading";
import Link from "next/link";

const AllProducts = () => {
  const { isLoading, data, refetch } = useGetProductsQuery(
    {},
    { refetchOnMountOrArgChange: true },
  );
  const [deleteProduct, { error: deleteError, isSuccess }] =
    useDeleteProductMutation({});
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState("");

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success("Product deleted successfully!");
      setOpen(!open);
    }

    if (deleteError) {
      if ("data" in deleteError) {
        const errorMessage = deleteError as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [deleteError, isSuccess, refetch]);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "name", headerName: "Name", flex: 0.4 },
    { field: "price", headerName: "Price", flex: 0.3 },
    { field: "discountPrice", headerName: "DiscountPrice", flex: 0.3 },
    { field: "inStock", headerName: "InStock", flex: 0.3 },
    {
      field: "  ",
      headerName: "Edit",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Button>
              <Link href={`/admin/product/${params.row.id}`}>
                <FiEdit2 className="text-white mr-6" size={20} />
              </Link>
            </Button>
          </>
        );
      },
    },
    {
      field: " ",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Button
              onClick={() => {
                setOpen(!open);
                setProductId(params.row.id);
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
    data &&
      data.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          price: item.price,
          discountPrice: item.discountPrice,
          inStock: item.inStock,
        });
      });
  }

  const handleDelete = async () => {
    const id = productId;
    await deleteProduct(id);
  };

  return (
    <div className="">
      <Heading title="Products - limited.eg" />

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
              padding: "0 15px",
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
              backgroundColor: "#d2a4f0",
              borderBottom: "none",
              color: "#000000",
              padding: "0 15px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
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
        {open && (
          <Modal
            open={open}
            onClose={() => setOpen(!open)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
              <h1 className={`${styles.title}`}>
                Are you sure you want to delete this product?
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
      </Box>
    </div>
  );
};

export default AllProducts;
