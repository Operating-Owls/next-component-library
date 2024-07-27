'use server';
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

import prompt from "./systemPrompt";

class ChatAPI {
  constructor() {
      this.apiKey = process.env.OPENAI_API_KEY;
      this.endpoint = "https://api.openai.com/v1/chat/completions";
      this.maxHistory = 16;
      // FIXME: Update the system message to match your chatbot's purpose
      this.systemMessage = prompt.content;
  }

  async sendMessage(history) {
      // only include the last 4 messages in the history if there are more than 4
      const historyLength = history.length;
      if (historyLength > this.maxHistory) {
          history = history.slice( -this.maxHistory );
      }
      // prepend the system message to the history
      history.unshift({ role: "system", content: this.systemMessage });
      
      // Send the user's message to the chatbot and receive a response
      const response = await this.fetchGPTResponse(history);

      // You can process the response or perform any additional actions here
      // For example, extracting the text from the response:
      const textResponse = response.choices[0].message.content;
      // Return the response to the caller
      return textResponse;
  }

  async fetchGPTResponse(history) {
      try {
          const response = await fetch(this.endpoint, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${this.apiKey}`,
              },
              body: JSON.stringify({
                  model: "gpt-3.5-turbo",
                  messages: history,
              }),
          });

          if (!response.ok) {
              console.error(response);
              const message = `An error has occured: ${response.status}`;
              throw new Error(message);
          }
          const data = await response.json();
          return data;
      } catch (error) {
          console.error(error);
          return {
              choices: [{ message: { content: "An error has occured" } }],
          };
      }
  }
}

export default ChatAPI;