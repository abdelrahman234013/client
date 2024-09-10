import EditEvent from "@/app/components/Admin/events/EditEvent";
import AdminProtected from "@/app/hooks/AdminProtected";

const page = ({ params }: any) => {
  return (
    <div className="flex flex-col bg-black bg-opacity-50">
      <AdminProtected>
        <div className="w-full h-full py-8">
          <EditEvent EventId={params.id} />
        </div>
      </AdminProtected>
    </div>
  );
};

export default page;
