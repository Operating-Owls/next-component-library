// pages/api/chatbot.js
import { NextResponse } from 'next/server';
import moment from 'moment';
import ChatAPI from './chatAPI';

const chatbot = new ChatAPI();

const MESSAGE_LIMIT = 5;
const RESET_MINUTES = 2;
const sessions = {};

// based on the user's IP address and user agent
function generateSessionId(req) {
    const ip = req.headers.get('x-real-ip') || req.headers.get('x-forwarded-for') || req.connection.remoteAddress;
    const userAgent = req.headers.get('user-agent');
    return `${ip}-${userAgent}`;
}

function filterOldMessages(data) {
    const currentTime = moment();
    const resetTimeLimit = currentTime.subtract(RESET_MINUTES, 'minutes');
    return data.filter(message => moment(message.time, 'YYYY-MM-DD HH:mm:ss').isAfter(resetTimeLimit));
}

function getSessionData(sessionId) {
    if (!sessions[sessionId]) {
        sessions[sessionId] = [];
    }
    let data = sessions[sessionId];
    data = filterOldMessages(data);
    return data;
}

function addMessage(sessionId, text) {
    const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
    const message = { text, time: currentTime };
    if (!sessions[sessionId]) {
        sessions[sessionId] = [];
    }
    sessions[sessionId].push(message);
}

export async function POST(req) {
    try {
        const sessionId = generateSessionId(req);
        let data = getSessionData(sessionId);

        if (data.length >= MESSAGE_LIMIT) {
            return NextResponse.json({ message: "Sorry, you've used all your allowed messages. Try again in 2 minutes." }, { status: 429 }); 
            // 429 is for "Too Many Requests"
        }

        const { message } = await req.json();
        addMessage(sessionId, message);
        console.log("User message:", message);

        // create a chat history with just the user's message
        const history = [{ role: "user", content: message }];

        // Here you would typically call your chatbot logic to get a response
        const chatBotResponse = await chatbot.sendMessage(history);

        console.log("Chatbot response:", chatBotResponse);

        return NextResponse.json({ message: chatBotResponse }, { status: 200 });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ message: 'An unexpected error occurred.' }, { status: 500 });
    }
}

