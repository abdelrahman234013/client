"use client";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import { useSelector } from "react-redux";
import { Space_Mono } from "next/font/google";
const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
});
const CurrentPage = ({ currentPage }: any) => {
  const { cartItems } = useSelector((state: any) => state.cart);
  const pages = ["checkout", "orderComplete"];

  return (
    <div
      className={`${
        currentPage !== "orderComplete" && cartItems?.length < 1
          ? "hidden"
          : "flex-center w-full flex-wrap"
      } ${
        spaceMono.className
      } m-auto  text-white  gap-1 mt-8 font-[400] text-[15px] md:text-[18px]`}
    >
      <Link href={"/cart"} className="text-primary">
        Cart
      </Link>
      <IoIosArrowForward
        size={25}
        className={`${
          pages.includes(currentPage) ? " text-primary" : "text-white "
        }
        `}
      />
      <Link
        href={"/checkout"}
        className={`${
          pages.includes(currentPage) ? " text-primary" : "text-white"
        }
        `}
      >
        Checkout
      </Link>
      <IoIosArrowForward
        size={25}
        className={`
        ${currentPage === "orderComplete" ? " text-primary" : "text-white"}
        `}
      />

      <div
        className={`
        ${currentPage === "orderComplete" ? " text-primary" : "text-white"}
        `}
      >
        Order Complete
      </div>
    </div>
  );
};

export default CurrentPage;
