"use client";
import {
  useGetCategoriesQuery,
  useUpdateCategoriesMutation,
} from "@/app/redux/features/categories/categoryApi";
import { styles } from "@/app/styles/style";
import Heading from "@/app/utils/Heading";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";

const EditCategories = () => {
  const { data, isLoading, refetch } = useGetCategoriesQuery(
    {},
    { refetchOnMountOrArgChange: true },
  );
  const [editCategories, { isSuccess, error }] = useUpdateCategoriesMutation();
  const [categories, setCategories] = useState<any[]>([]);

  let normal: any = [];

  useEffect(() => {
    if (data) {
      setCategories(
        data.categories.map((category: string) => ({ value: category })),
      );
    }

    if (isSuccess) {
      refetch();
      toast.success("categories updated succesfully!");
    }

    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [data, error, isSuccess, refetch]);

  const handleCategoriesAdd = (id: any, value: string) => {
    setCategories((prevCategory: any) =>
      prevCategory.map((category: any, index: any) =>
        index === id ? { ...category, value } : category,
      ),
    );
  };

  const newCategoryHandle = () => {
    if (categories[categories.length - 1] === "") {
      toast.error("category title can't be empty!");
    } else {
      const updatedCategories: any = [...categories];
      updatedCategories.push("");
      setCategories(updatedCategories);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await editCategories({ categories: normal });
  };

  categories.forEach((category) => normal.push(category.value));

  return (
    <div className="text-center w-[75%] mx-auto flex flex-col items-center justify-center">
      <Heading title="Categories - limited.eg" />

      <h1 className={`${styles.title}`}>All Categories</h1>
      {categories &&
        categories.map((item: any, index: number) => {
          return (
            <div className="p-3" key={index}>
              <div className="flex items-center gap-2 w-full justify-center">
                <input
                  className={`${styles.input} !w-[unset]  !text-[20px]`}
                  value={item.value}
                  onChange={(e) => handleCategoriesAdd(index, e.target.value)}
                  placeholder="Enter category title..."
                />
                <AiOutlineDelete
                  className=" text-red-300 text-[23px] cursor-pointer"
                  onClick={() => {
                    if (index !== 0) {
                      const newArr = [...categories];
                      newArr.splice(index, 1);
                      setCategories(newArr);
                    }
                  }}
                />
              </div>
            </div>
          );
        })}
      <br />
      <br />
      <div className=" w-full flex justify-center">
        <IoMdAddCircleOutline
          className=" text-white text-[25px] cursor-pointer "
          onClick={newCategoryHandle}
        />
      </div>
      <br />
      <br />
      <div
        className=" flex items-center justify-center bg-primary rounded h-[40px] w-[300px] cursor-pointer"
        onClick={handleSubmit}
      >
        Submit
      </div>
    </div>
  );
};

export default EditCategories;
