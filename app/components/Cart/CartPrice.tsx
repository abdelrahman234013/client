"use client";
import { TiArrowRight } from "react-icons/ti";
import { getTotals } from "@/app/redux/features/cart/cartSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Price from "@/app/utils/Price";
import Link from "next/link";

const CartPrice = () => {
  const { cartTotalPrice, cartItems, cartTotalPriceAfterDiscount } =
    useSelector((state: any) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    if (cartItems?.length > 0) {
      dispatch(getTotals({}));
    }
  }, [cartItems]);
  return (
    <div
      className={`${
        cartItems?.length === 0 && "hidden"
      } border lg:w-[50%] px-4 border-slate-200 lg:justify-items-start rounded-sm mt-6 text-white pb-3 pt-6`}
    >
      <div className="flex-center w-full pb-2 gap-1">
        <span>TOTAL:</span>
        <span>
          <Price
            price={cartTotalPrice}
            discountPrice={cartTotalPriceAfterDiscount}
            inCartPrice={true}
          />
        </span>
      </div>
      <div className="w-full h-[1px] bg-slate-200 my-2" />
      <Link
        href="/checkout"
        className="py-2 cursor-pointer flex-center gap-1 hover:text-primary"
      >
        <span>CHECKOUT</span>
        <TiArrowRight size={24} />
      </Link>
    </div>
  );
};

export default CartPrice;
