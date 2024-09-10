import Footer from "@/app/components/Footer/Footer";
import Header from "@/app/components/Header/Header";
import SingleProduct from "../../../components/SingleProduct/SingleProduct";

const page = ({ params }: any) => {
  return (
    <div className="bg-black bg-opacity-50 w-full min-h-screen flex flex-col">
      <Header />
      <div className="mt-[65px] flex-1">
        <SingleProduct id={params.id} />
      </div>
      <Footer />
    </div>
  );
};

export default page;
