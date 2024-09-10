import EventDetails from "@/app/components/Admin/events/EventDetails/EventDetails";
import AdminProtected from "@/app/hooks/AdminProtected";

const page = ({ params }: any) => {
  return (
    <div className="flex flex-col min-h-[100vh] bg-black bg-opacity-50">
      <AdminProtected>
        <div className="w-full h-full py-12">
          <EventDetails EventId={params.id} />
        </div>
      </AdminProtected>
    </div>
  );
};

export default page;
