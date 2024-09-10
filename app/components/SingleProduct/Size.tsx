import React, { FC } from "react";

type Props = {
  name: string;
  onClick: any;
  isSelected: boolean;
  inStock: boolean;
};

const Size: FC<Props> = ({ name, onClick, inStock, isSelected }) => {
  const buttonStyle = isSelected
    ? " text-[#ebdcf5] bg-[#A760DB] border-2 border-[#9817f4] transition duration-300"
    : "text-[#ffffff] border-white border-2";
  return (
    <button
      onClick={() => {
        if (inStock) {
          onClick(name);
        }
      }}
      className="flex flex-row w-full relative  justify-start items-center gap-3"
    >
      <span
        className={`${buttonStyle} lg:w-14 lg:h-14 w-10 h-10 flex justify-center items-center text-white text-sm lg:text-2xl font-semibold`}
      >
        {name}
      </span>
      {!inStock && (
        <div className="absolute w-[2px] h-full rotate-45 bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
      )}
    </button>
  );
};

export default Size;
