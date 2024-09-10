"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { customerInputsStyles, customerLabelsStyles } from "@/app/utils/styles";
import Heading from "@/app/utils/Heading";
import Image from "next/image";
import { useCreateEventMutation } from "@/app/redux/features/events/eventApi";
import { redirect } from "next/navigation";

const CreateEvent = () => {
  const [createEvent, { isLoading: createLoading, isSuccess, error }] =
    useCreateEventMutation<any>();
  const [image, setImage] = useState<any>(null);
  const [start, setStart] = useState({
    date: "",
    time: "",
  });
  const [end, setEnd] = useState({
    date: "",
    time: "",
  });
  const [productId, setProductId] = useState("");

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to convert object to string format
  const FormatDateFromObjectToString = (obj: any) => {
    const { date, time } = obj;
    const [year, month, day] = date.split("-");
    const [hour, minute] = time.split(":");
    return `${parseInt(month)}/${parseInt(day)}/${year} ${hour}:${minute}:00`;
  };

  // Function to convert string format to object
  // function stringToObject(str) {
  //   const [date, time] = str.split(" ");
  //   const [month, day, year] = date.split("/");
  //   const [hour, minute] = time.split(":");
  //   return {
  //     date: `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`,
  //     time: `${hour}:${minute}`,
  //   };
  // }

  useEffect(() => {
    if (isSuccess) {
      toast.success("Event created Successfully!");
      redirect("/admin");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [error, isSuccess]);

  const handleCreateEvent = async (e: any) => {
    e.preventDefault();

    if (
      !start.date ||
      !start.time ||
      !end.date ||
      !end.time ||
      !productId ||
      !image
    ) {
      return toast.error("Please fill all the fields");
    } else {
      const data = {
        startTime: FormatDateFromObjectToString(start),
        endTime: FormatDateFromObjectToString(end),
        productId,
        eventProductImg: image,
      };
      await createEvent(data);
    }
  };

  return (
    <div className="flex flex-col w-[80%] mx-auto mt-8 gap-6">
      <Heading title="Create Event - limited.eg" />

      {/* EVENT START & END */}
      <div className="!text-white flex items-center justify-between">
        {/* START */}
        <div className="w-[48%]">
          <label className={`${customerLabelsStyles} mb-4`}>Event start</label>
          <div className="border p-5 rounded-md">
            <div className="mb-4 ">
              <label
                className={`${customerLabelsStyles} !text-[16px] !text-slate-300`}
              >
                Date
              </label>
              <input
                type="date"
                required
                value={start.date}
                onChange={(e: any) =>
                  setStart({ ...start, date: e.target.value })
                }
                className={customerInputsStyles}
              />
            </div>
            <div className="mb-4 ">
              <label
                className={`${customerLabelsStyles} !text-[16px] !text-slate-300`}
              >
                Time
              </label>

              <input
                type="time"
                required
                value={start.time}
                onChange={(e: any) =>
                  setStart({ ...start, time: e.target.value })
                }
                className={customerInputsStyles}
              />
            </div>
          </div>
        </div>

        {/* END */}
        <div className="w-[48%]">
          <label className={`${customerLabelsStyles} mb-4`}>Event end</label>
          <div className="border p-5 rounded-md">
            <div className="mb-4 ">
              <label
                className={`${customerLabelsStyles} !text-[16px] !text-slate-300`}
              >
                Date
              </label>
              <input
                type="date"
                required
                value={end.date}
                onChange={(e: any) => setEnd({ ...end, date: e.target.value })}
                className={customerInputsStyles}
              />
            </div>
            <div className="mb-4 ">
              <label
                className={`${customerLabelsStyles} !text-[16px] !text-slate-300`}
              >
                Time
              </label>

              <input
                type="time"
                required
                value={end.time}
                onChange={(e: any) => setEnd({ ...end, time: e.target.value })}
                className={customerInputsStyles}
              />
            </div>
          </div>
        </div>
      </div>

      {/* EVENT PRODUCT ID */}
      <div>
        <label htmlFor="product id" className={customerLabelsStyles}>
          Product ID
        </label>
        <input
          type="text"
          id="product id"
          required
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          className={customerInputsStyles}
        />
      </div>

      {/* EVENT PRODUCT IMAGE */}
      <div className="w-full">
        <label className={customerLabelsStyles}>Product Image</label>
        <input
          name="image"
          required
          type="file"
          accept="image/*"
          id="file"
          className="hidden"
          onChange={handleFileChange}
        />
        <label
          htmlFor="file"
          className={`w-full cursor-pointer min-h-[13vh] border-[#A0A5BA]  border-[1px] p-3 rounded-md flex items-center justify-center
               bg-transparent
              `}
        >
          {image ? (
            <Image
              src={image.url ? image.url : image}
              alt=""
              // className="max-h-full w-full object-cover"

              width={150}
              height={150}
              objectFit="cover"
            />
          ) : (
            <div className="text-[#A0A5BA] w-full flex flex-col items-center justify-center">
              <div className="sm:text-[14px] text-xs">
                {" "}
                Drag and drop your Image here or click to browse
              </div>
            </div>
          )}
        </label>
      </div>

      {/* SUBMIT BUTTON */}
      <div className="">
        <div
          className={`${
            !createLoading
              ? "hover:bg-indigo-400 cursor-pointer"
              : "cursor-not-allowed"
          } flex items-center justify-center bg-indigo-500 rounded h-[40px] w-[300px] text-white  font-medium whitespace-nowrap`}
          onClick={handleCreateEvent}
        >
          {createLoading ? <span className="loader-small" /> : "Submit"}
        </div>
        {createLoading && (
          <span className="-mt-4 font-medium text-secondary">
            <span>It will take a couple of seconds</span>
          </span>
        )}
      </div>
    </div>
  );
};

export default CreateEvent;
