import Heading from "../utils/Heading";
import Header from "../components/Header/Header";
import HeroSection from "../components/HeroSection/HeroSection";
import Products from "../components/ProductsSection/ProductsSection";
import Footer from "../components/Footer/Footer";

const page = () => {
  return (
    <main className="flex flex-col items-center justify-between bg-black bg-opacity-50 min-h-[100vh] h-full">
      <Heading
        title= "FiftyOne - FiftyOne.eg"
        keywords="limited store over-size ecommerce pants clothes local-brand"
      />
      <div className="relative w-full">
        <Header />
        <div className="mt-[65px] flex-1">
          <HeroSection />
          <Products />
          <Footer />
        </div>
      </div>
    </main>
  );
};

export default page;
