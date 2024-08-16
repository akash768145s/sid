'use client';
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Footer from "./footer";
import Navbar from "./navbar";
import { MdEmail } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";

const Profile = () => {
  const { data: session } = useSession();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 1000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isReady ? (
        <>
          <Navbar />
          <LazyMotion features={domAnimation}>
            <AnimatePresence>
              <m.div
                className="flex justify-between items-start w-full h-[400px] mt-[120px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="w-[30%] flex flex-col items-start p-4">
                  <m.div
                    className="flex items-center mb-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    {session?.user?.image ? (
                      <img
                        src={session.user.image}
                        alt="Profile Picture"
                        className="w-24 h-24 rounded-full mr-4"
                      />
                    ) : (
                      <FaUserCircle className="text-gray-400 text-[80px] mr-4" />
                    )}
                    <div className="flex flex-col">
                      <div className="text-[18px] font-semibold text-black">
                        {session?.user?.name || "John Doe"}
                      </div>
                      <div className="text-gray-500">
                        Digital ID: {session?.user?.digitalId || "123456789"}
                      </div>
                    </div>
                  </m.div>
                </div>
                <div className="w-[65%] flex justify-end items-start">
                  <m.div
                    className="w-[25%] relative rounded-[36px] bg-gradient-to-b from-white to-[#a0c7fc] h-[150px] mt-[auto] mb-[50px] translate-x-[-80px] translate-y-[20px] flex items-center p-4"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1 }}
                  >
                    <div className="flex flex-col items-start">
                      <div className="text-[16.85px] font-medium font-poppins text-black text-left">
                        Gmail ID
                      </div>
                      <div className="flex items-center mt-4">
                        <MdEmail className="text-black text-[20px] mr-2" />
                        <span className="text-gray-500">
                          {session?.user?.email || "placeholder@example.com"}
                        </span>
                      </div>
                    </div>
                  </m.div>
                </div>
              </m.div>
            </AnimatePresence>
          </LazyMotion>
          <Footer />
        </>
      ) : (
        <div className="w-full h-screen bg-white"></div>
      )}
    </>
  );
};

export default Profile;
