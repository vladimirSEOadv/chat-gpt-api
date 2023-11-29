import React, {useState} from "react";
import {Button, Input} from "antd";
import {FaArrowUp} from "react-icons/fa";
import {IMessage} from "@/pages/chatWithChunksResponse/types.ts";
import {ChatList} from "@/pages/chatWithChunksResponse/components/ChatList.tsx";
import axios from 'axios';
import OpenAI from "openai";



export const ChatWithChunksResponse = () => {
    const [inputField, setInputField] = useState<string>("")
    const [chatMessages, setChatMessages] = useState<IMessage[]>([
        {
            "role": "system",
            "content": "Write story",
        },
    ])

    const payload = {
        model: "gpt-3.5-turbo-0613",
        messages: chatMessages,
        temperature: 0.5,
        stream: true,
    };
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`,
    };
    const apiUrl = 'https://api.openai.com/v1/chat/completions';
    // @ts-ignore
    const processDataChunk = (chunk) => {
        console.log(chunk.toString());
    };
    const openai = new OpenAI();

    async function askGpt() {
        const stream = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [{ role: "user", content: "Say this is a test" }],
            stream: true,
        });
        for await (const chunk of stream) {
            process.stdout.write(chunk.choices[0]?.delta?.content || "");
        }
    }


    const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        // @ts-ignore
        setInputField(e.target.value);
    }

    console.log("chat", chatMessages);
    // @ts-ignore
    return (
        <div className={'container'}>
            <div className={'chat-wrapper'}>
                <div className="main-input">
                    <Input className={'input'} value={inputField} onChange={onChangeHandler} size="large"
                           placeholder="Enter text"/>
                    <Button className='btn' size={"middle"} onClick={askGpt} type="default"> <FaArrowUp/> </Button>
                </div>
                {/*<ChatList messages={chatMessages} />*/}
            </div>
        </div>
    );
};