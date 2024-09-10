import Footer from "@/app/components/Footer/Footer";
import Header from "@/app/components/Header/Header";
import CurrentPage from "@/app/components/Cart/CurrentPage";
import OrderComplete from "@/app/components/OrderComplete/OrderComplete";
import Heading from "@/app/utils/Heading";

const page = () => {
  return (
    <div className="bg-black bg-opacity-50 min-h-screen flex flex-col">
      <Heading title="OrderComplete - limited.eg" />
      <Header />
      <div className="mt-[65px] min-h-[400px] flex-1">
        <CurrentPage currentPage={"orderComplete"} />
        <OrderComplete />
      </div>
      <Footer />
    </div>
  );
};

export default page;
