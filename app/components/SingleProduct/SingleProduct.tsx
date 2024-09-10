"use client";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import Size from "./Size";
import { useGetSingleProductQuery } from "@/app/redux/features/products/productApi";
import { useDispatch } from "react-redux";
import { addToCart } from "@/app/redux/features/cart/cartSlice";
import Price from "@/app/utils/Price";
import toast from "react-hot-toast";
import Heading from "@/app/utils/Heading";

type Props = {
  id: string;
};

const SingleProduct: FC<Props> = ({ id }) => {
  const [selectedSize, setSelectedSize] = useState("");
  const [mainImage, setMainImage] = useState("");
  const { data, isLoading, isSuccess } = useGetSingleProductQuery(id);
  const [product, setProduct] = useState<any>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      setProduct(data);
      setMainImage(data.images[0].url);
    }
  }, [data, isSuccess]);

  const handleSizeChange = (newSize: any) => {
    setSelectedSize(newSize);
  };

  const handleImageChange = (newImage: string) => {
    setMainImage(newImage);
  };

  const handleAddToCart = () => {
    if (product.inStock) {
      if (selectedSize === "") {
        toast.error("Please select a size");
      } else {
        dispatch(addToCart({ product, size: selectedSize }));
      }
    }
  };

  return (
    <div
      className={`flex flex-col lg:flex-row items-center justify-around  py-8`}
    >
      <Heading
        title={`${product?.name} - limited.eg`}
        description={product?.description}
        keywords={product?.description}
      />
      {!isLoading ? (
        <div className="flex flex-col lg:flex-row items-center lg:items-start lg:gap-24 gap-5 justify-center lg:py-6">
          {product ? (
            <>
              <div className="flex flex-col justify-center items-start">
                {product.inEvent && product.inStock && (
                  <p className="text-secondary lg:text-[16px] text-[12px] text-center pb-4 px-2 ">
                    🔥 Buy any item and enter a draw on this item
                  </p>
                )}
                <div className="relative">
                  <Image
                    src={mainImage}
                    alt={"image"}
                    width={250}
                    height={250}
                    className="lg:w-[500px] relative "
                  />
                  {!product.inStock && (
                    <div className="top-2 right-1 rounded-md text-sm font-semibold absolute px-3 py-1 text-white border uppercase border-white">
                      Sold Out
                    </div>
                  )}
                  {product.inEvent && product.inStock && (
                    <div className="top-2 right-1 rounded-md text-sm font-semibold absolute px-3 py-1 text-white border uppercase border-white">
                      Limited-Edition
                    </div>
                  )}
                </div>
                <div className=" flex flex-row items-center w-full justify-start gap-5 py-5">
                  {product.images.map((img: any, index: number) => (
                    <button
                      onClick={() => handleImageChange(img.url)}
                      key={index}
                    >
                      <Image
                        src={img.url}
                        alt={"image"}
                        width={50}
                        height={50}
                        className={`border-2 cursor-pointer hover:border-[#d2a4f0] transition-all lg:w-[150px] ${
                          mainImage === img.url && "border-[#d2a4f0]"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div className="sm:py-5 w-full flex flex-col justify-start items-start gap-3 lg:gap-10">
                <span className="text-white text-[16px] lg:text-2xl font-semibold">
                  {product.name}
                </span>
                {product.description !== "" && (
                  <p className="text-slate-200 text-[14px] py-2">
                    {product.description}
                  </p>
                )}

                <div className="flex gap-4">
                  {product.info.map((element: any, index: number) => (
                    <Size
                      key={index}
                      name={element.size}
                      inStock={element.inStock}
                      onClick={handleSizeChange}
                      isSelected={selectedSize == element.size}
                    />
                  ))}
                </div>
                <div className="flex flex-col items-start gap-3 my-5">
                  <Price
                    price={product.price}
                    discountPrice={product.discountPrice}
                  />
                  <button
                    className={`${
                      !product.inStock
                        ? "border-slate-400 cursor-not-allowed text-slate-400  hover:bg-none"
                        : "rounded-2xl border-2 border-dashed border-black bg-primary px-6 py-3 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_white] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none"
                    } text-md lg:text-2xl font-semibold  lg:border-4 border-2 rounded px-10 py-1  transition duration-300`}
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-center font-medium text-[22px] text-white">
              No Product Found...
            </div>
          )}
        </div>
      ) : (
        <span className="flex-center loader" />
      )}
    </div>
  );
};

export default SingleProduct;
