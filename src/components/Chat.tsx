import React, {useEffect, useState} from "react";
import axios from "axios";
import {Avatar, Button, Input, List} from "antd";
import {FaArrowUp} from "react-icons/fa";

import OpenAI from "openai";

const apiKey = import.meta.env.VITE_API_KEY

const openai = new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true
});


interface IChat {
    author: string,
    text: string,
    counter: number
}
export const Chat = () => {
    const [inputField, setInputField] = useState<string>("")
    const [gptResponse, setGptResponse] = useState<string>('')
    const [chat, setChat] = useState<IChat[]>([
        {
            "author": "You",
            "text": "Привет",
            "counter": 0
        },
        {
            "author": "ChatGPT",
            "text": "!\n\nЯ еще только начал осваивать работу с вирту",
            "counter": 0
        }
    ])
    const [counter, setCounter] = useState(0);

    const sendToGpt = async () => {
        if(!inputField.trim().length) return
        // @ts-ignore
        setChat((prev)=> {
            return [...prev, {author: 'You', text: inputField, counter}]
        })
        setInputField('')
        try {
            const response = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [{content: inputField, role: 'system'}],
                temperature: 0,
                max_tokens: 2048,
            });

            console.log("response", response)

            // @ts-ignore
            const res = response.choices.reduce((acc, current)=> {
                acc= `${acc} ${current.message.content}`
                return acc
            },"")
            setGptResponse(res)
            // @ts-ignore
            setChat((prev)=> [...prev, {author: 'ChatGPT', text: res, counter}])
            setCounter((prev)=> prev+1)
            console.log(response.data.choices[0].text.trim());
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // @ts-ignore
    const onChangeHandler = (e) => {
        setInputField(e.target.value);
    }

    console.log("chat", chat);

    return (
        <div className={'container'}>
        <div className={'chat-wrapper'}>
            <div className="main-input">
                <Input className={'input'} value={inputField} onChange={onChangeHandler} size="large" placeholder="Enter text" />
                <Button className='btn' size={"small"}  onClick={sendToGpt} type="default"> <FaArrowUp/> </Button>
            </div>
            {chat.map((item, idx)=> {
                return(
                    <div className='message'>
                        <div className={'avatar'} >{item.author}</div>
                        <div className={item.author === "I" ? "my-message" : 'other-person-message'} key={idx}>
                            <div className={'text'}>{item.text}</div>
                        </div>
                    </div>
                )
            })}
        </div>
      </div>
    );
};