import Link from "next/link";

const OrderComplete = () => {
  return (
    <div
      className={` text-white font-medium mt-8 w-full sm:px-0 px-6 flex flex-col items-center`}
    >
      <h2 className="sm:text-[20px] text-[16px] text-center">
        Thank you for placing an order with Limited.eg
      </h2>
      <h4 className="text-secondary sm:mt-2 mt-3 text-[14px] sm:text-[18px] sm:ml-0 ml-6">
        You will recieve a confirmation email with your order details shortly.
      </h4>
      <Link
        href={"/"}
        className="border-white border-2 sn:mt-10 mt-14 sm:text-[18px] text-[15px] rounded-md hover:bg-primary hover:border-primary hover:text-black px-4 py-3 "
      >
        BACK TO SHOP
      </Link>
    </div>
  );
};

export default OrderComplete;
