"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import ProductCard from "./ProductCard";
import ProductCategory from "./ProductCategories";
import { useGetProductsQuery } from "@/app/redux/features/products/productApi";
import { useGetCategoriesQuery } from "@/app/redux/features/categories/categoryApi";
import {motion} from 'framer-motion'
import { fadeIn } from "../Transitions/variants";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState<any>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // FETCHING PRODUCTS DATA
  const {
    data: productData,
    isLoading: productLoading,
    isSuccess: productSuccess,
  } = useGetProductsQuery({});

  // FETCHING CATEGORIES DATA
  const {
    data: categoryData,
    isLoading: categoryLoading,
    isSuccess: categorySuccess,
  } = useGetCategoriesQuery({});

  // IF DATA FETCHED SUCCESSFULLY UPDATE THE STATES
  useEffect(() => {
    if (productSuccess) {
      setProducts(productData);
    }
    if (categorySuccess) {
      setCategories(["All", ...categoryData.categories]);
    }
  }, [productSuccess, categorySuccess, categoryData, productData]);

  // FILTERING PRODUCTS BASED ON SELECTED CATEGORY
  const handleCategoryChange = (newCategory: any) => {
    setSelectedCategory(newCategory);

    if (newCategory !== "All") {
      const filteredProducts = productData?.filter(
        (product: any) => product.category === newCategory,
      );
      setProducts(filteredProducts);
    } else {
      setProducts(productData);
    }
  };

  return (
    <section
      id="projects"
      className={`lg:mx-36 flex pt-8 1350:pt-12 lg:-mt-4 md:-mt-12 flex-col lg:items-start items-center justify-center mb-32 px-4 lg:px-0`}
    >
      <div className="w-full mt-20 mb-14 flex flex-col lg:flex-row items-center lg:items-start lg:justify-start lg:gap-8 gap-4 ">
        <div className=" text-white text-md   lg:text-2xl font-[400] ">
          <span className="flex gap-2 lg:gap-3">
            <span className="text-[#d2a4f0]">NEW</span>{" "}
            <span className="">ARRIVALS:</span>
          </span>
        </div>
        {/* DISPLAYING CATEGORIES */}
        <div>
          <>
            {categoryLoading ? (
              <span className="loader flex-center" />
            ) : (
              <div className="grid grid-cols-3 lg:-mt-2 lg:grid-cols-6 lg:gap-6 gap-2 ">
                {categories.map((category: any, index: number) => (
                  <ProductCategory
                    key={index}
                    name={category}
                    onClick={handleCategoryChange}
                    isSelected={selectedCategory === category}
                  />
                ))}
              </div>
            )}
          </>
        </div>
      </div>
      {/* DISPLAYING PRODUCTS */}
      {!productLoading && (
        <motion.ul 
        className="grid md:grid-cols-3 gap-12 -mt-4 sm:mt-0 md:gap-x-4 md:gap-y-10">
          {products.length === 0 ? (
            <div className="flex-center font-medium text-[22px] text-white">
              No Products Found...
            </div>
          ) : (
            <>
              {products.map((product: any) => (
                <motion.li 
                variants={fadeIn('right', 0.3)}
                   initial="hidden"
                   whileInView={"show"}
                   animate={{opacity: 1}}
                   viewport={{ once: false, amount: 0.5 }}
                key={product._id}>
                  <Link href={`/product/${product._id}`}>
                    <ProductCard
                      inEvent={product.inEvent}
                      imgUrl={product.images[0].url}
                      title={product.name}
                      price={product.price}
                      discountPrice={product.discountPrice}
                      inStock={product.inStock}
                    />
                  </Link>
                </motion.li>
              ))}
            </>
          )}
        </motion.ul>
      )}
    </section>
  );
};

export default Products;
