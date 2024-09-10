"use client";
import { egyptCities } from "@/app/utils/data";
import { customerInputsStyles, customerLabelsStyles } from "@/app/utils/styles";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import OrderSummary from "./OrderSummary";
import { useCreateOrderMutation } from "@/app/redux/features/orders/orderApi";
import { redirect } from "next/navigation";
import { clearAll } from "@/app/redux/features/cart/cartSlice";

const CustomerInfo = () => {
  const [createOrder, { isLoading, isSuccess, error }] =
    useCreateOrderMutation<any>();
  const dispatch = useDispatch();
  const {
    cartItems,
    cartTotalPrice,
    cartTotalPriceAfterDiscount,
    cartTotalQty,
  } = useSelector((state: any) => state.cart);
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [shippingAddress, setShippingAddress] = useState({
    address: "",
    city: "",
    zip: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !userInfo.firstName ||
      !userInfo.lastName ||
      !shippingAddress.address ||
      !shippingAddress.city ||
      !shippingAddress.zip ||
      !userInfo.email ||
      !userInfo.phone ||
      !paymentMethod
    ) {
      toast.error("Please fill in all fields");
      return;
    }
    let orderItems = [];
    for (const item of cartItems) {
      orderItems.push({
        id: item._id,
        quantity: item.quantity,
        size: item.size,
      });
    }
    if (!isLoading) {
      await createOrder({
        userInfo,
        shippingAddress,
        paymentMethod: {
          type: paymentMethod,
          status: "unpaid",
        },
        orderItems,
        totalQty: cartTotalQty,
        totalPrice: cartTotalPriceAfterDiscount,
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Ordered success!");
      dispatch(clearAll());
      redirect("/orderComplete");
    }

    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, error]);

  return (
    <form onSubmit={handleSubmit} className="w-[80%] flex flex-col gap-2">
      <div className="flex flex-col md:flex-row gap-4  justify-center items-center w-full">
        {/* first name */}
        <div className="w-full">
          <label htmlFor="Fname" className={customerLabelsStyles}>
            First Name
          </label>
          <input
            value={userInfo.firstName}
            onChange={(e) =>
              setUserInfo({ ...userInfo, firstName: e.target.value })
            }
            type="text"
            id="Fname"
            name="Fname"
            className={customerInputsStyles}
          />
        </div>

        {/* last name */}
        <div className="w-full">
          <label htmlFor="Lname" className={customerLabelsStyles}>
            Last Name
          </label>
          <input
            value={userInfo.lastName}
            onChange={(e) =>
              setUserInfo({ ...userInfo, lastName: e.target.value })
            }
            type="text"
            id="Lname"
            className={customerInputsStyles}
          />
        </div>
      </div>

      {/* address */}
      <div className="w-full mt-3">
        <label htmlFor="address" className={customerLabelsStyles}>
          Address{" "}
        </label>
        <input
          value={shippingAddress.address}
          onChange={(e) =>
            setShippingAddress({ ...shippingAddress, address: e.target.value })
          }
          type="text"
          id="address"
          placeholder="Enter your street address"
          className={customerInputsStyles}
        />
      </div>

      {/* city */}
      <div className="w-full mt-3 ">
        <label htmlFor="city" className={customerLabelsStyles}>
          City
        </label>

        <select
          id="city"
          className="bg-transparent text-secondary border border-white focus:border-secondary text-sm rounded-lg  block w-full p-2.5 outline-none"
          value={shippingAddress.city}
          onChange={(e) =>
            setShippingAddress({ ...shippingAddress, city: e.target.value })
          }
        >
          <option selected>Choose your city</option>
          {egyptCities.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {/* zip */}
      <div className="w-full mt-3">
        <label htmlFor="zip" className={customerLabelsStyles}>
          Post Code/ZIP{" "}
        </label>
        <input
          value={shippingAddress.zip}
          onChange={(e) =>
            setShippingAddress({ ...shippingAddress, zip: e.target.value })
          }
          type="text"
          id="zip"
          className={customerInputsStyles}
        />
      </div>

      {/* email */}
      <div className="w-full mt-3">
        <label htmlFor="email" className={customerLabelsStyles}>
          Email{" "}
        </label>

        <input
          type="text"
          id="email"
          className={customerInputsStyles}
          value={userInfo.email}
          onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
        />
        <p className="text-[12px] text-secondary mt-1">
          Double check your email to track your order
        </p>
      </div>

      {/* phone */}
      <div className="w-full mt-3">
        <label htmlFor="phone" className={customerLabelsStyles}>
          Phone Number
        </label>
        <input
          value={userInfo.phone}
          onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
          type="text"
          id="phone"
          className={customerInputsStyles}
        />
        <p className="text-[12px] text-secondary mt-1">
          In case we need to contact about your order
        </p>
      </div>

      <div className="w-full mt-3">
        <label htmlFor="paymentMethod" className={customerLabelsStyles}>
          Payment Method
        </label>
        <div className="border w-full text-secondary border-white focus:border-secondary flex flex-col  ">
          <div
            className={`${
              paymentMethod === "Cash On Delivery (COD)" &&
              "bg-secondary bg-opacity-40"
            }`}
          >
            <div
              className={`flex gap-[9px] p-5 items-center`}
              onClick={() => setPaymentMethod("Cash On Delivery (COD)")}
            >
              <div
                className={`${
                  paymentMethod === "Cash On Delivery (COD)"
                    ? "bg-secondary"
                    : "border-secondary"
                }  border-2 w-[14px] h-[14px] rounded-full`}
              />
              <p>Cash On Delivery (COD)</p>
            </div>
          </div>
          <hr className="w-full" />
          <div
            className={`${
              paymentMethod === "Pay With Visa" && "bg-secondary bg-opacity-40"
            } flex gap-[9px] p-5 items-center`}
            onClick={() => setPaymentMethod("Pay With Visa")}
          >
            <div
              className={`${
                paymentMethod === "Pay With Visa"
                  ? "bg-secondary"
                  : "border-secondary"
              }  border-2 w-[14px] h-[14px] rounded-full`}
            />
            <p>Pay With Visa</p>
          </div>
        </div>
      </div>
      <OrderSummary
        cartItems={cartItems}
        cartTotalPrice={cartTotalPrice}
        cartTotalPriceAfterDiscount={cartTotalPriceAfterDiscount}
      />
      <button
        className="py-3 px-4 mt-4 border-[1px]  rounded-md border-white text-white hover:border-primary text-bold lg:mt-8 text-[20px] hover:text-primary lg:w-[40%] w-full flex-center"
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="loader-small" />
        ) : (
          <span> Complete Order</span>
        )}
      </button>
    </form>
  );
};

export default CustomerInfo;
