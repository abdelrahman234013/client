"use client";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from "@/app/redux/features/user/userApi";
import { styles } from "@/app/styles/style";
import Heading from "@/app/utils/Heading";
import { Box, Button, Modal } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { format } from "timeago.js";

const AllUsers = () => {
  const { isLoading, data, error, refetch } = useGetAllUsersQuery(
    {},
    { refetchOnMountOrArgChange: true },
  );
  const [deleteUser, { error: deleteError, isSuccess }] = useDeleteUserMutation(
    {},
  );
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (deleteError) {
      if ("data" in deleteError) {
        const errorMessage = deleteError as any;
        toast.error(errorMessage.data.message);
      }
    }

    if (isSuccess) {
      refetch();
      toast.success("Delete user successfully!");
      setOpen(false);
    }
  }, [deleteError, isSuccess, refetch]);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "name", headerName: "Name", flex: 0.5 },
    { field: "email", headerName: "Email", flex: 0.5 },
    { field: "role", headerName: "Role", flex: 0.5 },
    { field: "created_at", headerName: "Joined At", flex: 0.5 },
    {
      field: "Delete",
      HeaderName: "Delete",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Button
              onClick={() => {
                setOpen(!open);
                setUserId(params.row.id);
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
      data.forEach((user: any) => {
        rows.push({
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          created_at: format(user.createdAt),
        });
      });
  }

  const handleDelete = async () => {
    const id = userId;
    await deleteUser(id);
  };

  return (
    <div className="">
      <Heading title="Users - limited.eg" />
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
        {open && (
          <Modal
            open={open}
            onClose={() => setOpen(!open)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white rounded-[8px] shadow p-4 outline-none">
              <h1 className={`${styles.title}`}>
                Are you sure you want to delete this user ?
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

export default AllUsers;
