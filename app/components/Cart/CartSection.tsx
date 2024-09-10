import CartProducts from "./CartProducts";
import CartPrice from "./CartPrice";

const CartSection = () => {
  return (
    <div
      className={`flex flex-col justify-center items-center gap-10 lg:gap-20 py-10 lg:px-12 sticky top-0`}
    >
      <div className="flex flex-col lg:w-[90%] lg:items-center lg:justify-start lg:mx-auto lg:gap-10">
        <CartProducts />
        <CartPrice />
      </div>
    </div>
  );
};

export default CartSection;
