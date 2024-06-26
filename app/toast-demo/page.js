'use client';
import React from 'react';
import { useToasts, Toast } from '@/components/toast';
// use tailwind css for styling

const Page = () => {
  const { addToast } = useToasts();
  return (
  <div className="flex justify-center items-center min-h-screen"> 
    <div className="p-4"> 
      <h1 className="text-2xl font-bold mb-4">Toast Demo</h1>
      <a href="/" className="text-blue-500 hover:underline mb-4 block">Back to home</a>
      <br/>
      <button 
        onClick={() => addToast("Success!", {style: "success", duration: 3000})} 
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Click to add a toast
      </button>
      <Toast/>
    </div>
  </div>
);
};

export default Page;
