import { GiShoppingBag } from "react-icons/gi";
import Link from "next/link";

const Cart = ({ cartTotalQty }: any) => {
  return (
    <li className=" block py-2 mr-1 text-secondary sm:text-xl rounded md:p-0 hover:text-primary">
      <Link href={"/cart"} className="flex-center gap-2 relative">
        <GiShoppingBag size={23} />
        <span className="rounded-full absolute bg-primary text-white p-[3px] font-bold text-[9px] w-4 h-4 flex-center -top-2 -right-2">
          <span>{cartTotalQty}</span>
        </span>
      </Link>
    </li>
  );
};

export default Cart;
