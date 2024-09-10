import {
  useDeleteEventMutation,
  useGetAllAdminEventsQuery,
} from "@/app/redux/features/events/eventApi";
import { styles } from "@/app/styles/style";
import Heading from "@/app/utils/Heading";
import { Box, Button, Modal } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { FaArrowRight } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { format } from "timeago.js";

const AllEvents = () => {
  const { data, refetch } = useGetAllAdminEventsQuery(
    {},
    { refetchOnMountOrArgChange: true },
  );
  const [deleteEvent, { error: deleteError, isSuccess: deleteSuccess }] =
    useDeleteEventMutation<any>();

  const [eventId, setEventId] = useState("");
  const eventsData = (data as Array<object>) || [];
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (deleteError) {
      if ("data" in deleteError) {
        const errorMessage = deleteError as any;
        toast.error(errorMessage.data.message);
      }
    }

    if (deleteSuccess) {
      refetch();
      toast.success("Delete user successfully!");
      setOpen(false);
    }
  }, [deleteError, deleteSuccess, refetch]);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.2 },
    { field: "eventStatus", headerName: "EventStatus", flex: 0.2 },
    { field: "winnerClient", headerName: "WinnerClient", flex: 0.3 },
    { field: "startTime", headerName: "StartTime", flex: 0.3 },
    { field: "endTime", headerName: "EndTime", flex: 0.3 },
    {
      field: "Details",
      HeaderName: "Details",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Button>
              <Link href={`/admin/event/${params.row.id}`}>
                <FaArrowRight className="text-white" size={20} />
              </Link>
            </Button>
          </>
        );
      },
    },
    {
      field: "Edit",
      HeaderName: "Edit",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Button>
              <Link
                href={
                  params.row.eventStatus === "Live"
                    ? `/admin/event/edit/${params.row.id}`
                    : "/"
                }
              >
                <FiEdit
                  className={`${
                    params.row.eventStatus === "Live"
                      ? "text-white"
                      : "text-secondary cursor-not-allowed"
                  }`}
                  size={18}
                />
              </Link>
            </Button>
          </>
        );
      },
    },
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
                setEventId(params.row.id);
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
    eventsData &&
      eventsData.forEach((event: any) => {
        rows.push({
          id: event._id,
          eventStatus: event.eventStatus,
          winnerClient: event.winnerClient
            ? event.winnerClient?.firstName
            : "Not determined",
          startTime: format(event.startTime),
          endTime: format(event.endTime),
        });
      });
  }

  const handleDelete = async () => {
    const id = eventId;
    await deleteEvent(id);
  };

  return (
    <div className="">
      <Heading title="Events - limited.eg" />
      <div className=" w-full flex justify-end">
        <Link
          href={"/admin/event/create"}
          className=" !w-[200px] !h-[35px]  bg-primary cursor-pointer rounded-full flex justify-center mr-6 items-center p-5 "
        >
          Create Event
        </Link>
      </div>
      <Box m="0 20px">
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
            <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
              <h1 className={`${styles.title}`}>
                Are you sure you want to delete this event ?
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

export default AllEvents;
