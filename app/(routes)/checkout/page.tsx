import Footer from "@/app/components/Footer/Footer";
import Header from "@/app/components/Header/Header";
import CurrentPage from "@/app/components/Cart/CurrentPage";
import Checkout from "@/app/components/Checkout/Checkout";
import Heading from "@/app/utils/Heading";

const page = () => {
  return (
    <div className="bg-black bg-opacity-50 min-h-screen flex flex-col">
      <Heading title="Checkout - limited.eg" />
      <Header />
      <div className="mt-[65px] flex-1">
        <CurrentPage currentPage={"checkout"} />
        <Checkout />
      </div>
      <Footer />
    </div>
  );
};

export default page;
