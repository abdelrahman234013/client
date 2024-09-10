import Price from "@/app/utils/Price";
import Image from "next/image";

const OrderSummary = ({
  cartItems,
  cartTotalPrice,
  cartTotalPriceAfterDiscount,
}: any) => {
  return (
    <div className="w-full text-white mt-6">
      <h2 className="mb-3 lg:mb-4">Order Summary</h2>
      <div className="flex flex-col gap-4 my-3">
        {cartItems &&
          cartItems.map((item: any, index: number) => (
            <div className="flex items-center justify-between" key={index}>
              <div className="flex-center gap-4">
                <Image
                  src={item.images[0].url}
                  alt="PNG"
                  width={100}
                  height={100}
                />
                <div className="text-secondary">
                  <p>{item.name}</p>
                  <div>
                    {item.size}
                    <span className="text-[12px] ml-1">x{item.quantity}</span>
                  </div>
                </div>
              </div>
              <Price price={item.price} discountPrice={item.discountPrice} />
            </div>
          ))}
        <div className="flex justify-between items-center mt-3 lg:border-t-slate-200 lg:border-t-[1px] lg:pt-4">
          <div className="font-bold text-[22px]">Total</div>
          <Price
            price={cartTotalPrice}
            discountPrice={cartTotalPriceAfterDiscount}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
