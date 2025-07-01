import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config()

const API_KEY = process.env.GOOGLE_API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function askGemini(message) {
    const chat = model.startChat({
        history: []
    });

    const response = await chat.sendMessage(message);
    const result = await response.response;
    return result.text();
}