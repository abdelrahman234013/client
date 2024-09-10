"use client";
import { removeFromCart } from "@/app/redux/features/cart/cartSlice";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import QuantityCounter from "./QuantityCounter";
import Price from "@/app/utils/Price";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";

const CartProducts = () => {
  const { cartItems } = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();

  return (
    <>
      {cartItems?.length !== 0 ? (
        <div className="flex flex-col gap-4 lg:gap-8">
          {cartItems?.map((item: any, index: number) => (
            <div
              className={` border-b-slate-100 
                border-b-[1px] pb-7
              flex items-start flex-col lg:pt-6 lg:flex-row lg:gap-16`}
              key={index}
            >
              <Link href={`/product/${item._id}`} className="">
                <Image
                  src={item.images[0].url}
                  alt={"image"}
                  width={250}
                  height={250}
                  className="lg:w-[230px]"
                />
              </Link>
              <div>
                <div className="flex flex-row lg:flex-col items-center justify-around py-3 lg:py-0 mt-2 lg:mt-0 lg:justify-start h-full lg:items-start  lg:gap-20">
                  <span className="text-white text-sm lg:text-lg font-[400] lg:font-bold ">
                    Product<span className="lg:hidden">:</span>
                  </span>
                  <span className="text-white ml-1 lg:ml-0 text-sm lg:text-lg font-[400]">
                    {item.name}
                  </span>
                  <div
                    className="underline lg:block hidden -mt-14 text-red-400 cursor-pointer"
                    onClick={() =>
                      dispatch(
                        removeFromCart({
                          productId: item._id,
                          size: item.size,
                        }),
                      )
                    }
                  >
                    Remove
                  </div>
                </div>
              </div>
              <div>
                <div className="flex flex-row lg:flex-col items-center justify-around pb-2  lg:justify-start h-full lg:gap-20">
                  <span className="text-white text-sm lg:text-lg font-[400] lg:font-bold ">
                    Price<span className="lg:hidden">:</span>
                  </span>
                  <span className="text-white ml-1 lg:ml-0 text-sm lg:text-lg font-semibold">
                    <Price
                      price={item.price * item.quantity}
                      discountPrice={item.discountPrice * item.quantity}
                    />
                  </span>
                </div>
              </div>
              <div>
                <div className="flex flex-row lg:flex-col items-center justify-around pb-2 lg:justify-start h-full  lg:gap-20">
                  <span className="text-white text-sm lg:text-lg font-[400] lg:font-bold ">
                    Size<span className="lg:hidden">:</span>
                  </span>
                  <div className="text-slate-300 ml-1 text-sm border border-slate-300 py-[2px] px-2  lg:text-xl font-[400]">
                    {item.size}
                  </div>
                </div>
              </div>
              <div>
                <div className="flex flex-row lg:flex-col items-center justify-around pb-1 lg:justify-start h-full  lg:gap-20">
                  <span className="text-white text-sm lg:text-lg font-[400] lg:font-bold ">
                    Quantity<span className="lg:hidden">:</span>
                  </span>
                  <div className="text-white text-sm lg:text-xl font-semibold">
                    <QuantityCounter product={item} />
                  </div>
                </div>
              </div>

              <div
                className="underline lg:hidden  text-red-400 cursor-pointer"
                onClick={() =>
                  dispatch(
                    removeFromCart({ productId: item._id, size: item.size }),
                  )
                }
              >
                Remove
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col w-full gap-4">
          <div className="flex flex-col mt-5 mb-16 text-center items-center justify-center gap-6 w-full">
            <div className="font-meduim text-center text-secondary text-[24px] flex-center w-full">
              No Products In Cart...
            </div>
            <div className="flex-center gap-2">
              <FaArrowLeft className="w-[20px] h-[20px] text-primary" />
              <Link href="/" className="text-primary text-[20px] font-medium">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartProducts;
