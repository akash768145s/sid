"use client";
import { IoLocationSharp } from "react-icons/io5";
const Footer = () => {
  return (
    <>
      <div className="flex-1 bg-gradient-to-r from-[#004aad] via-[#006dff] to-[#2080ff] flex flex-col items-start justify-start p-9 pb-[89px] max-w-full text-[40px] text-white gap-[37px] mq800:gap-[18px] mq1150:pt-5 mq1150:pb-[38px] mq1350:pt-[23px] mq1350:pb-[58px] mq1350:pr-[29px] mq1350:pl-[30px] mq450:pb-[25px]">
        <div className="w-full flex flex-col items-start justify-start gap-[73px] text-5xl text-black mq800:gap-[18px] mq1350:gap-[36px]">
          <div className="w-full rounded-xl bg-white flex flex-col items-end justify-start p-9 pb-4 pr-14 gap-[73.7px] z-[1] mq800:gap-[18px] mq800:pt-[23px] mq800:pb-5 mq1350:gap-[37px] mq1350:pr-7">
            <div className="w-[1178px] h-[540px] hidden rounded-xl bg-white max-w-full" />
            <div className="w-full flex flex-col items-start justify-start gap-[32px] mq800:gap-[16px]">
              <div className="w-[154.2px] relative leading-[36px] inline-block transform rotate-0.1 whitespace-nowrap z-[2] mq450:text-[19px] mq450:leading-[29px]">
                Get Started
              </div>
              <h1 className="w-full relative text-71xl leading-[100px] font-bold z-[2] mq800:text-[45px] mq800:leading-[60px] mq450:text-[27px] mq450:leading-[40px]">
                Get in touch with us. We're here to assist you.
              </h1>
            </div>
            <div className="w-full flex flex-col items-start justify-start gap-[25px] text-3xl">
              <div className="relative font-semibold z-[2] mq450:text-lg">
                Email Address
              </div>
              <div className="w-full flex flex-col items-start justify-start gap-[1px]">
                <div className="w-[27px] h-[3px] relative bg-black z-[2]" />
                <div className="w-full flex flex-wrap items-start justify-between gap-[20px]">
                  <div className="flex flex-col items-start justify-start pt-[26px]">
                    <div className="relative font-semibold z-[2] mq450:text-lg">
                      sellitdude@gmail.com
                    </div>
                  </div>
                  <div className="w-[194.9px] flex flex-row items-start justify-end gap-[20px] ml-auto">
                    <IoLocationSharp className="w-[42px] h-[42px] text-black -mr-6" />
                    <h1 className="mt-2">Chennai, IN</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
