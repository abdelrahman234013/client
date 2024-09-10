const PaymentInfo = ({ data }: any) => {
  return (
    <div className="flex flex-col justify-center items-start gap-2">
      <span className="text-slate-200 font-semibold mb-3 text-[20px]">
        Payment Info
      </span>
      <span className=" font-semibold text-[15px] text-purple-300">
        Status:{" "}
        <span className="ml-1 font-semibold text-white">
          {data?.paymentMethod.status}
        </span>
      </span>
      <span className=" font-semibold text-[15px] text-purple-300">
        Method:{" "}
        <span className="ml-1 font-semibold text-white">
          {data?.paymentMethod.type}
        </span>
      </span>
    </div>
  );
};

export default PaymentInfo;
