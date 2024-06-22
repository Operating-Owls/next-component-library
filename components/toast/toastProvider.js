"use client";
import React, { createContext, useContext, useRef, useState } from "react";

const ToastContext = createContext();

/**
 * Hook to use the toast context.
 * @returns {Object} The toast context.
 */
export const useToasts = () => useContext(ToastContext);
/**
 * Wrapper component to provide toast functionality.  Should wrap the entire app.
 */
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const toastTimeouts = useRef({}); // Store timeouts here
  /**
 * Adds a new toast notification.
 * @function 
 * @name addToast
 * @memberof ToastProvider
 * @param {string} content - The content of the toast.
 * @param {Object} options - Configuration options for the toast.
 * @param {number} [options.duration=4000] - The duration the toast should remain visible (default is 4000 milliseconds).
 * @param {number} [options.transitionDuration=1000] - The duration of the toast's transition effect (default is 1000 milliseconds).
 */
  const addToast = (content, options = {}) => {
    const id = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
    if (typeof options.transitionDuration === "undefined") {
      options.transitionDuration = 1000; // default transition duration
    } else if (options.transitionDuration < 0) {
      // Ensure transition duration is not negative
      console.warn("Toast transition duration should not be negative. ");
    }
    if (typeof options.duration === "undefined") {
      options.duration = 4000; // default duration
    } else if (options.duration < 0) {
      // Ensure duration is not negative
      console.warn("Toast duration should not be negative. ");
    }
    const newToast = { id, content, ...options };
    setToasts((toasts) => [newToast, ...toasts]); // Add new toast to the beginning of the array

    // Clear any existing timeout for this toast if it exists (safety net)
    if (toastTimeouts.current[id]) {
      clearTimeout(toastTimeouts.current[id]);
    }

    // Set timeout to remove toast after duration
    toastTimeouts.current[id] = setTimeout(() => {
      removeToast(id);
      delete toastTimeouts.current[id]; // Cleanup reference
      // 4000 is the default duration if not specified
    }, options.duration + options.transitionDuration);
  };

  const removeToast = (id) => {
    setToasts((toasts) => toasts.filter((toast) => toast.id !== id));
    if (toastTimeouts.current[id]) {
      clearTimeout(toastTimeouts.current[id]);
      delete toastTimeouts.current[id]; // Ensure cleanup
    }
  };

  return (
    <ToastContext.Provider value={{ addToast, removeToast, toasts }}>
      {children}
    </ToastContext.Provider>
  );
};
