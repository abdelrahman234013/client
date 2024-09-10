"use client";
import { FaArrowLeft } from "react-icons/fa6";
import { TbListDetails } from "react-icons/tb";

import { useGetAdminEventQuery } from "@/app/redux/features/events/eventApi";
import Link from "next/link";
import Image from "next/image";
import Timer from "./Timer";
import { format } from "timeago.js";

const EventDetails = ({ EventId }: any) => {
  const { data, isLoading, error } = useGetAdminEventQuery<any>(EventId);

  return (
    <>
      {!isLoading ? (
        <>
          {data && (
            <div className="w-[80%] mx-auto">
              <div className="w-full flex items-center justify-between">
                <div className="flex-center gap-2 text-white">
                  <TbListDetails size={28} className="text-primary" />
                  <h1 className="text-2xl font-bold">
                    Event
                    <span className="text-primary ml-1">Details</span>
                  </h1>
                </div>
                <Link
                  href={"/admin"}
                  className="flex-center gap-2 px-4 py-2 font-semibold hover:bg-opacity-80 rounded-md bg-primary text-white"
                >
                  <FaArrowLeft />
                  <span>BACK TO DASHBOARD</span>
                </Link>
              </div>
              <div className="flex items-center py-8 mt-3 justify-between w-full">
                <div className=" w-[50%]  flex flex-col items-start gap-3">
                  <div className="w-full flex-center">
                    <Image
                      src={data.eventProductImg.url}
                      alt="PNG"
                      width={320}
                      height={320}
                    />
                  </div>
                  <div className="w-full flex-center">
                    <Timer event={data} />
                  </div>
                </div>
                <div className="w-[45%]  items-start text-slate-200 justify-start flex flex-col gap-5 font-medium">
                  <div
                    className={`${
                      data.eventStatus === "Live"
                        ? "bg-green-600"
                        : "bg-red-500"
                    } px-4 py-1 text-white rounded-md`}
                  >
                    {data.eventStatus}
                  </div>
                  <p className="flex-center gap-2">
                    <span className="text-[20px] font-semibold">
                      TOTAL CLIENTS IN DRAW
                    </span>
                    <span>:</span>
                    <span>{data.usersList.length}</span>
                  </p>
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-[20px] font-semibold">WINNER👑</span>
                    <span>:</span>
                    {data.winnerClient ? (
                      <div className="flex flex-col gap-1 text-slate-300">
                        <div>Name : {data.winnerClient.firstName}</div>
                        <div>Email :{data.winnerClient.email}</div>
                        <div>PhoneNumber : {data.winnerClient.phone}</div>
                      </div>
                    ) : (
                      <div className="flex flex-col">Not determined</div>
                    )}
                  </div>

                  <p className="flex-center gap-2">
                    <span className="text-[20px] font-semibold">
                      CREATED AT
                    </span>
                    <span>:</span>

                    <span>{format(data.createdAt)}</span>
                  </p>
                  <p className="flex-center gap-2">
                    <span className="text-[20px] font-semibold">
                      UPDATED AT
                    </span>
                    <span>:</span>
                    <span>{format(data.updatedAt)}</span>
                  </p>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="w-full h-[90vh] flex-center">
          <div className="loader" />
        </div>
      )}
      {error && <div className="w-full">Event Not Found...</div>}
    </>
  );
};

export default EventDetails;
