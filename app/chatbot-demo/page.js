"use client";
import ChatWindow from "@/components/chatbot/ChatWindow";
import ChatButton from "@/components/chatbot/ChatButton";

export default function Home() {

    return (
        <main>
            <div className="flex justify-center items-center min-h-screen"> 
                <div className="p-4"> 
                <h1 className="text-2xl font-bold mb-4">Chatbot Demo</h1>
                <a href="/" className="text-blue-500 hover:underline mb-4 block">Back to home</a>
                <br/>
                <p>Just click the button to open the chatbot window.</p>
                </div>
            </div>
            <ChatButton side="left">Open Chatbot</ChatButton>
            <ChatWindow side="left" />
        </main>
    );
}
