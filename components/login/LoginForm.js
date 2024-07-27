'use client';
import React, { useState } from 'react';
import CryptoJS from 'crypto-js';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Encrypt password before sending
      const encryptedPassword = encryptPassword(password);

      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password: encryptedPassword }),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Login successful');
        setSuccessMessage(responseData.message); // Set success message
        setError(''); // Clear any previous error message
        // Redirect or perform actions after successful login
      } else {
        const errorData = await response.json();
        console.error('Login failed:', errorData.message);
        setError(errorData.message);
        setSuccessMessage(''); // Clear success message
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An unexpected error occurred. Please try again.');
      setSuccessMessage(''); // Clear success message
    }

    // Clear password after logging in
    setPassword('');
  };

  const handleRegister = async () => {
    try {
      const response = await fetch('/api/login', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const responseData = await response.json();
        setSuccessMessage(responseData.message); // Set success message
        setError(''); // Clear any previous error message
      } else {
        const errorData = await response.json();
        setError(errorData.message);
        setSuccessMessage(''); // Clear success message
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An unexpected error occurred. Please try again.');
      setSuccessMessage(''); // Clear success message
    }

    // Clear password after registration attempt
    setPassword('');
  };

  // Function to encrypt password
  const encryptPassword = (password) => {
    return CryptoJS.AES.encrypt(password, 'secret_key').toString();
  };

  return (
    <div className="max-w-sm mx-auto mt-12 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
        >
          Login
        </button>
      </form>
      <div className="mt-4">
        <button
          onClick={handleRegister}
          className="w-full bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default LoginForm;