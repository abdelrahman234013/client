import { styles } from "@/app/styles/style";

const OrderStatus = ({ data, open, handleChangeStatus, setOpen }: any) => {
  return (
    <div className="flex flex-col justify-center items-start gap-2">
      <span className="text-slate-200 font-semibold mb-3 text-[20px]">
        Order Status
      </span>

      {/* CONFIRMED */}
      <div className="flex mt-2 items-center cursor-pointer gap-2">
        <div
          className={`rounded-full w-4 h-4 p-[4px] border-2 border-slate-200 ${
            data?.orderStatus === "Confirmed" && "bg-white border-none"
          }`}
        />
        <div
          className={`${
            data?.orderStatus === "Confirmed" && "text-white"
          } text-slate-200 font-semibold`}
        >
          Confirmed
        </div>
      </div>

      {/* SHIPPED */}
      <div
        className="flex mt-2 items-center cursor-pointer gap-2"
        onClick={() => {
          if (data.orderStatus === "Confirmed") {
            setOpen({ status: true, msg: "Shipped" });
          }
        }}
      >
        <div
          className={`rounded-full w-4 h-4 p-[4px] border-2 border-slate-200 ${
            data?.orderStatus === "Shipped" && "bg-white border-none"
          }`}
        />
        <div
          className={`${
            data?.orderStatus === "Shipped" && "text-white"
          } text-slate-200 font-semibold`}
        >
          Shipped
        </div>
      </div>

      {/* DELIVERED */}
      <div
        className="flex mt-2 items-center cursor-pointer gap-2"
        onClick={() => {
          if (data.orderStatus === "Shipped") {
            setOpen({ status: true, msg: "Delivered" });
          }
        }}
      >
        <div
          className={`rounded-full w-4 h-4 p-[4px] border-2 border-slate-200 ${
            data?.orderStatus === "Delivered" && "bg-white border-none"
          }`}
        />
        <div
          className={`${
            data?.orderStatus === "Delivered" && "text-white"
          } text-slate-200 font-semibold`}
        >
          Delivered
        </div>
      </div>

      {/* CANCELED */}
      <div
        className="flex mt-2 items-center cursor-pointer gap-2"
        onClick={() => {
          if (
            data.orderStatus === "Confirmed" ||
            data.orderStatus === "Shipped"
          ) {
            setOpen({ status: true, msg: "Canceled" });
          }
        }}
      >
        <div
          className={`rounded-full w-4 h-4 p-[4px] border-2 border-slate-200 ${
            data?.orderStatus === "Canceled" && "bg-white border-none"
          }`}
        />
        <div
          className={`${
            data?.orderStatus === "Canceled" && "text-white"
          } text-slate-200 font-semibold`}
        >
          Canceled
        </div>
      </div>

      {/* POPUP */}
      {open.status && (
        <div className="absolute top-[90%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white rounded-[8px] shadow p-4 outline-none">
          <h1
            className={`text-[18px] font-[500] text-black  font-Poppins text-center py-2`}
          >
            User will notify about order status ({open.msg}) are you sure you
            want to update it ?
          </h1>
          <div className="flex w-full items-center justify-between mb-6 mt-4">
            <div
              className={`${styles.button} text-white !w-[120px] h-[30px] bg-red-400`}
              onClick={() => setOpen({ status: false, msg: "" })}
            >
              Cancel
            </div>
            <div
              className={`${styles.button} text-white !w-[120px] h-[30px]`}
              onClick={() => handleChangeStatus(open.msg)}
            >
              Update
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderStatus;
