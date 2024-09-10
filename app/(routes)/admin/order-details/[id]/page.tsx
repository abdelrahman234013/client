import React from "react";
import AdminProtected from "@/app/hooks/AdminProtected";
import SingleOrderDetails from "@/app/components/Admin/Orders/SingleOrder/SingleOrderDetails";

type Props = {};

const page = ({ params }: any) => {
  return (
    <div className="flex flex-col bg-black bg-opacity-50 h-full ">
      <AdminProtected>
        <SingleOrderDetails id={params.id} />
      </AdminProtected>
    </div>
  );
};

export default page;
