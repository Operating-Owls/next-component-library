import React from "react";

export default function BotMessage(props) {
    return (
        <div>
            <div className="chat chat-start">
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full"> 
                        <img alt="Bot Chat Bubble Photo" src="/avatars/Pepper.png"/>
                    </div>
                </div>
            <div className="chat-footer opacity-50">
                <time className="text-xs opacity-50">{props.time}</time>
            </div>
            <div className="chat-bubble text-left chat-bubble-neutral">{props.error ? props.error : props.response}</div>
            </div>
        </div>
    )
}