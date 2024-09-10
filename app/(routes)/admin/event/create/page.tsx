import CreateEvent from "@/app/components/Admin/events/CreateEvent";
import AdminProtected from "@/app/hooks/AdminProtected";

const page = () => {
  return (
    <div className="flex flex-col min-h-[100vh] bg-black bg-opacity-50">
      <AdminProtected>
        <div className="w-full h-full py-4">
          <CreateEvent />
        </div>
      </AdminProtected>
    </div>
  );
};

export default page;
