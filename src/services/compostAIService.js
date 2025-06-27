import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = process.env.GOOGLE_API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export async function askGemini(message) {
    const chat = model.startChat({
        history: [],
        generationConfig: { maxOutputTokens: 200 },
    });

    const response = await chat.sendMessage(message);
    const result = await response.response;
    return result.text();
}