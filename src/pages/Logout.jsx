import React from 'react';
import { auth, signOutUser } from '../config/firebase/firebasemethods';

const Logout = () => {

  const userLogout = () => {
    signOutUser(auth)
      .then((message) => {
        console.log(message);
        console.log('Successfully logged out');
      })
      .catch((error) => {
        console.error("Sign out failed: ", error);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="my-6 p-6 border-4 border-gray-300 rounded-lg shadow-lg">
        <h1 className="text-5xl font-bold text-gray-800 dark:text-white text-center">
          Logout
        </h1>
        <p className="mt-4  text-red-600 text-center">
          Are you sure you want to logout?
        </p>
      </div>
      <button 
        onClick={userLogout} 
        type="button" 
        className="w-full max-w-md py-3 bg-[#fd9800] text-white rounded-lg shadow-md hover:bg-[#eba64c] transition duration-200"
      >
        Logout
      </button>
    </div>
  );
}

export default Logout;
