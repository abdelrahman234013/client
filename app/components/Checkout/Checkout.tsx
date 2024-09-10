import CustomerInfo from "../Checkout/CustomerInfo";

const Checkout = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-start items-center justify-center gap-5 lg:gap-14 my-10 lg:mb-36 lg:mt-12">
      <CustomerInfo />
    </div>
  );
};

export default Checkout;
