import React, { FC } from "react";

type Props = {
  name: string;
  onClick: any;
  isSelected: boolean;
};

const ProductCategory: FC<Props> = ({ name, onClick, isSelected }) => {
  const buttonStyle = isSelected
    ? " text-[#ebdcf5] border-[#A760DB] "
    : "text-[#ffffff] border-white";
  return (
    <>
      <button
        className="px-6 py-2 font-medium bg-primary text-white w-full transition-all shadow-[3px_3px_0px_white] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
        onClick={() => onClick(name)}
      >
        {name}
      </button>
    </>
  );
};

export default ProductCategory;
