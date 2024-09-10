import { PriceFormatter } from "./PriceFormatter";

const Price = ({ price, discountPrice, inCartPrice }: any) => {
  if (price === discountPrice) {
    discountPrice = 0;
  }
  return (
    <>
      {discountPrice > 0 ? (
        <div
          className={`${
            inCartPrice && "text-sm flex flex-col"
          } text-slate-300 text-sm  lg:text-xl text-center flex-center  gap-2`}
        >
          <span className="line-through text-slate-400">
            {PriceFormatter(price)}
          </span>
          <span> {PriceFormatter(discountPrice)}</span>
        </div>
      ) : (
        <p className="text-slate-300 text-md lg:text-xl text-center">
          {PriceFormatter(price)}
        </p>
      )}
    </>
  );
};

export default Price;
