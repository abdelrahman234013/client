import Header from "@/app/components/Header/Header";
import Login from "@/app/components/Login/Login";
import IsUserLogged from "@/app/hooks/IsUserLogged";

const page = () => {
  return (
    <IsUserLogged>
      <div className="bg-black bg-opacity-50 w-full min-h-screen flex flex-col">
        <Header />
        <div className="mt-[65px] flex-1">
          <Login />
        </div>
      </div>
    </IsUserLogged>
  );
};

export default page;
