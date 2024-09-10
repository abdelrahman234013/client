"use client";
import {
  decreaseProductQty,
  increaseProductQty,
} from "@/app/redux/features/cart/cartSlice";
import React from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { useDispatch } from "react-redux";

const QuantityCounter = ({ product }: any) => {
  const dispatch = useDispatch();
  const handleIncreaseQty = () => {
    dispatch(increaseProductQty({ product, size: product.size }));
  };
  const handleDecreaseQty = () => {
    if (product.quantity > 1) {
      dispatch(decreaseProductQty({ product, size: product.size }));
    }
  };
  return (
    <div className="flex-center text-slate-300 ml-1 ">
      <span>{product.quantity}</span>
      <div className="flex-col items-center ml-1 justify-center text-white">
        <IoMdArrowDropup size={18} onClick={handleIncreaseQty} />
        <IoMdArrowDropdown size={18} onClick={handleDecreaseQty} />
      </div>
    </div>
  );
};

export default QuantityCounter;
