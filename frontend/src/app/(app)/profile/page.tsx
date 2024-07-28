"use client";

import React from "react";
import { Button } from "@/components/ui/button";

const ProfilePage = () => {

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-6">Profile</h1>
        <div className="mb-4">
          <h2 className="text-lg font-medium">User Details</h2>
          <div className="mt-2">
            {/* <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p> */}
            <p><strong>Name:</strong> Dharam</p>
            <p><strong>Email:</strong> dharamdotin@gmail.com</p>
          </div>
        </div>
        <Button className="w-full">Logout</Button>
      </div>
    </div>
  );
};

export default ProfilePage;
