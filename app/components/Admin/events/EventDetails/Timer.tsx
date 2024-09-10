"use client";
// import { useStopEventMutation } from "@/app/redux/features/events/eventApi";
import { useEffect, useState } from "react";

const Timer = ({ event }: any) => {
  const [endTimer, setEndTimer] = useState(false);
  const [times, setTimes] = useState<any>([]);
  //   const [stopEvent] = useStopEventMutation();

  const padWithZero = (num: any) => {
    return num < 10 ? `0${num}` : num;
  };

  useEffect(() => {
    const target = new Date(event.endTime);

    if (!endTimer) {
      const interval = setInterval(() => {
        const now = new Date();

        const difference = target.getTime() - now.getTime();
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));

        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );

        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60),
        );

        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        if (days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) {
          clearInterval(interval);

          //   stopEvent(event._id);

          setTimes([
            padWithZero(0),
            padWithZero(0),
            padWithZero(0),
            padWithZero(0),
          ]);

          setEndTimer(true);
        } else {
          setTimes([
            padWithZero(days),
            padWithZero(hours),
            padWithZero(minutes),
            padWithZero(seconds),
          ]);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, []);

  return (
    <div className="text-md font-semibold text-white bg-primary xs:w-[80%] lg:w-[30%] lg:py-[6px] lg:text-lg bg-opacity-50 rounded  px-10 py-1 w-[30%] flex-center gap-2">
      {times.length > 0 ? (
        <>
          {times.map((time: any, index: number) => (
            <div key={index} className="flex-center gap-1">
              <span>{time}</span>
              {index !== times.length - 1 && <span>:</span>}
            </div>
          ))}
        </>
      ) : (
        <span className="loader-small flex-center" />
      )}
    </div>
  );
};

export default Timer;
