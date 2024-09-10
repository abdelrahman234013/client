import UpdateProduct from "@/app/components/Admin/products/UpdateProduct/UpdateProduct";
import AdminProtected from "@/app/hooks/AdminProtected";

const page = ({ params }: any) => {
  return (
    <div className="flex flex-col bg-black bg-opacity-50">
      <AdminProtected>
        <div className="w-full h-full py-8">
          <UpdateProduct productId={params.id} />
        </div>
      </AdminProtected>
    </div>
  );
};

export default page;
