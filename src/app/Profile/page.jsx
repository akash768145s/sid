'use client';
import React from "react";
import { useSession } from "next-auth/react";
import Footer from "./footer";
import Navbar from "./navbar";
import { MdEmail } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";

const Profile = () => {
  const { data: session } = useSession();

  return (
    <>
      <Navbar />
      <div className="flex justify-between items-start w-full h-[400px] mt-[120px]">
        <div className="w-[30%] flex flex-col items-start p-4">
          <div className="flex items-center mb-4">
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
          </div>
        </div>
        <div className="w-[65%] flex justify-end items-start">
          <div className="w-[25%] relative rounded-[36px] bg-gradient-to-b from-white to-[#a0c7fc] h-[150px] mt-[auto] mb-[50px] translate-x-[-80px] translate-y-[20px] flex items-center p-4">
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
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Profile;
