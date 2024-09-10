import React, { FC } from "react";

type Props = {
  id: number;
  name: string;
  onClick: any;
  isSelected: any;
};

const AdminSideBar: FC<Props> = ({ name, onClick, isSelected, id }) => {
  return (
    <div className="flex flex-col  text-xl font-semibold py-1 ">
      <button
        className={`${
          isSelected ? "bg-[#d6a8f7]" : "hover:bg-[#cbb7da] hover:bg-opacity-70"
        }  duration-300 rounded-lg transition-all px-8 mx-auto py-3 text-sm lg:text-lg w-3/4 cursor-pointer flex items-center justify-center `}
        onClick={() => onClick(name, id)}
      >
        {name}
      </button>
    </div>
  );
};

export default AdminSideBar;
