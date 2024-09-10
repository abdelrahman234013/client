import Image from "next/image";
import React, { FC } from "react";
import Price from "@/app/utils/Price";
import {motion} from 'framer-motion'
import { fadeIn } from "../Transitions/variants";

type Props = {
  imgUrl: any;
  title: string;
  price: number;
  discountPrice: number;
  inStock: Boolean;
  inEvent: Boolean;
};

const ProductCard: FC<Props> = ({
  imgUrl,
  title,
  price,
  discountPrice,
  inStock,
  inEvent,
}) => {
  return (
    <div>
      <div className="flex flex-col items-center px-24 sm:px-3 hover:px-3 transition-all ">
       <FloatingPhone imgUrl={imgUrl} title={title} price={price} discountPrice={discountPrice} inStock={inStock} inEvent={inEvent} />
        <div className={`font-[400] text-white rounded-b-xl mt-3`}>
          <h5 className="text-white text-xl text-center mb-2">{title}</h5>
          <Price price={price} discountPrice={discountPrice} />
        </div>
      </div>
    </div>
  );
};

const FloatingPhone : FC<Props> = ({
  imgUrl,
  inStock,
  inEvent,
}) => {
  return (
    <div
      style={{
        transformStyle: "preserve-3d",
        transform: "rotateY(-30deg) rotateX(15deg)",
      }}
      className="rounded-[24px] bg-violet-500 pb-3 "
    >
      <motion.div
        initial={{
          transform: "translateZ(8px) translateY(-2px)",
        }}
        animate={{
          transform: "translateZ(32px) translateY(-8px)",
        }}
        transition={{
          repeat: Infinity,
          repeatType: "mirror",
          duration: 2,
          ease: "easeInOut",
        }}
        className="relative h-[430px] w-72 rounded-[24px] border-2 border-b-4 border-r-4 border-white border-l-neutral-200 border-t-neutral-200 bg-neutral-900 p-1 pl-[3px] pt-[3px]"
      >
         <div className="rounded-sm relative w-full ">
          <Image
            src={imgUrl}
            alt={"image"}
            width={400}
            height={400}
            className="cursor-pointer transition-all rounded-[24px]"
          />
          {!inStock && (
            <div className="top-2 right-1 rounded-md text-sm font-semibold absolute px-3 py-1 text-white border uppercase border-white">
              Sold Out
            </div>
          )}
          {inEvent && inStock && (
            <div className="top-2 right-1 rounded-md text-sm font-semibold absolute px-3 py-1 text-white border uppercase border-white">
              Limited-Edition
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ProductCard;
