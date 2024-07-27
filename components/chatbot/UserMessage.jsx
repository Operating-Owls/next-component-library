import React from "react";

export default function UserMessage(props) {

    return (
        <div className="chat chat-end">
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img alt="User Chat Bubble Photo" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"/>
                </div>
            </div>
            <div className="chat-footer opacity-50">
                <time className="text-xs opacity-50">{props.time}</time>
            </div>
            <div className="chat-bubble text-right chat-bubble-primary">{props.messageContent}</div>
        </div>

    )
}