import Footer from "@/app/components/Footer/Footer";
import Header from "@/app/components/Header/Header";
import CartSection from "../../components/Cart/CartSection";
import CurrentPage from "@/app/components/Cart/CurrentPage";
import Heading from "@/app/utils/Heading";

const page = () => {
  return (
    <div className="bg-black bg-opacity-50 min-h-screen flex flex-col overflow-x-hidden">
      <Heading title="Cart - limited.eg" />
      <Header />
      <div className="mt-[65px] flex-1">
        <CurrentPage currentPage={"cart"} />
        <CartSection />
      </div>
      <Footer />
    </div>
  );
};

export default page;
