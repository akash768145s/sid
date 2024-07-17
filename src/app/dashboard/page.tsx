import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/logout"; 
import UploadButton from "@/components/uploadButton";


const Dashboard = async () => {
  const session = await getServerSession();
  if (!session) {
    redirect("/");
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>Dashboard</div>
      <UploadButton/>
      <div>
        {session.user?.email}
        <LogoutButton /> {/* Render the logout button here */}
      </div>
    </div>
  );
};

export default Dashboard;
