import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-black bg-opacity-50 flex flex-col items-center justify-center pt-16 pb-6  gap-12 text-white">
      <span className="text-primary text-lg lg:text-4xl font-semibold ">
        Follow Us{" "}
      </span>
      <div className="flex flex-row items-center justify-center gap-8">
        
        <a href="https://www.instagram.com/fivetyone_eg/">
      <FaInstagram  size={40}/>
        </a>
        
      </div>
      <span className="text-sm flex-center text-center gap-3 font-medium">
        <span className="text-primary ">Developers</span>
        <span className="flex-center gap-2 text-white">
          <a href={`https://www.instagram.com/ahmed___gamaal/"}`} className="">
            Ahmed
          </a>
          <span>,</span>
          <a href={`https://www.instagram.com/3b1.r/"}`} className="">
            Abdelrahman
          </a>
        </span>
      </span>
      <span className="text-xs  text-secondary">
        All copyrights reserved{" "}
        <span className="text-primary">@{new Date().getFullYear()}</span>
      </span>
    </div>
  );
};

export default Footer;
