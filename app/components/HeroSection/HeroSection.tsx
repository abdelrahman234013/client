"use client";
import Image from "next/image";
import Timer from "./Timer";
import { useGetEventQuery } from "@/app/redux/features/events/eventApi";
import { useEffect, useState } from "react";
import Link from "next/link"; 
import {motion} from 'framer-motion'
import { fadeIn } from "../Transitions/variants";



const HeroSection = () => {
  const [event, setEvent] = useState<any>(null);
  const [isEventStart, setIsEventStart] = useState(false);
  const { isLoading, isSuccess, isError, data } = useGetEventQuery<any>({});

  useEffect(() => {
    if (isSuccess) {
      setEvent(data.event);
      const start = new Date(data.event.startTime);
      const now = new Date();
      console.log(data)
      if (now > start) {
        setIsEventStart(true);
      }
    }
  }, [data, isSuccess]);

  return (
    <>
      {!isError && (
        <>
          {!isLoading && (
            <>
              {event && isEventStart && (
                <div className="flex lg:flex-row-reverse lg:w-[85%] xl:w-[74%] xl:mx-auto lg:mx-auto gap-2 lg:px-8 flex-col mb-16 xs:pt-8 mt-4 items-center justify-center lg:items-center lg:justify-betweem lg:pt-12 text-white">
                  <div className="flex flex-col lg:hidden text-[16px] justify-center items-center gap-1 uppercase mt-4">
                    <p>🔥 Limited-Edition:</p>
                    <p className="text-[13px] text-secondary">
                      Buy any item and enter a draw on this item
                    </p>
                  </div>
                  {/* small devices*/}
                  <motion.div 
                variants={fadeIn('right', 0.3)}
                initial="hidden"
                whileInView={"show"}
                animate={{opacity: 1}}
                viewport={{ once: false, amount: 0.5 }}
                  className="w-full xs:hidden  block h-[250px] lg:w-[600px] lg:h-[400px]  ">
                    <Image
                      src={event.eventProductImg.url}
                      alt={"limited edition"}
                      width={1000}
                      height={1000}
                    />
                  </motion.div>
                  <motion.div 
                  variants={fadeIn('left', 0.3)}
                  initial="hidden"
                  whileInView={"show"}
                  animate={{opacity: 1}}
                  viewport={{ once: false, amount: 0.5 }}
                  className=" lg:py-36  xs:hidden lg:gap-16 gap-5 mt-40 w-full flex flex-col lg:items-start items-center justify-center ">
                    <Timer event={event} />
                    <Link
                      href={`/product/${event.productId}`}
                      className="rounded-2xl border-2 border-dashed border-black bg-primary px-6 py-3 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_white] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none"
                    >
                      VIEW PRODUCT
                    </Link>
                  </motion.div>
                  {/* meduim devices*/}
                  <div className="justify-between px-6 xs:flex flex-col items-center lg:hidden hidden">
                    <motion.div
                    variants={fadeIn('right', 0.3)}
                    initial="hidden"
                    whileInView={"show"}
                    animate={{opacity: 1}}
                    viewport={{ once: false, amount: 0.5 }}
                    >
                    <Image
                      src={event.eventProductImg.url}
                      alt={"limited edition"}
                      width={280}
                      height={280}
                    />
                    </motion.div>
                    <motion.div 
                    variants={fadeIn('left', 0.3)}
                    initial="hidden"
                    whileInView={"show"}
                    animate={{opacity: 1}}
                    viewport={{ once: false, amount: 0.5 }}
                    className=" lg:py-36 lg:gap-16 gap-5 w-full flex flex-col lg:items-start items-center justify-center">
                      <Timer event={event} />
                      <Link
                        href={`/product/${event.productId}`}
                       className="rounded-2xl border-2 border-dashed border-black bg-primary px-14 py-3 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_white] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none"
                      >
                        VIEW PRODUCT
                      </Link>
                    </motion.div>
                  </div>
                  {/* large devices*/}
                  <motion.div 
                   variants={fadeIn('left', 0.3)}
                   initial="hidden"
                   whileInView={"show"}
                   animate={{opacity: 1}}
                   viewport={{ once: false, amount: 0.5 }}
                  className="hidden flex-1 lg:flex flex-col -mt-12 gap-10 justify-center items-center">
                    <div className="hidden flex-col lg:flex text-[24px] justify-center items-center gap-1 uppercase mt-4">
                      <p className="font-bold">🔥 Limited-Edition:</p>
                      <p className="text-[16px] text-secondary text-center whitespace-nowrap">
                        Buy any item and enter a draw on this item.
                      </p>
                    </div>
                    <div className="lg:flex gap-5 w-full hidden flex-col items-center justify-center ">
                      <Timer event={event} />
                      <Link
                        href={`/product/${event.productId}`}
                       className="rounded-2xl border-2 border-dashed border-black bg-primary px-24 py-3 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_white] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none"
                      >
                        VIEW PRODUCT
                      </Link>
                    </div>
                  </motion.div>
                  <motion.div 
                  variants={fadeIn('right', 0.3)}
                  initial="hidden"
                  whileInView={"show"}
                  animate={{opacity: 1}}
                  viewport={{ once: false, amount: 0.5 }}
                  className=" hidden  lg:block h-[430px] flex-1 ">
                    <Image
                      src={event.eventProductImg.url}
                      alt={"limited edition"}
                      width={500}
                      height={500}
                    />
                  </motion.div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default HeroSection;
