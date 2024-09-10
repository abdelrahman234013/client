"use client";
import {
  useAddAdminMutation,
  useGetAllUsersQuery,
  useRemoveAdminMutation,
} from "@/app/redux/features/user/userApi";
import { Box, Button, Modal } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { format } from "timeago.js";
import { styles } from "../../../../app/styles/style";
import toast from "react-hot-toast";
import Heading from "@/app/utils/Heading";

const AllUsers = () => {
  const [active, setActive] = useState(false);
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);

  const { isLoading, data, error, refetch } = useGetAllUsersQuery(
    {},
    { refetchOnMountOrArgChange: true },
  );
  const [AddAdmin, { error: addError, isSuccess }] = useAddAdminMutation();
  const [RemoveAdmin, { error: removeError, isSuccess: removeSuccess }] =
    useRemoveAdminMutation();

  useEffect(() => {
    if (addError) {
      if ("data" in addError) {
        const errorMessage = addError as any;
        toast.error(errorMessage.data.message);
      }
    }

    if (isSuccess) {
      refetch();
      toast.success("User role updated successfully");
      setActive(false);
    }

    if (removeSuccess) {
      refetch();
      toast.success("Delete user successfully!");
      setOpen(false);
    }
    if (removeError) {
      if ("data" in removeError) {
        const errorMessage = removeError as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [addError, isSuccess, refetch, removeError, removeSuccess]);

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
                setEmail(params.row.email);
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
    const newData =
      data &&
      data.filter(
        (user: any) => user.role === "admin" || user.role === "owner",
      );
    newData &&
      newData.forEach((user: any) => {
        rows.push({
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          created_at: format(user.createdAt),
        });
      });
  }

  const handleSubmit = async () => {
    await AddAdmin({ email });
  };

  const handleDelete = async () => {
    await RemoveAdmin({ email });
  };

  return (
    <div className="">
      <Heading title="Admins - limited.eg" />
      <Box m="0 20px">
        <div className=" w-full flex justify-end">
          <div
            className=" !w-[200px] !h-[35px] cursor-pointer rounded-full bg-primary flex justify-center items-center p-5 "
            onClick={() => setActive(!active)}
          >
            Add New Member
          </div>
        </div>
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
        {active && (
          <Modal
            open={active}
            onClose={() => setActive(!active)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white rounded-[8px] shadow p-4 outline-none">
              <h1 className={`${styles.title}`}>Add New Member</h1>
              <div className="mt-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email..."
                  className={`${styles.input}`}
                />
                <br />
                <div
                  className={`${styles.button} my-6 !h-[30px]`}
                  onClick={handleSubmit}
                >
                  Submit
                </div>
              </div>
            </Box>
          </Modal>
        )}

        {open && (
          <Modal
            open={open}
            onClose={() => setOpen(!open)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
              <h1 className={`${styles.title}`}>
                Are you sure you want to delete this Admin?
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
