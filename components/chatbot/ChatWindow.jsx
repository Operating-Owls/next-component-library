import React from "react";
import Chat from "./Chat";
import ChatNavbar from "./ChatNavbar";

/**
 * The ChatWindow displays the user's communication with the ChatBot.
 * @param {string} side - The side of the screen the ChatWindow will appear on when opened.
 */
export default function ChatWindow({side = "right"}) {
    return (
        <div className={`drawer ${side === "right" ? "drawer-end" : ""}`}>
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-side" >
                <label htmlFor="my-drawer" aria-label="Close Assistant" className="drawer-overlay">
                </label>
                <div data-theme="light" className="menu w-96 min-h-full bg-base-200 text-base-content">
                <ChatNavbar/>
                <Chat />
                </div>
            </div>
        </div>
    )
}