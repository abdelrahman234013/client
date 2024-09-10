"use client";
import React, { useEffect, useState } from "react";
import AddSize from "../CreateProduct/AddSize";
import AddImage from "../CreateProduct/AddImage";
import { useGetCategoriesQuery } from "@/app/redux/features/categories/categoryApi";
import {
  useGetSingleProductQuery,
  useUpdateProductMutation,
} from "@/app/redux/features/products/productApi";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import { customerInputsStyles, customerLabelsStyles } from "@/app/utils/styles";
import Heading from "@/app/utils/Heading";

const UpdateProduct = ({ productId }: any) => {
  const { categoriesData } = useGetCategoriesQuery<any>({});
  const {
    data: ProductData,
    isLoading: getProductLoading,
    isSuccess: getProductSuccess,
    error: getProductError,
  } = useGetSingleProductQuery(productId);
  const [
    updateProduct,
    { isLoading: updateLoading, isSuccess: updateProductSuccess, error },
  ] = useUpdateProductMutation();
  const [categories, setCategories] = useState<any[]>([]);
  const [productInfo, setProductInfo] = useState([
    {
      size: "",
      quantity: 0,
    },
  ]);
  const [images, setImages] = useState([]);
  const [productObject, setProductObject] = useState({
    name: "",
    description: "",
    price: 0,
    discountPrice: 0,
    category: "",
    info: productInfo,
  });

  useEffect(() => {
    if (categoriesData) {
      setCategories(
        categoriesData.categories.map((category: string) => ({
          value: category,
        })),
      );
    }
    if (getProductSuccess) {
      setProductInfo(ProductData.info);
      setProductObject({
        name: ProductData.name,
        description: ProductData.description,
        price: ProductData.price,
        discountPrice: ProductData.discountPrice,
        category: ProductData.category,
        info: ProductData.info,
      });
      setImages(ProductData.images);
    }
    if (updateProductSuccess) {
      toast.success("Product Updated Successfully!");
      redirect("/admin");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [categoriesData, error, updateProductSuccess, getProductSuccess]);

  const handleProductCreate = async (e: any) => {
    e.preventDefault();
    const data = { ...productObject, images };
    if (
      data.images.length <= 0 ||
      !data.name ||
      !data.price ||
      data.info.length <= 0
    ) {
      toast.error("Please fill all the fields");
    } else {
      if (!updateLoading) {
        console.log(data)
        await updateProduct({ data, id: productId });
      }
    }
  };

  return (
    <div
      className={`flex flex-col ${
        getProductLoading && "items-center"
      }  w-[80%] mx-auto mt-8 gap-8`}
    >
      <Heading
        title={
          ProductData
            ? `Update ${ProductData.name} - limited.eg`
            : `Update Product - limited.eg`
        }
      />
      {!getProductLoading ? (
        <>
          {/* PRODUCT NAME */}
          <div className="w-full">
            <label htmlFor="name" className={`${customerLabelsStyles}`}>
              Product Name
            </label>
            <input
              type="name"
              name=""
              required
              value={productObject.name}
              onChange={(e: any) =>
                setProductObject({ ...productObject, name: e.target.value })
              }
              id="name"
              placeholder={"Enter the product name"}
              className={customerInputsStyles}
            />
          </div>

          {/* PRODUCT DESCRIPTION */}
          <div>
            <label htmlFor="description" className={customerLabelsStyles}>
              Product description{" "}
              <span className="text-[11px] text-secondary">(optional)</span>
            </label>
            <textarea
              name=""
              cols={30}
              rows={8}
              value={productObject.description}
              onChange={(e: any) =>
                setProductObject({
                  ...productObject,
                  description: e.target.value,
                })
              }
              id="description"
              placeholder={"Enter the product description"}
              className={customerInputsStyles}
            ></textarea>
          </div>

          {/* PRODUCT PRICE & DISCOUNT */}
          <div className="flex items-center justify-between">
            <div className="w-[50%]">
              <label htmlFor="Product price" className={customerLabelsStyles}>
                Product Price
              </label>
              <input
                type="number"
                name=""
                id="price"
                required
                value={productObject.price}
                onChange={(e: any) =>
                  setProductObject({ ...productObject, price: e.target.value })
                }
                placeholder="Enter the price"
                className={customerInputsStyles}
              />
            </div>
            <div className="w-[45%]">
              <label
                htmlFor="Product Discount Price"
                className={customerLabelsStyles}
              >
                Discount Price{" "}
                <span className="text-[11px] text-secondary">(optional)</span>
              </label>
              <input
                type="number"
                name=""
                id="DiscountPrice"
                value={productObject.discountPrice}
                onChange={(e: any) =>
                  setProductObject({
                    ...productObject,
                    discountPrice: e.target.value,
                  })
                }
                placeholder="Enter the Discount price"
                className={customerInputsStyles}
              />
            </div>
          </div>

          {/* PRODUCT CATEGORIES */}
          <div className="">
            <label className={customerLabelsStyles}>Product Categories</label>
            <select
              name=""
              id=""
              className={`${customerInputsStyles}`}
              value={productObject.category}
              onChange={(e: any) =>
                setProductObject({ ...productObject, category: e.target.value })
              }
            >
              <option value="" className="text-black">
                Select product category
              </option>
              {categories.map((item: any) => (
                <option
                  value={item.value}
                  key={item.value}
                  className="text-black"
                >
                  {item.value}
                </option>
              ))}
            </select>
          </div>

          {/* PRODUCT INFO */}
          <div>
            <label className={customerLabelsStyles}>Product Info</label>
            <AddSize
              productInfo={productInfo}
              setProductInfo={setProductInfo}
            />
          </div>

          {/* PRODUCT IMAGES */}
          <div className="w-full">
            <label className={customerLabelsStyles}>Product Images</label>
            <AddImage images={images} setImages={setImages} />
          </div>

          <div
            className={`${
              !updateLoading
                ? "hover:bg-indigo-400 cursor-pointer"
                : "cursor-not-allowed"
            } flex items-center justify-center bg-indigo-500 rounded h-[40px] w-[300px] text-white  font-medium whitespace-nowrap`}
            onClick={handleProductCreate}
          >
            {updateLoading ? <span className="loader-small" /> : "Submit"}
          </div>
          {updateLoading && (
            <span className="-mt-4 font-medium text-secondary">
              <span>It will take a couple of seconds</span>
            </span>
          )}
        </>
      ) : (
        <span className="w-full loader flex-center" />
      )}
      {getProductError && (
        <div className="text-white">Product is not found...</div>
      )}
    </div>
  );
};

export default UpdateProduct;
