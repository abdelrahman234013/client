"use client";
import User from "./User";
import Cart from "./Cart";
import Link from "next/link";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTotals } from "@/app/redux/features/cart/cartSlice";
import Image from "next/image";


const Header = () => {
  const { cartItems, cartTotalQty } = useSelector((state: any) => state.cart);
  const { user } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotals({}));
  }, [cartItems, dispatch]);

  return (
    <nav className="bg-black fixed h-[63px] z-[1000] inset-0 flex md:h-[75px]  justify-center bg-opacity-70 xl:h-[78px]">
      <div className="flex w-full flex-wrap items-center justify-between mx-auto px-7 py-[10px] md:px-24  md:py-6">
        <Link
          href={"/"}
          className={`text-lg lg:text-3xl text-white font-semibold `}
        >
          <span className="text-2xl">Fifty_One</span>
          {/* <Image src={"/WhatsApp_Image_2024-07-29_at_14.31.18_72ee5238-removebg-preview (1).png"} width={300} height={300} alt={""} className="border-2"/> */}
        </Link>
        <div className="menu  md:w-auto" id="navbar">
          <ul className="flex gap-[14px]  py-1 md:p-0 md:flex-row md:space-x-2">
            <Cart cartTotalQty={cartTotalQty} />
            <User user={user} />
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
