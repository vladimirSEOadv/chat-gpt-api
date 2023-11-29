import {IMessage} from "@/pages/chatWithChunksResponse/types.ts";
import OpenAI from "openai";
const apiKey = import.meta.env.VITE_API_KEY
const openai = new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true
});

export const getData = async (text: string, messages: IMessage[]) => {
    return await openai.chat.completions.create({
        model: "gpt-3.5-turbo-0613",
        messages: [...messages, {content: text, role: 'system'}],
        temperature: 0,
        max_tokens: 2048,
        stream: true,
    });
}