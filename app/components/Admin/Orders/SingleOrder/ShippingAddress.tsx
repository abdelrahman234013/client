type Props = {};

const ShippingAddress = ({ data }: any) => {
  return (
    <div className="flex flex-col justify-center items-start gap-2">
      <span className="text-slate-200 font-semibold mb-3 text-[20px]">
        Shipping Address
      </span>
      <span className=" font-semibold text-[15px] text-purple-300">
        City:{" "}
        <span className="ml-1 font-semibold text-white">
          {data?.shippingAddress.city}
        </span>
      </span>
      <span className="font-semibold text-[15px] text-purple-300">
        Street Address:{" "}
        <span className="ml-1 font-semibold text-white">
          {data?.shippingAddress.address}
        </span>
      </span>
      <span className=" font-semibold text-[15px] text-purple-300">
        Postal Code:{" "}
        <span className=" ml-1 placeholder:font-semibold text-white">
          {data?.shippingAddress.zip}
        </span>
      </span>
      <span className=" font-semibold text-[15px] text-purple-300">
        Name:{" "}
        <span className="ml-1 font-semibold text-white">
          {data?.userInfo.firstName}
        </span>
      </span>
      <span className=" font-semibold text-[15px] text-purple-300">
        Phone number:{" "}
        <span className="ml-1 font-semibold text-white">
          {data?.userInfo.phone}
        </span>
      </span>
    </div>
  );
};

export default ShippingAddress;
