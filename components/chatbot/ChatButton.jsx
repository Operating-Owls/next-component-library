import React from "react";
/**
 * The ChatBot button is used to open the ChatBot window.
 * @param {string} side - The side of the screen the ChatBot button will appear on.
 * @param {string} className - Optional class name for the ChatBot button, will override default styling and side.
 * @param {ReactNode} children - The text or components to display inside the ChatBot button.
 */
export default function ChatButton( {side = "right", className = "", children}) {
    if (className === "") {
        className=`fixed bottom-0 ${side}-0 m-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`
    }
    return (
        <label htmlFor="my-drawer" className={className}>
            {children}
        </label>
    )
}