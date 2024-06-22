'use client';
import React from 'react';
import { useToasts, Toast } from '@/components/toast';
// use tailwind css for styling

const Page = () => {
  const { addToast } = useToasts();
  return (
    <div className="demo"> 
        <h1>Toast Demo</h1>
        <a href="/">Back to home</a>
        <br/>
        <button onClick={() => addToast("Success!", {style: "success", duration: 3000})}>Click to add a toast</button>
        <Toast/>
    </div>
  );
};

export default Page;
