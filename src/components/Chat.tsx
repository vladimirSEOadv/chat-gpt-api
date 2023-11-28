import React, {useEffect, useState} from "react";
import axios from "axios";
import {Button, Input} from "antd";
const apiKey = import.meta.env.VITE_API_KEY

interface IChat {
    author: string,
    text: string
}
export const Chat = () => {
    const [inputField, setInputField] = useState<string>("")
    const [gptResponse, setGptResponse] = useState<string>('')
    const [chat, setChat] = useState<IChat[]>([])
    const [counter, setCounter] = useState(0);

    const sendToGpt = async () => {
        // @ts-ignore
        setChat((prev)=> {
            return [...prev, {author: 'I', text: inputField, counter}]
        })
        setInputField('')
        try {
            const response = await axios.post(
                'https://api.openai.com/v1/engines/text-davinci-003/completions',
                {
                    prompt: inputField,
                    max_tokens: 50
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${apiKey}`
                    }
                }
            );
            const res = response.data.choices[0].text.trim()
            setGptResponse(res)
            // @ts-ignore
            setChat((prev)=> [...prev, {author: 'Gpt', text: res, counter}])
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

    useEffect(() => {
        window.addEventListener('keyup', sendToGpt);
        return () => {
            window.removeEventListener('keyup', sendToGpt);
        };
    }, []);

    return (
        <div className={'container'}>
            <Input value={inputField} onChange={onChangeHandler} placeholder="Enter text" />
            <Button onClick={sendToGpt} type="primary">Send</Button>
            <div>{gptResponse}</div>
            {chat.map((item, idx)=> {
                return(
                    <div className={item.author === "I" ? "my-message" : 'other-person-message'} key={idx}>
                        <span>{item.author}</span>
                        <span>{item.text}</span>
                    </div>
                )
            })}
        </div>
    );
};