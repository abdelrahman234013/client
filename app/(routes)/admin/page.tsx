"use client";
import React, { useState } from "react";
import AdminSideBar from "../../components/Admin/AdminSidebar/AdminSideBar";
import { data } from "../../components/Admin/AdminSidebar/sidebarData";
import CreateProduct from "../../components/Admin/products/CreateProduct/CreateProduct";
import AllUsers from "../../components/Admin/AllUsers/AllUsers";
import AdminProtected from "../../hooks/AdminProtected";
import AdminManager from "../../components/Admin/AdminManager/AdminManager";
import Link from "next/link";
import { useLogOutMutation } from "@/app/redux/features/auth/authApi";
import AllOrders from "../../components/Admin/Orders/Allorders";
import EditCategories from "../../components/Admin/Categories/EditCategories";
import AllProducts from "../../components/Admin/products/AllProducts";
import AllEvents from "../../components/Admin/events/AllEvents";

const page = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isSelected, setIsSelected] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [Logout, {}] = useLogOutMutation();

  const buttonStyle = isSelected
    ? " text-[#ebdcf5] text-[#b160e7]"
    : "text-[#ffffff] ";
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [item, setItem] = useState("CREATE PRODUCT");
  // eslint-disable-next-line react-hooks/rules-of-hooks

  const handleSidebarChange = (newitem: any) => {
    setItem(newitem);
  };

  return (
    <div className="flex flex-col bg-black bg-opacity-50">
      <AdminProtected>
        <div className="text-white grid grid-cols-12 w-full h-full py-8">
          <div className="col-span-3 w-full h-full">
            {data.map((items, index) => (
              <AdminSideBar
                key={index}
                name={items.name}
                onClick={handleSidebarChange}
                isSelected={item == items.name}
                id={items.id}
              />
            ))}
            <Link href={"/"}>
              <div
                className={`flex justify-center items-center font-semibold px-8 mx-auto py-3 text-sm lg:text-lg w-3/4 cursor-pointer  `}
              >
                TO SITE
              </div>
            </Link>
          </div>
          <div className="col-span-9 flex flex-col">
            {item == "CREATE PRODUCT" && <CreateProduct setItem={setItem} />}
            {item == "USERS" && <AllUsers />}
            {item == "ADMINS" && <AdminManager />}
            {item == "ORDERS" && <AllOrders />}
            {item == "CATEGORIES" && <EditCategories />}
            {item == "PRODUCTS" && <AllProducts />}
            {item == "EVENTS" && <AllEvents />}
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default page;
