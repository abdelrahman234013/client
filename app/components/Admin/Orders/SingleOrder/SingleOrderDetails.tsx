"use client";
import Image from "next/image";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import { IoReceiptOutline } from "react-icons/io5";
import {
  useGetSingleOrderQuery,
  useUpdateOrderStatusMutation,
} from "@/app/redux/features/orders/orderApi";
import toast from "react-hot-toast";
import { format } from "timeago.js";
import { FaArrowLeft } from "react-icons/fa6";
import Heading from "@/app/utils/Heading";
import Price from "@/app/utils/Price";
import OrderStatus from "./OrderStatus";
import ShippingAddress from "./ShippingAddress";
import PaymentInfo from "./PaymentInfo";

type Props = {
  id: any;
};

const SingleOrderDetails: FC<Props> = ({ id }) => {
  const [open, setOpen] = useState<any>({ status: false, msg: "" });

  const { data, refetch } = useGetSingleOrderQuery<any>(id, {
    refetchOnMountOrArgChange: true,
  });

  const [updateData, { isSuccess, error, isLoading }] =
    useUpdateOrderStatusMutation<any>();

  const handleChangeStatus = async (status: any) => {
    if (!isLoading) {
      await updateData({ id, status });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success("Order status updated successfully");
      setOpen({ status: false, msg: "" });
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, error]);

  const formattedDate = format(
    (data as unknown as { createdAt: string })?.createdAt,
  );

  return (
    <div className="w-full pb-14 flex flex-col">
      <Heading
        title={
          data?.orderNumber
            ? `Order Number ${data?.orderNumber} - limited.eg`
            : `Order - limited.eg`
        }
      />
      <div className=" flex flex-row justify-between  mx-20 mt-10 items-center px-5">
        <div className="flex flex-row items-end gap-5">
          <div className="flex-center gap-3 text-white">
            <IoReceiptOutline size={28} className="text-primary" />
            <h1 className="text-2xl font-bold">
              Order
              <span className="text-primary ml-1">Details</span>
            </h1>
          </div>
        </div>
        <Link
          href={"/admin"}
          className="flex-center gap-2 px-4 py-2 font-semibold hover:bg-opacity-80 rounded-md bg-primary text-white"
        >
          <FaArrowLeft />
          <span>BACK TO DASHBOARD</span>
        </Link>
      </div>
      <div
        className={`text-white flex flex-row justify-between mx-20 mt-12 items-center px-20 font-semibold`}
      >
        <span>
          <span className="text-purple-300">Order Number :</span>{" "}
          {data?.orderNumber}
        </span>
        <span className="text-purple-300">
          Placed On: <span className=" text-white">{formattedDate}</span>
        </span>
      </div>
      {data &&
        data.orderItems?.map((item: any, index: any) => (
          <div
            className="flex flex-row my-10 justify-start items-start gap-10 mr-5  px-32"
            key={index}
          >
            <Image
              src={item.product.images[0].url}
              alt={"image"}
              width={200}
              height={200}
            />
            <div className="flex flex-col items-start justify-center py-3 gap-5">
              <span className={` text-purple-300 font-semibold text-[20px]`}>
                {item.product.name}
              </span>
              <span className={`text-white flex-center gap-2`}>
                <span className=" text-purple-300">Price: </span>{" "}
                {
                  <Price
                    price={item.product.price}
                    discountPrice={item.product.discountPrice}
                  />
                }
              </span>
              <span className={`text-white flex-center gap-2`}>
                <span className=" text-purple-300">Quantity: </span>{" "}
                {item.quantity}
              </span>
              <span className={`text-white flex-center gap-2`}>
                <span className=" text-purple-300">SubTotal: </span>{" "}
                {
                  <Price
                    price={item.product.price * item.quantity}
                    discountPrice={item.product.discountPrice * item.quantity}
                  />
                }
              </span>
            </div>
          </div>
        ))}

      <hr className="border border-purple-300 border-opacity-10 " />
      <div className=" flex justify-end px-20 py-5">
        <span className={`text-white font-bold mb-3`}>
          <span className=" text-purple-300">Total: </span>
          {data?.totalPrice} EGP
        </span>
      </div>
      <div className="flex flex-row justify-around items-start ">
        {/* SHIPPING ADDRESS */}
        <ShippingAddress data={data} />

        {/* PAYMENT INFO */}
        <PaymentInfo data={data} />

        {/* ORDER STATUS */}
        <OrderStatus
          data={data}
          open={open}
          setOpen={setOpen}
          handleChangeStatus={handleChangeStatus}
        />
      </div>
    </div>
  );
};

export default SingleOrderDetails;
